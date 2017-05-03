describe('TodoController', function () {
    // $controller fetches controller service
	var $controller, TodoController;

    // runs before each test; module instantiates app
	beforeEach(module('app'));

    // $injector allows to fetch dependencies for app
	beforeEach(inject(function ($injector) {
		// fetch $controller service to instantiate an instance of todo controller
		$controller = $injector.get('$controller');

		var $scope = {};

		// mock the todo service
		var TodoService = function () {};

		// extend TodoService and create properties on prototype
		TodoService.prototype.$save = function () {};

		// part of resource object
		TodoService.query = function () {
			return {
				$promise: { // mock the promise object $resource gives us
					then: function (callback) {
						callback([
							{
								id: 1,
								title: 'Example Todo',
								userId: 1
							}
						]) // callback with fake data
					}
				}
			}
		};

		TodoService.delete = function () {
			return true;
		};

		// instantiate controller
		TodoController = $controller('TodoController as todo', {
			$scope: $scope,
			TodoService: TodoService
		});
	}));

	// first test
	it('should have get items from the service', function () {
		var resp = TodoController.getTodos();

		// test first item above to equal below
		expect(TodoController.list[0]).toEqual({
			id: 1,
			title: 'Example Todo',
			userId: 1
		});
	});

	it('should delete the item from the service', function () {
		// delete first 1
		TodoController.deleteTodo(1);

		// expect list array is empty
		expect(TodoController.list.length).toEqual(0);
	});

	it('should be create a new item', function () {
		TodoController.title = 'Example Title';

		TodoController.newTodo();

		// expect list array has 1
		expect(TodoController.list.length).toEqual(1);
	});
});
