/***********HOME CONTROLLER***********/

// each Ctrl should call  - mainService.user - for access to the user object

angular.module('app').controller('homeCtrl', function($scope, $state, mainService) {

// get random kata using randomKata function on service

    mainService.getMe().then(response => {
        mainService.user = response.data[0];
        console.log(mainService.user);
    })

});
