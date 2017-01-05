angular.module('app').controller('menuCtrl', function($scope, $state, mainService, $stateParams){
	$scope.getUser = () => {
		mainService.getUser().then(response => {
			mainService.user = response.data;
			mainService.user.kyu_level = mainService.rankCalculator(mainService.user);
			$scope.user = mainService.user
		})
	};
	
	$scope.getUser();
});
