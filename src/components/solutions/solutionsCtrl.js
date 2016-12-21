
// each Ctrl should call  - mainService.user - for access to the user object

angular.module('app').controller('solutionsCtrl', function($scope, $state, mainService) {

// get all solutions for one kata (by kataid) using the getKataSolutions function on service.
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