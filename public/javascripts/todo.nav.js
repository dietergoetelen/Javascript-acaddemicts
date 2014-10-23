'use strict';

var todo = (function (todo) {
	
	var view = {
		links: $('[data-nav-status]')
	};
	
	
	view.links.on('click', function (e) {
		e.preventDefault();
		
		var $this = $(this);
		var status = $this.data('navStatus');
		
		window.location.hash = status;
		
		todo.data.get(status, function (err, result) {
			if (! err) {
				todo.list.render(result);
			}
		});
		
		todo.main.changeTitle($this.html() + ' todos');
	});
	
	return todo;
	
}(todo || {}));