/**********TRAINING CONTROLLER************/

angular.module('app').controller('trainingCtrl', function($scope, $state, mainService) {

  $scope.languages = ['JavaScript', 'Python'];
  $scope.versions = ['Node v0.10.33', 'Node v6.6.0'];

  $scope.sendSolution = function(solutions, examples) {
    solutions = solutions.replace(/\n/g, " ");
    examples = examples.replace(/\n/g, " ");
    console.log(solutions, examples);
    // mainService.getTest(solutionsInput, examples).then((response) => console.log(response));
  }



});
