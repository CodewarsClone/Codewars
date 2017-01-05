angular.module('app').controller('menuCtrl', function($scope, $state, mainService, $stateParams){
    $scope.getUser = () => {
        mainService.getUser().then(response => {
            console.log(response.data);
        })
    };
});
