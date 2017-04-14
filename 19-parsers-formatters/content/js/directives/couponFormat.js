function couponFormat() {
	return {
		require: 'ngModel',
		link: function ($scope, $elem, $attrs, $ctrl) {

			var ngModelCtrl = $ctrl;
            // $formatters - collection of functions that get run against model values
			ngModelCtrl.$formatters.unshift(function (value) {
				// coupon: 'summer-50' -> 'SUMMER_50'
				return value.replace(/-/g, '_').toUpperCase();
			});

			ngModelCtrl.$parsers.unshift(function (value) {
				// coupon: 'SUMMER_50' -> 'summer-50'
				return value.replace(/_/g, '-').toLowerCase();
			});

		}
	}
}

angular
	.module('app')
	.directive('couponFormat', couponFormat);
