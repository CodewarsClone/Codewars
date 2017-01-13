/**
 * Created by Joshua Baert on 1/12/2017.
 */

angular.module('app').controller('loginCtrl', function ($http, $state, $scope) {
	$scope.dummy = () => {
		$http.post('/dummy').then((res) => {
			console.log(res);
			$state.go('menu.home');
		})
	}
});