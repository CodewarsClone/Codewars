/***********HOME CONTROLLER***********/

angular.module('app').controller('homeCtrl', function($scope, $state, mainService, $stateParams) {

    mainService.checkAuth();
    $scope.languageOptions = ["JavaScript", "Ruby", "C++"];
    $scope.progressOptions = ["Fundamentals", "Rank Up", "Practice and Repeat", "Beta", "Random"];

    //Dummy userKatas for purposes of styling.
    // $scope.userKatas = [{kyu: 8, id: 1, name: "Kata name", script: "var a = 1", tags: ['FUNDAMENTALS'], user_id: 2},{kyu: 8, id: 2, name: "Kata name", script: "var a = 1", tags: ['FUNDAMENTALS'], user_id: 2},{kyu: 8, id: 3, name: "Kata name", script: "var a = 1", tags: ['FUNDAMENTALS']}]

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

          response.data.description = response.data.description.replace(/\\n/g, "\n");
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
            $scope.userKatas = response.data;
        })
    };

    $scope.voteKata = (kataid, vote) => { // the vote is a true or false value
        mainService.voteKata(mainService.user.id, kataid, vote).then(response => {
            $scope.kataVotes = response.data;
            $scope.userKatas.forEach(kata => {
              if (kata.id === kataid) {
                kata.votes = $scope.kataVotes.votes;
                kata.satisfaction = ($scope.kataVotes.likes/kata.votes)*100;
              }
            })
        })
    };


    $scope.getKataVotes = () => {
        mainService.getKataVotes().then(response => {
            $scope.allKataVotes = response.data;
            $scope.likes = $scope.allKataVotes[0];
            $scope.dislikes = $scope.allKataVotes[1];
            $scope.votes = $scope.allKataVotes[2];
            $scope.votes.forEach((vote) => {
              vote.likes = 0;
              vote.votes = parseInt(vote.votes);
              for (let i = 0; i < $scope.likes.length; i++) {
                if ($scope.likes[i].kata_id === vote.kata_id) {
                    vote.likes += 1;
                }
              }
              vote.satisfaction = (vote.likes/vote.votes)*100;
            });
            $scope.userKatas.forEach((kata) => {
              kata.satisfaction = 0;
              kata.votes = 0;
              for (let i of $scope.votes) {
                if (i.kata_id === kata.id) {
                  kata.satisfaction = i.satisfaction;
                  kata.votes = i.votes;
                }
              }
            });
        })
    }

    $scope.getUser();



});
