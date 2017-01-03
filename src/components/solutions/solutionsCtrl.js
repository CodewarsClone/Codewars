
/************ SOLUTIONS CONTROLLER *********/

angular.module('app').controller('solutionsCtrl', function($scope, $state, mainService, $stateParams) {

  $scope.kataid = $stateParams.kataid;
  $scope.user = mainService.user;
  // $scope.kataSolutions = [{ script:"function dog(x) { var jerk = 'hello' }"}];


    $scope.getKataById = (kataid) => {
        mainService.getKataById(kataid).then(response => {
            console.log(response.data);
            $scope.kataById = response.data;
            $scope.getKataSolutions($scope.kataid);
            console.log($scope.kataById);
        })
    }

    var solutionsExist = false;

    $scope.getKataSolutions = (kataid) => {
        mainService.getKataSolutions(kataid).then(response => {
            $scope.kataSolutions = response.data;
            if ($scope.kataSolutions[0]) {
              // solutionsPageCode.setValue("Here's where your code should be.");
            } else {
              // solutionsPageCode.setValue("It looks like you haven't submitted any solutions to this kata.");
            }
            console.log($scope.kataSolutions)
        })
    }

    $scope.voteSolution = () => {
        mainService.voteSolution().then(response => {
            $scope.solutionVotes = response.data;
            console.log($scope.solutionVotes);
        })
    }

    $scope.init = () => {
        $scope.getKataById($scope.kataid);
    }

    $scope.voteSolution();



});
