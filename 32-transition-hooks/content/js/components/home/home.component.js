var home = {
	template: `
		<div class="home">Home Page</div>
	`
};

angular
	.module('home')
	.component('home', home)
	.config(function ($stateProvider, $urlRouterProvider, $transitionsProvider) {
        // .onStart method - first parameter is an object, then function
		$transitionsProvider.onStart
            // capture states
			to: function (state) {
                // if has state requires authorization - has data property and requiredAuth - !! converts to boolean with true value
				return !!(state.data && state.data.requiredAuth);
			}
		}, function ($transition$) {
			console.log($transition$);
		});

		$stateProvider
			.state('home', {
				url: '/',
				component: 'home'
			});
		$urlRouterProvider.otherwise('/');
	});
