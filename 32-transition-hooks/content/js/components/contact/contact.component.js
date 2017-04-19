var contact = {
	template: `
		<div class="contact">
			<div class="contact-methods">
				<h3>How would you like to contact me?</h3>
				<div ui-view="methods"></div>
			</div>
			<div class="contact-details" ui-view="details"></div>
		</div>
	`,
    // $transitions is component level
	controller: function ($transitions) {
        // returns boolean, runs when exiting a state, e.g. if navigating away from form
		this.uiCanExit = function () {
			console.log('Exiting...');
			return window.confirm('Are you sure you want to leave?');
		};
		var myTransition = $transitions.onStart({
            // if empty, will apply to all routes of that state, to customize use to: 'contact.*' for all sub components
			to: 'contact.*'
		}, function ($transition$) {
			// $transition$
		});
        // needs to be manually destroyed
		this.$onDestroy = function () {
			myTransition();
		};
	}
};

angular
	.module('contact')
	.component('contact', contact)
	.config(function ($stateProvider) {
		$stateProvider
			.state('contact', {
				url: '/contact',
                // for use in transition hook checking which states require authorization
				data: {
					requiredAuth: true
				},
                // hooks
				onEnter: function () {
					console.log('onEnter');
				},
				onExit: function () {
					console.log('onExit');
				},
                // still navigating in nested state
				onRetain: function () {
					console.log('onRetain');
				},
				views: {
					'@': {
						component: 'contact'
					},
					'methods@contact': {
						component: 'contactMethods'
					}
				}
			});
	});
