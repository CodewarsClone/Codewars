
// each Ctrl should call  - mainService.user - for access to the user object

angular.module('app').controller('solutionsCtrl', function($scope, $state, mainService) {

    // $scope.getKataById to be at the top of the page and the solutions will go below

    $scope.getKataSolutions = (kataid) => {
        mainService.getKataSolutions(kataid).then(response => {
            $scope.kataSolutions = response.data;
            console.log($scope.kataSolutions)
        })
    }

    $scope.init = () => {
        $scope.getKataSolutions(1 /* replace 1 with kataid when set up */);
    }
    


});