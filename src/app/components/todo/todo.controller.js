(function() {
	angular.module('app')
		.controller('TodoCtrl', TodoCtrl);

	function TodoCtrl(Tasks, $location) {
		var vm = this;

		vm.tasksList = Tasks.get();
		vm.addTask = addTask;
		vm.removeTask = Tasks.remove;
		vm.toggleCompleted = Tasks.toggleCompleted;
		vm.toggleCompletedAll = Tasks.toggleCompletedAll;
		vm.taskFiltersLinks = taskFiltersLinks();
		vm.currentUrl = $location.path();
		vm.taskFilter = taskFilter();

		////////////

		function addTask(taskTitle) {
			// Prepare defaults, add title
			var task = {
				id: vm.tasksList.length + 1,
				title: taskTitle,
				completed: false
			};

			Tasks.add(task);
		}

		function taskFiltersLinks() {
			return [
				{ url: '/', title: 'All' },
				{ url: '/active', title: 'Active' },
				{ url: '/completed', title: 'Completed' }
			];
		}

		function taskFilter() {
			var completed = '';

			switch ($location.path()) {
				case '/active':
				completed = false;
				break;

				case '/completed':
				completed = true;
				break;
			}

			return completed;
		}

	}
})();