/***********HOME CONTROLLER***********/

// each Ctrl should call  - mainService.user - for access to the user object

angular.module('app').controller('homeCtrl', function($scope, $state, mainService) {

// get random kata using getRandomKata function on service

    mainService.getUser().then(response => {
        mainService.user = response.data[0];
    })

    $scope.getRandomKata = () => {
        
    }


});
