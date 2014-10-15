'use strict';

var todoLogic = require('../logic/todoLogic');

module.exports.all = function (req, res) {
	res.render('index', {title: 'All todos', todos: todoLogic.all()});
};

module.exports.active = function (req, res) {
	res.render('index', {title: 'Active todos', todos: todoLogic.active()});
};

module.exports.completed = function (req, res) {
	res.render('index', {title: 'Completed todos', todos: todoLogic.completed()});
};

module.exports.addTodo = function (req, res) {
	todoLogic.add(req.body, function (err, todo) {
		if (err) {
			res.render('index', {title: 'All todos', todos: todoLogic.all(), errorMessage: err});	
			return;
		}
		
		res.redirect('/');
	});
};

module.exports.updateTodo = function (req, res) {
	todoLogic.update(req.body, function (err, todo) {
		if (err) {
			res.render('index', {title: 'All todos', todos: todoLogic.all(), errorMessage: err});	
			return;
		}
		
		res.redirect('/');
	});
};