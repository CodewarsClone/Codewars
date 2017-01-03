/***********HOME CONTROLLER***********/

angular.module('app').controller('homeCtrl', function($scope, $state, mainService) {

    $scope.languageOptions = ["JavaScript", "Ruby", "C++"];
    $scope.progressOptions = ["Fundamentals", "Rank Up", "Practice and Repeat", "Beta", "Random"];

    $scope.getUser = () => {
        mainService.getUser().then(response => {
            console.log(response.data);
            mainService.user = response.data;
            mainService.user.kyu_level = mainService.rankCalculator(mainService.user);
            $scope.getRandomKata();
        })
    }

    $scope.getRandomKata = () => {
        mainService.getRandomKata(mainService.user.kyu_level).then(response => {
            console.log(response.data);
            $scope.randomKata = response.data;
        })
    }

    $scope.getUserKatas = (userid) => {
        mainService.getUserKatas(userid).then(response => {
            $scope.userKatas = response.data;
            console.log($scope.userKatas);
        })
    }

    $scope.voteKata = () => {
        mainService.voteKata().then(response => {
            $scope.kataVotes = response.data;
            console.log($scope.kataVotes);
        })
    }

    // the random kata is stored on $scope.randomKata.
    // If there is a button you can link the button to $scope.getRandomKata


    $scope.getUser();
    $scope.getUserKatas(mainService.user.id);
    $scope.voteKata();


});
