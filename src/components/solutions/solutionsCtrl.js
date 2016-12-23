
/************ SOLUTIONS CONTROLLER *********/

angular.module('app').controller('solutionsCtrl', function($scope, $state, mainService, $stateParams) {

  $scope.kataid = $stateParams.kataid;
  $scope.user = mainService.user;
  console.log(mainService.user);

    $scope.getKataById = (kataid) => {
        mainService.getKataById(kataid).then(response => {
            $scope.kataById = response.data;
            $scope.getKataSolutions($scope.kataid);
            console.log($scope.kataById);
        })
    }

    $scope.getKataSolutions = (kataid) => {
        mainService.getKataSolutions(kataid).then(response => {
            $scope.kataSolutions = response.data;
            $scope.kataSolutions[0] ? console.log("something's here") : console.log("We've got nothing");
            console.log($scope.kataSolutions)
        })
    }

    $scope.init = () => {
        $scope.getKataById($scope.kataid);
    }



});
