angular.module('app', ['lumx'])

.controller('MainCtrl', ['$scope', function($scope) {
	$scope.emailValidation = function(email) {
		return /^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/.test(email);
	};
	$scope.textFields = {
		email: 'want@thermom.ru',
		coupon: ''
	};
}]);