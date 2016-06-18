const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
	return gulp.src('src/assets/styles/main.scss')
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.sass.sync({
			outputStyle: 'expanded',
			precision: 10
			// includePaths: ['.']
		}).on('error', $.sass.logError))
		.pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest('.tmp/styles'))
		.pipe(reload({stream: true}));
});

gulp.task('views', () => {
	return gulp.src('src/app/components/**/*.html')
		.pipe(gulp.dest('.tmp/views'))
		.pipe(gulp.dest('dist/views'));
});

gulp.task('scripts', ['views'], () => {
	return gulp.src('src/app/**/*.js')
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.babel())
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('.tmp/scripts'))
		.pipe(reload({stream: true}));
});

function lint(files, options) {
	return gulp.src(files)
		.pipe(reload({stream: true, once: true}))
		.pipe($.eslint(options))
		.pipe($.eslint.format())
		.pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
	return lint('src/app/**/*.js', {
		fix: true
	})
		.pipe(gulp.dest('src/app'));
});

gulp.task('html', ['styles', 'scripts'], () => {
	return gulp.src('src/*.html')
		.pipe($.useref({searchPath: ['.tmp', 'src', '.']}))
		.pipe($.if('*.js', $.ngAnnotate()))
		.pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
		.pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
		.pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
	return gulp.src('src/assets/images/**/*')
		.pipe($.cache($.imagemin({
			progressive: true,
			interlaced: true,
			// don't remove IDs from SVGs, they are often used
			// as hooks for embedding and styling
			svgoPlugins: [{cleanupIDs: false}]
		})))
		.pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
	return gulp.src('src/assets/fonts/**/*.{eot,svg,ttf,woff,woff2}')
		.pipe(gulp.dest('.tmp/fonts'))
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
	return gulp.src([
		'src/*.*',
		'!src/*.html'
	], {
		dot: true
	}).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'scripts', 'fonts'], () => {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['.tmp', 'src', 'src/app', 'src/assets'],
			routes: {
				'/node_modules': 'node_modules'
			}
		},
	});

	gulp.watch([
		'src/**/*.html',
		'src/assets/images/**/*',
		'.tmp/fonts/**/*'
	]).on('change', reload);

	gulp.watch('src/app/**/*.js', ['scripts']);
	gulp.watch('src/app/components/**/*.html', ['views']);
	gulp.watch('src/assets/styles/**/*.scss', ['styles']);
	gulp.watch('src/assets/fonts/**/*', ['fonts']);
});

gulp.task('serve:dist', () => {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['dist']
		}
	});
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
	return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
	gulp.start('build');
});
