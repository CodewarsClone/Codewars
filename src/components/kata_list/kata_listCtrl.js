angular.module('app').controller('kata_listCtrl', function($scope, $state, mainService) {

    $scope.getRandomKataList = (userid) => {
        mainService.getRandomKataList(userid).then(response => {
            console.log(response.data);
            $scope.randomKataList = response.data;
        })
    }
    
    $scope.searchKatasByName = (userInput) => {
        mainService.searchKatasByName(`%${userInput}%`).then(response => {
            console.log(response.data);
        })
    }

    $scope.getKatasByKyu = (kyu) => {

    }

    $scope.init = () => {
        $scope.getRandomKataList(mainService.user.id);
        $scope.searchKatasByName("s");
    }

});