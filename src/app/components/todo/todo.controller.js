(function() {
	angular
		.module('app')
		.controller('TodoCtrl', TodoCtrl);

	function TodoCtrl() {
		var vm = this;

		console.log('working');
	}
})();