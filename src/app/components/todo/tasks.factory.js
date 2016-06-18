(function() {
	angular.module('app')
		.factory('Tasks', TasksFactory);

	function TasksFactory() {
		var tasks = [
			{
				id: 1,
				title: 'Take a dog for a walk'
			},
			{
				id: 2,
				title: 'Go to a party'
			},
			{
				id: 3,
				title: 'Do this all programming'
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

			if (!found) {
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

		return {
			get: get,
			add: add,
			remove: remove
		};
	}
})();