describe('Counter', function () {
    // $compile
	var $compile, $scope, $controller, element;

	beforeEach(module('app'));

	beforeEach(inject(function ($injector) {
        // compile allows to instantiate an element and compile it to a live angular object
		$compile = $injector.get('$compile');

        //
		var $rootScope = $injector.get('$rootScope');

        // compile counter to an element
		element = angular.element('<counter></counter>');
        // pass element in to compile service; in order to compile it against a particular scope; angular does it internally so this is needed for testing
		$compile(element)($rootScope.$new());


		$controller = element.controller('counter');
		$scope = element.isolateScope() || element.scope();
	}));

	it('should have an initial count of 0', function () {
		expect($controller.count).toEqual(0);
	});

	it('should increment the counter correctly', function () {
		$controller.increment();

		expect($controller.count).toEqual(1);
	});

	it('should decrement the counter correctly', function () {
		$controller.decrement();
        // each test is a new instance and scope, so it's -1
		expect($controller.count).toEqual(-1);
	});
});
