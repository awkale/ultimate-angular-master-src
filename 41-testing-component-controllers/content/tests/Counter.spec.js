describe('Counter', function () {
	var $componentController, controller, initialCount = 200;

	beforeEach(module('app'));

	beforeEach(inject(function ($injector) {
        // gives the service to test the controller on its own without needing the template
		$componentController = $injector.get('$componentController');
        // take the instance to make another instance, `counter` is component that you want
		controller = $componentController('counter',
			{ $scope: {}},
            // local binding
			{ initialCount: initialCount }
		);
	}));

	it('should have an initial count of 0', function () {
		expect(controller.count).toEqual(0);
	});

	it('should initialize to the correct count', function() {
        // start at zero
		expect(controller.count).toEqual(0);
        // call life cycle hook since there is no DOM with instantiated component
		controller.$onInit();
		expect(controller.count).toEqual(initialCount);
	});

	it('should increment the counter correctly', function () {
		controller.increment();

		expect(controller.count).toEqual(1);
	});

	it('should decrement the counter correctly', function () {
		controller.decrement();

		expect(controller.count).toEqual(-1);
	});
});
