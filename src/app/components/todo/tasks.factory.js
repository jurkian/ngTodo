(function() {
	angular.module('app')
		.factory('Tasks', TasksFactory);

	function TasksFactory() {
		var tasks = [
			{
				id: 1,
				title: 'Take a dog for a walk',
				completed: false
			},
			{
				id: 2,
				title: 'Go to a party',
				completed: true
			},
			{
				id: 3,
				title: 'Do all this programming',
				completed: true
			},
			{
				id: 4,
				title: 'Run 15 kilometers',
				completed: false
			}
		];

		function get() {
			return tasks;
		}

		function add(task) {
			// Check if there is no task with the same title
			var found = tasks.some(function(el) {
				return el.title === task.title;
			});

			if (!found && task.title) {
				tasks.push(task);
			}
		}

		function remove(task) {
			var removeIndex = tasks.indexOf(task);

			if (removeIndex > -1) {
				tasks.splice(removeIndex, 1);
				return true;
			} else {
				return false;
			}
		}

		function toggleCompleted(task) {
			var completedId = tasks.indexOf(task);

			tasks[completedId].completed = !tasks[completedId].completed;
		}

		function toggleCompletedAll(checkbox) {
			// newStatus = true/false based on checkbox value
			var newStatus = checkbox;

			for (var i = 0, len = tasks.length; i < len; i++) {
				tasks[i].completed = newStatus;
			}
		}

		return {
			get: get,
			add: add,
			remove: remove,
			toggleCompleted: toggleCompleted,
			toggleCompletedAll: toggleCompletedAll
		};
	}
})();