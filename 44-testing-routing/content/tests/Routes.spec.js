describe('Routes', function () {
	var $state, $http, $httpBackend;

	beforeEach(module('app'));

	beforeEach(inject(functi on ($injector) {
        // provided by uiRouter
		$state = $injector.get('$state');
		$http = $injector.get('$http');
		$httpBackend = $injector.get('$httpBackend');

		$httpBackend
			.when('GET', 'views/home.html')
            // ui router will try to fetch template which won't exist; so empty string is in the response
			.respond('');

		$httpBackend
			.when('GET', '/users/example')
			.respond(
				{
					name: 'Example User'
				}
			);

	}));

	describe('Home Page', function () {
		var state;

		it('should have the correct URL', function () {
            // fetch home state by ui router
			state = $state.get('home');
            // console.log('STATE', state) to see what ojbect looks like
			expect(state.url).toEqual('/');
		});

		it('should use the correct template', function () {
			expect(state.templateUrl).toEqual('views/home.html');
		});
	});

	describe('User Page', function () {
		var state;

		it('should have the correct URL', function () {
			state = $state.get('user');

			expect(state.url).toEqual('/user/:name');
		});

		it('should use the correct template', function () {
			expect(state.templateUrl).toEqual('views/user.html');
		});

		it('should use the correct controller', function () {
			expect(state.controller).toEqual('UserController as user');
		});

		it('should resolve data correctly', function (done) {
			$httpBackend.expectGET('views/home.html');
			$httpBackend.expectGET('/users/example');

			state
				.resolve
				.user($http, {name: 'example'})
				.then(function (res) {
					if (res.data.name === 'Example User') {
						done();
					}
				});

			$httpBackend.flush();
		});
	});

	describe('User Notes Page', function () {
		var state;

		it('should have the correct URL', function () {
			state = $state.get('user.notes');

			expect(state.url).toEqual('/notes');
		});

		it('should use the correct template', function () {
			expect(state.templateUrl).toEqual('views/user/notes.html');
		});

		it('should use the correct controller', function () {
			expect(state.controller).toEqual('UserNotesController as user');
		});
	});

	describe('User Settings Page', function () {
		var state;

		it('should have the correct URL', function () {
			state = $state.get('user.settings');

			expect(state.url).toEqual('/settings');
		});

		it('should use the correct template', function () {
			expect(state.templateUrl).toEqual('views/user/settings.html');
		});

		it('should use the correct controller', function () {
			expect(state.controller).toEqual('UserSettingsController as user');
		});
	});
});
