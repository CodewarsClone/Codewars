/**********TRAINING CONTROLLER************/

angular.module('app').controller('trainingCtrl', function($scope, $state, mainService) {

  $scope.sendSolution = function(input) {
    input = input.replace(/\n/g, " ");
    console.log(input);
    // mainService.getTest(input).then((response) => console.log(response));
  }



});
