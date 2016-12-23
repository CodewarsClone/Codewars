
angular.module('app').controller('profileCtrl', function($scope, $state, mainService) {

  $scope.user = mainService.user;
  console.log($scope.user);

  $scope.getUserKatas = (userid) => {
    mainService.getUserKatas(userid).then(response => {
      $scope.userKatas = response.data;
      console.log($scope.userKatas);
    })
  }

  $scope.getUserKatas(mainService.user.id);

});
