(function() {
	angular.module('app')
		.controller('TodoCtrl', TodoCtrl);

	function TodoCtrl(Tasks, $location, $timeout) {
		var vm = this;

		vm.tasksList = Tasks.get();
		vm.addTask = addTask;
		vm.isSaving = false;
		vm.removeTask = Tasks.remove;
		vm.toggleCompleted = Tasks.toggleCompleted;
		vm.toggleCompletedAll = Tasks.toggleCompletedAll;
		vm.currentUrl = $location.path();
		vm.taskFilter = taskFilter();

		////////////

		function addTask() {
			// Prepare task object
			var task = {
				id: vm.tasksList.length + 1,
				title: vm.taskTitle.trim(),
				completed: false
			};

			if (!task.title) {
				return;
			}

			// Simulate API
			vm.isSaving = true;

			$timeout(function() {
				Tasks.add(task);
				vm.isSaving = false;
			}, 300);
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