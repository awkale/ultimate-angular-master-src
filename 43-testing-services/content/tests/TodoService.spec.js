describe('TodoService', function () {
    // $httpBackend from angular mocks
	var TodoService, $httpBackend;

	beforeEach(module('app'));

	beforeEach(inject(function ($injector) {
        // gets instance of TodoService
		TodoService = $injector.get('TodoService');
        // instance of $httpBackend
		$httpBackend = $injector.get('$httpBackend');

		$httpBackend
			.when('GET', 'http://jsonplaceholder.typicode.com/todos')
			.respond(
                // fake a response; a response object in an array
				[
					{
						id: 1,
						title: 'Fake Title',
						userId: 1
					}
				]
			);

		$httpBackend
			.when('DELETE', 'http://jsonplaceholder.typicode.com/todos/1')
            // since there is only 1, delete leaves an empty object
			.respond({})
	}));

    // pass `done` argument; a function called when finished
	it('should get a list of todos from the server', function (done) {
        // will pass or fail; expect GET request to the below url
		$httpBackend.expectGET('http://jsonplaceholder.typicode.com/todos');

		TodoService
			.query()
			.$promise
			.then(function (res) {
				if (res[0].title === 'Fake Title') {
                    // call done; tells it's complete
					done();
				}
			});

        // dealing with asynchronous operation; allows assertion to run and flush through
		$httpBackend.flush();
	});

	it('should delete todo items from the server', function () {
		$httpBackend.expectDELETE('http://jsonplaceholder.typicode.com/todos/1');

		TodoService
            // call delete
			.delete({
                // pass object; 1 refers to id in url
				id: 1
			});

		$httpBackend.flush();
	});
});
