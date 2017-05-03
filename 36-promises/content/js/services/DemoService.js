function DemoService($q, $http) {

	var todos = 'http://jsonplaceholder.typicode.com/todos';
	var comments = 'http://jsonplaceholder.typicode.com/comments';

	this.getTodos = function () {
        // promise object
		var defer = $q.defer();
        // gives a new instance XMLHttpRequest
		var xhr = new XMLHttpRequest();
        // gets called when XMLHttpRequest changes
		xhr.onreadystatechange = function () {

			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					defer.resolve(JSON.parse(xhr.responseText));
				} else {
					defer.reject(JSON.parse(xhr.responseText));
				}
			}
		};

		xhr.open('GET', todos, true);
		xhr.send();
		return defer.promise;
	};

    // another way with constructor function - better
	this.getComments = function () {
        // instead of defer, return $q function with parameters resolve and reject
		return $q(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						resolve(JSON.parse(xhr.responseText));
					} else {
						reject(JSON.parse(xhr.responseText));
					}
				}
			};
			xhr.open('GET', comments, true);
			xhr.send();
		});
	};

    // not creating your own promise
	this.getAll = function () {
		var promiseOne = $http.get(todos);
		var promiseTwo = $http.get(comments);
        // array of promises in $q function
		return $q.all([promiseOne, promiseTwo]);
	};

    // new feature .race
	this.getFirstResolved = function () {
		var promiseOne = $http.get(todos);
		var promiseTwo = $http.get(comments);
		return $q.race([promiseOne, promiseTwo]);
	};

}

angular
	.module('app')
	.service('DemoService', DemoService);
