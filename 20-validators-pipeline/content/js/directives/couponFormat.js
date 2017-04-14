function couponFormat() {
	return {
		require: 'ngModel',
		link: function ($scope, $elem, $attrs, $ctrl) {

			var ngModelCtrl = $ctrl;

			ngModelCtrl.$formatters.unshift(function (value) {
				// coupon: 'summer-50' -> 'SUMMER_50'
				return value.replace(/-/g, '_').toUpperCase();
			});

			ngModelCtrl.$parsers.unshift(function (value) {
				// coupon: 'SUMMER_50' -> 'summer-50'
				return value.replace(/_/g, '-').toLowerCase();
			});

            // not an array, passing model and view values
			ngModelCtrl.$validators.coupon = function (modelValue, viewValue) {
                // what to test
                var COUPON_REGEX = /[A-Z]+\_\d{2}/;
                // boolean value only testing view value
				return COUPON_REGEX.test(viewValue);
			};

		}
	}
}

angular
	.module('app')
	.directive('couponFormat', couponFormat);
