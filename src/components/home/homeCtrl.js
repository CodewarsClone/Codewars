/***********HOME CONTROLLER***********/

angular.module('app').controller('homeCtrl', function($scope, $state, mainService) {

    $scope.languageOptions = ["JavaScript", "Ruby", "C++"];
    $scope.progressOptions = ["Fundamentals", "Rank Up", "Practice and Repeat", "Beta", "Random"];

    $scope.getUser = () => {
        mainService.getUser().then(response => {
            mainService.user = response.data;
            mainService.user.kyu_level = mainService.rankCalculator(mainService.user);
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
