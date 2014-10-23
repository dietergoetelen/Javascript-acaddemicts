'use strict';

var todo = (function (todo) {
	
	var view = {
		newButton: '[data-todo-new]',
		input: '[data-todo-input]'
	};
	
	$(view.newButton).on('click', function (e) {
		e.preventDefault();
		
		var $this = $(this),
			$input = $(view.input);
		
		todo.data.add($input.val(), function (err, result) {
			if (! err) {
				todo.list.add(result);
			}
		});
	});
	
	return todo;
	
}(todo || {}));