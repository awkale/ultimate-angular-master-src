function TodoService($resource) {

	/*!

	 defaults:
	 {
		'get':    { method: 'GET' },
		'save':   { method: 'POST' },
		'query':  { method: 'GET', isArray: true },
		'remove': { method: 'DELETE' },
		'delete': { method: 'DELETE' }
	 };

	 url: http://jsonplaceholder.typicode.com/todos/:id

	*/

	return $resource('http://jsonplaceholder.typicode.com/todos/:id', {
        // to have $resource to extract dynamic id property from individual object that was passed in
		id: '@id'
	}, {
		update: {
			method: 'PUT'
		}
	});

}

angular
	.module('app')
	.service('TodoService', TodoService);
