'use strict';

var todo = (function (todo) {
	
	var dataContext = {};
	var apiUrl = "/api/todos";
	
	dataContext.get = function (status, cb) {
		if (!cb) { return; }
		
		var query = status || 'all';
		
		$.get(apiUrl, { status: query }, function (data) {
			cb(null, data);
		}).error(function (error) {
			cb(error.responseJSON);
		});
	};

	dataContext.add = function (title, cb) {
		$.ajax({
			url: apiUrl,
			method: 'post',
			data: {title: title},
			success: function (todo) {
				cb(null, todo);
			},
			error: function (err) {
				cb(err.responseJSON);
			}
		});
	};
	
	dataContext.update = function (data, cb) {
		$.ajax({
			url: apiUrl,
			method: 'put',
			data: data,
			success: function (todo) {
				cb(null, todo);
			},
			error: function (err) {
				cb(err.responseJSON);
			}
		});
	};
	
	todo.data = dataContext;
	return todo;
	
}(todo || {}));