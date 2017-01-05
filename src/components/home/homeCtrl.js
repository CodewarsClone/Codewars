/***********HOME CONTROLLER***********/

angular.module('app').controller('homeCtrl', function($scope, $state, mainService, $stateParams) {

    mainService.checkAuth();
    $scope.languageOptions = ["JavaScript", "Ruby", "C++"];
    $scope.progressOptions = ["Fundamentals", "Rank Up", "Practice and Repeat", "Beta", "Random"];
    //Dummy userKatas for purposes of styling.
    $scope.userKatas = [{kyu: 8, id: 1, name: "Kata name", script: "var a = 1", tags: ['FUNDAMENTALS'], user_id: 2},{kyu: 8, id: 2, name: "Kata name", script: "var a = 1", tags: ['FUNDAMENTALS'], user_id: 2},{kyu: 8, id: 3, name: "Kata name", script: "var a = 1", tags: ['FUNDAMENTALS']}]

    $scope.getUser = () => {
        mainService.getUser().then(response => {
            mainService.user = response.data;
            mainService.user.kyu_level = mainService.rankCalculator(mainService.user);
            $scope.getUserKatas(mainService.user.id);
            $scope.getKataVotes();
            $scope.getRandomKata();
        })
    };

    $scope.getRandomKata = () => {
        let oldId;
        if ($scope.randomKata) {
            oldId = $scope.randomKata.id
        }
        mainService.getRandomKata(mainService.user.kyu_level).then(response => {
            
            if (oldId) {
                if (response.data.id === oldId) {
                return $scope.getRandomKata(mainService.user.kyu_level);
                } else {
                    return $scope.randomKata = response.data;
                }
            } 
            $scope.randomKata = response.data;
        })
    }

    $scope.getUserKatas = (userid) => {
        mainService.getUserKatas(userid).then(response => {
            // $scope.userKatas = response.data;
        })
    }

    $scope.voteKata = (kataid, vote) => { // the vote is a true or false value
        mainService.voteKata(mainService.user.id, kataid, vote).then(response => {
            $scope.kataVotes = response.data;
            console.log($scope.kataVotes);
        })
    }

    $scope.getKataVotes = () => {
        mainService.getKataVotes().then(response => {
            $scope.allKataVotes = response.data
            console.log($scope.allKataVotes);
        })
    }

    $scope.getUser();
    


});
