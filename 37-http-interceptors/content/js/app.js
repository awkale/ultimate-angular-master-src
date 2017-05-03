angular
	.module('app', [])
	.constant('TODO_API', 'http://jsonplaceholder.typicode.com/todos')
    //inject $httpProvider to hook in to $http request; adds MyHttpInterceptor to $httpProvider
	.config(function ($httpProvider) {
        // add .interceptors
		$httpProvider.interceptors.push('MyHttpInterceptor');
	});
