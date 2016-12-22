
angular.module('app').controller('profileCtrl', function($scope, $state, mainService) {

  $scope.user = mainService.user;
  console.log($scope.user);

});
