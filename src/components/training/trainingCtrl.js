/**********TRAINING CONTROLLER************/

angular.module('app').controller('trainingCtrl', function($scope, $state) {

  $scope.sendSolution = function(input) {
    console.log(JSON.stringify(input));
  }

});
