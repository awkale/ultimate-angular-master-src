// inject $q for errors
function MyHttpInterceptor(TODO_API, $q) {
	return {
        // each property is optional, request is a function is a config object passed through to http
		request: function (config) {
			if (config.url === TODO_API) {
				config.headers['x-csrf-token'] = 'toddmotto';
			}
			console.log(config);
			return config;
		},
		requestError: function (config) {
			console.log(config);
			return $q.reject(config);
		},
		response: function (response) {
			console.log(response);
			return response;
		},
		responseError: function (response) {
			console.log(response);
			return $q.reject(response);
		}
	};
}

angular
	.module('app')
	.factory('MyHttpInterceptor', MyHttpInterceptor);
