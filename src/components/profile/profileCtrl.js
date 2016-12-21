// each Ctrl should call  - mainService.user - for access to the user object

angular.module('app').controller('profileCtrl', function($scope, $state, mainService) {

  $scope.user = mainService.user;
  console.log($scope.user);

});
