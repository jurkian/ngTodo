(function() {
	angular
		.module('app')
		.controller('TodoCtrl', TodoCtrl);

	function TodoCtrl(Tasks) {
		var vm = this;

		vm.tasksList = Tasks.get();
		vm.addTask = addTask;
		vm.removeTask = Tasks.remove;

		////////////

		function addTask(taskTitle) {
			var task = {
				id: vm.tasksList.length + 1,
				title: taskTitle
			};

			Tasks.add(task);
		}
	}
})();