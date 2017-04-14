function CheckoutController() {
	this.details = {
		username: '',
		password: '',
		coupon: 'summer-50'
	};
	this.onSubmit = function () {
        // normally this would post to backend
		console.log(this.details);
	};
}

angular
	.module('app')
	.controller('CheckoutController', CheckoutController);
