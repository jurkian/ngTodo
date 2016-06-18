angular.module('app')
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/todo/todo.html'
			})
			.otherwise({
				redirectTo: '/'
			});
	});