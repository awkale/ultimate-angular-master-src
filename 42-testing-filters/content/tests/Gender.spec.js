describe('GenderFilter', function () {
	var $filter;

	beforeEach(module('app'));

	beforeEach(inject(function ($injector) {
		$filter = $injector.get('$filter');
	}));

	it('should filter out based on gender', function () {
        // array of objects
		var list = [{
			name: 'john doe',
			gender: 'male'
		}, {
			name: 'sarah smith',
			gender: 'female'
		}];

		var result = $filter('gender')(list, 'male');
		expect(result.length).toBe(1);
        // first item in array and check name
		expect(result[0].name).toEqual('john doe');
	});
});
