'use strict';

var todos = [
	{
		id: 1,
		title: "Cursus voorbereiden",
		done: true
	},
	{
		id: 2,
		title: "Auto wassen",
		done: false
	}
];

module.exports.all = function () {
	return todos;
};

module.exports.active = function () {
	return todos.filter(function (element) {
		return !element.done;
	});
};

module.exports.completed = function () {
	return todos.filter(function (element) {
		return element.done;
	});
};

module.exports.add = function (body, cb) {
	if (!body.title) {
		return cb("Title cannot be null");
	}
	
	var id = todos[todos.length - 1].id + 1;
	
	var todo = {
		id: id,
		title: body.title
	};
	
	todos.splice(0, 0, todo);
	
	cb(null, todo);
};

module.exports.update = function (body, cb) {
	if (!(!!body.done)) {
		cb("Done is empty");
		return;
	}
	
	if (!body.id) {
		cb("ID is empty");
		return;
	}
	
	var foundTodo;
	
	todos.forEach(function (todo) {
		if (todo.id === +body.id) {
			todo.done = (body.done === "true" || body.done === true) ? true : false;
			foundTodo = todo;
		}
	});
	
	if (foundTodo) {
		cb(null, foundTodo);
	} else {
		cb("Todo not found");
	}
};