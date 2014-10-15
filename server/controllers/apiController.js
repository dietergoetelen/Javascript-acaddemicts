'use strict';

var todoLogic = require('../logic/todoLogic');

module.exports.todos = function (req, res) {
	if (req.query.status) {
		var funcPointer = todoLogic[req.query.status.toLowerCase()];
		
		if (funcPointer) {
			res.json(funcPointer());
		} else {
			res.status(500).json({
				error: "Supported statuses: all, completed, active"
			});
		}
	} else {
		res.json(todoLogic.all());
	}
};

module.exports.addTodo = function (req, res) {
	todoLogic.add(req.body, function (err, todo) {
		if (err) {
			res.status(500).json({error: err});
			return;
		}
		
		res.json(todo);
	});
};

module.exports.updateTodo = function (req, res) {
	todoLogic.update(req.body, function (err, todo) {
		if (err) {
			res.status(500).json({error: err});
			return;
		}
		
		res.json(todo);
	});
};