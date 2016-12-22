/***********HOME CONTROLLER***********/

angular.module('app').controller('homeCtrl', function($scope, $state, mainService) {

    $scope.getUser = () => {
        mainService.getUser().then(response => {
            console.log(response.data);
            mainService.user = mainService.rankCalculator(response.data);
            $scope.getRandomKata(mainService.user.id);
        })
    }

    $scope.getRandomKata = (userid) => {
        mainService.getRandomKata(userid).then(response => {
            console.log(response.data);
            $scope.randomKata = response.data;
        })
    }

    // the random kata is stored on $scope.randomKata.
    // If there is a button you can link the button to $scope.getRandomKata

    $scope.init = () => {
<<<<<<< HEAD
        // $scope.getUser();
        $scope.getRandomKata(mainService.user.id);
=======
        $scope.getUser();

>>>>>>> master
    }

});
