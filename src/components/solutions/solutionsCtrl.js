
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
            // setTimeout(makeCodeMirrors, 1000);
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
            console.log($scope.solutionVotes);
        })
    }

    $scope.init = () => {
        $scope.getKataById($scope.kataid);
    }

    $scope.getSolutionVotes = () => {
        mainService.getSolutionVotes().then(response => {
            $scope.allSolutionVotes = response.data
            console.log($scope.allSolutionVotes);
        })
    }

});
