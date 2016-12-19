/**********TRAINING CONTROLLER************/

angular.module('app').controller('trainingCtrl', function($scope, $state, mainService) {

  $scope.sendSolution = function(input) {
    // mainService.getTest(input).then((response) => console.log(response));
    input = input.replace(/\n/g, " ");
    console.log(input);
  }



});
