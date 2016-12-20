/**********TRAINING CONTROLLER************/

angular.module('app').controller('trainingCtrl', function($scope, $state, mainService) {

  $scope.languages = ['JavaScript', 'Python'];
  $scope.versions = ['Node v0.10.33', 'Node v6.6.0'];


  //Examples should be an array of objects. Returned results will be an array with the different tests and their results.
  $scope.testExamples = function(solutions, examples) {
    solutions = solutions.replace(/\n/g, " ");
    let examplesArr = [];
    examples = examples.split(/\n/);
    examples.forEach(example => examplesArr.push({test: example}));
    console.log(solutions, examplesArr);
    // mainService.testExamples(solutionsInput, examplesArr, kataid).then((response) => console.log(response));
  }

  $scope.testSuite = function(solutions) {
    solutions = solutions.replace(/\n/g, " ");
    // mainService.testSuite(solutions, kataid).then((response) => console.log(response));
  }



});
