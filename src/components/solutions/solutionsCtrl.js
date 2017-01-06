
/************ SOLUTIONS CONTROLLER *********/

angular.module('app').controller('solutionsCtrl', function($scope, $state, mainService, $stateParams) {

  mainService.checkAuth();
  $scope.kataid = $stateParams.kataid;
  $scope.user = mainService.user;
  $scope.creators = [];



    $scope.getKataById = (kataid) => {
        mainService.getKataById(kataid).then(response => {
            $scope.kataById = response.data;
            $scope.getKataSolutions($scope.kataid);
            $scope.getSolutionVotes();
        })
    }

    var solutionsExist = false;

    $scope.getKataSolutions = (kataid) => {
        mainService.getKataSolutions(kataid).then(response => {
            $scope.kataSolutions = response.data;

            console.log($scope.kataSolutions)
        })
    }

    $scope.getCreators = () => {
      $scope.kataSolutions.forEach((kata) => {
        mainService.getCreators(kata).then(response => {
          $scope.creators.push(response.data);
        });
      })

      console.log($scope.creators);
    }

    $scope.voteSolution = (solutionid, vote) => { // the vote is a true or false value
        mainService.voteSolution(mainService.user.id, solutionid, vote).then(response => {
            $scope.solutionVotes = response.data;
            $scope.kataSolutions.forEach(solution => {
              if (solution.id === solutionid) {
                solution.votes = $scope.solutionVotes.votes;
                solution.satisfaction = ($scope.solutionVotes.likes/solution.votes)*100;
              }
            })
        })
    }

    $scope.init = () => {
        $scope.getKataById($scope.kataid);
    }

    $scope.getSolutionVotes = () => {
        mainService.getSolutionVotes().then(response => {
            $scope.allSolutionVotes = response.data;
            $scope.likes = $scope.allSolutionVotes[0];
            $scope.dislikes = $scope.allSolutionVotes[1];
            $scope.votes = $scope.allSolutionVotes[2];
            $scope.votes.forEach((vote) => {
              vote.likes = 0;
              vote.votes = parseInt(vote.votes);
              for (let i = 0; i < $scope.likes.length; i++) {
                if ($scope.likes[i].solution_id === vote.solution_id) {
                    vote.likes += 1;
                }
              }
              vote.satisfaction = (vote.likes/vote.votes)*100;
            });
            $scope.kataSolutions.forEach((solution) => {
              solution.satisfaction = 0;
              solution.votes = 0;
              for (let i of $scope.votes) {
                if (i.solution_id === solution.id) {
                  solution.satisfaction = i.satisfaction;
                  solution.votes = i.votes;
                }
              }
            });

            console.log($scope.kataSolutions);
        })
    }

});
