var contactEmail = {
	template: `
		<div>Contact via email: todd@toddmotto.com</div>
	`
};

angular
	.module('contact')
	.component('contactEmail', contactEmail)
	.config(function ($stateProvider) {
		$stateProvider
			.state('contact.email', {
				url: '/email',
				views: {
                    // shorthand without another object using component: contactEmail
					'details@contact': 'contactEmail'
				}
			});
	});
