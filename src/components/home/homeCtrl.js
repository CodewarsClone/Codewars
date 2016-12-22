/***********HOME CONTROLLER***********/

angular.module('app').controller('homeCtrl', function($scope, $state, mainService) {

    $scope.languageOptions = ["JavaScript", "Ruby", "C++"];
    $scope.progressOptions = ["Fundamentals", "Rank Up", "Practice and Repeat", "Beta", "Random"];

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


    $scope.getUser();


});
