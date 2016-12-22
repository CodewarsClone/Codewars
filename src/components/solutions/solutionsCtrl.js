
/************ SOLUTIONS CONTROLLER *********/

angular.module('app').controller('solutionsCtrl', function($scope, $state, mainService, $stateParams) {

  $scope.kataid = $stateParams.kataid;

    $scope.getKataById = (kataid) => {
        mainService.getKataById(kataid).then(response => {
            $scope.kataById = response.data;
            console.log($scope.katabyId);
        })
    }

    $scope.getKataSolutions = (kataid) => {
        mainService.getKataSolutions(kataid).then(response => {
            $scope.kataSolutions = response.data;
            console.log($scope.kataSolutions)
        })
    }

    $scope.init = () => {
        $scope.getKataById($scope.kataid);
        $scope.getKataSolutions($scope.kataid);
    }



});
