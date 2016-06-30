angular.module('app')
	.config(function($routeProvider) {

		var routeConfig = {
			templateUrl: 'views/todo/todo.html'
		};

		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	});