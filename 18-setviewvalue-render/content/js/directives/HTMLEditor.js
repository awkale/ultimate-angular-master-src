function HTMLEditor() {
	return {
        // need to require model bound to directive, gives us controller that powers ngModel
		require: 'ngModel',
		link: function ($scope, $element, $attrs, $ctrl) {
			var ngModelCtrl = $ctrl;
			// View -> Model
			$element.on('input', function (event) {
                // $setViewValue captures value & syncs with app, sets model with value of view
				ngModelCtrl.$setViewValue(event.target.innerHTML);
			});
			// Model -> View
            // $render gets called if model if changed
			ngModelCtrl.$render = function () {
                // $modelValue takes model value associated with controller & pass to HTML
				$element.html(ngModelCtrl.$modelValue);
			};
            // to call at runtime; $element[0] same as element.html
			ngModelCtrl.$setViewValue($element[0].innerHTML);
		}
	};
}

angular
	.module('app')
	.directive('htmlEditor', HTMLEditor);
