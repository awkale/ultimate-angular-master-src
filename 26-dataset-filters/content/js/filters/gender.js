function gender() {
	return function(collection, gender) {
        // checking if gender supplied, if not gender show all
		if (!gender) return collection;
		// var filtered = [];
		// for (var i = 0; i < collection.length; i++) {
		// 	if (collection[i].gender === gender) {
		// 		filtered.push(collection[i]);
		// 	}
		// }
		// return filtered;
		return collection.filter(function (value) {
			return value.gender === gender;
		});
	};
}

angular
	.module('app')
	.filter('gender', gender);
