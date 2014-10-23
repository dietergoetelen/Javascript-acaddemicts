'use strict';

var todo = (function (todo) {
	
	var view = {
		title: '[data-todo-title]'
	};
	
	var main = {};
	
	main.changeTitle = function (newTitle) {
		$(view.title).html(newTitle);
	};
	
	main.init = function () {
		if (window.location.hash) {
			todo.data.get(window.location.hash.slice(1), function (err, result) {
				if (! err) {
					todo.list.render(result);
				}
			});
		}
	};
	
	main.clearOnUpdate = function () {
		return ['#completed', '#active'].indexOf(window.location.hash) >= 0;
	};
	
	main.init();
	
	todo.main = main;
	
	return todo;
}(todo || {}));