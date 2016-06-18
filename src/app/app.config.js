angular.module('app')
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/todo/todo.html'
			})
			.when('/active', {
				templateUrl: 'views/todo/todo.html'
			})
			.when('/completed', {
				templateUrl: 'views/todo/todo.html'
			})
			.otherwise({
				redirectTo: '/'
			});
	});