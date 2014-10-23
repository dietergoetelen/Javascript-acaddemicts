'use strict';

var todo = (function (todo) {
	
	var list = {};

	var view = {
		todoItems: '[data-todo-item]',
		container: '[data-todo-container]',
		updateButton: '[data-todo-item-update]',
		listTemplate: '#todo-list',
		itemTemplate: '#todo-item'
	};
	
	$(view.container).on('click', view.updateButton, function (e) {
		e.preventDefault();
		
		var $this = $(this),
			$todoItem = $this.parents(view.todoItems).first();
		
		var data = {
			id: $todoItem.data('todoItem'),
			done: $this.data('todoItemUpdate')
		};
		
		todo.data.update(data, function (err, res) {
			if (! err) {
				if (todo.main.clearOnUpdate()) {
					list.update(data.id, '');
				} else {
					var source = $(view.itemTemplate).html();
					var template = Handlebars.compile(source);
					
					list.update(data.id, template(res));
				}
			}
		});
	});
	
	list.clear = function () {
		$(view.todoItems).remove();
	};
	
	list.render = function (todos) {
		// Clear current todo items
		list.clear();
		
		// Get handlebars item
		var source = $(view.listTemplate).html();
		var template = Handlebars.compile(source);
		
		var context = {
			todos: todos
		};
		
		$(view.container).append(template(context));
	};
	
	list.update = function (id, newHtml) {
		$(view.todoItems).filter(function () {
			return $(this).data('todoItem') == id
		}).replaceWith(newHtml);
	};
	
	list.add = function (todo) {
		// Get handlebars item
		var source = $(view.itemTemplate).html();
		var template = Handlebars.compile(source);
		
		// Get first child and add template after it
		$(view.container).children().first().after(template(todo));
	};
	
	todo.list = list;
	return todo;
	
}(todo || {}));