describe('RemoveVowels', function () {
	var $filter;

	beforeEach(module('app'));

	beforeEach(inject(function ($injector) {
        // to use $filter service from ng
		$filter = $injector.get('$filter');
	}));

	it('should remove the vowels out of a word', function () {
        // variable mapped to $filter service we can use as function; `removeVowels` available as a filter since it's regiestered
		var result = $filter('removeVowels')('asdijadijsdoijzolaplwo');
		expect(result).toEqual('sdjdjsdjzlplw');
	});
});
