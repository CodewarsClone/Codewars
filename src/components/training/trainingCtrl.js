/**********TRAINING CONTROLLER************/

angular.module('app').controller('trainingCtrl', function($scope, $state, mainService) {

  $scope.sendSolution = function(input) {
    // mainService.getTest(input).then((response) => console.log(response));
    input = JSON.stringify(input);
    // input = input.replace("\n", " ");
    console.log(input);
  }



});
