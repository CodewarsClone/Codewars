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
            $scope.searchResult = response.data;
        })
    }

    $scope.getKatasByKyu = (kyu) => {
        mainService.getKatasByKyu(kyu).then(response => {
            console.log(response.data);
            $scope.katasByKyu = response.data;
        })
    }

    $scope.init = () => {
        $scope.getRandomKataList(mainService.user.id);
    }

});