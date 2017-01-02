angular.module('app').controller('menuCtrl', function($scope, $state, mainService, $stateParams){
    $scope.userPic = mainService.user.picture_url;
    $scope.userKyu = mainService.user.kyu_level;
});