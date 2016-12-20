/**********TRAINING CONTROLLER************/

angular.module('app').controller('trainingCtrl', function($scope, $state, mainService) {

  $scope.languages = ['JavaScript', 'Python'];
  $scope.versions = ['Node v0.10.33', 'Node v6.6.0'];
  $scope.output = [];

  //NG-SHOWS
  $scope.showOutputShow = false;
  $scope.showInstructionsShow = true;


  //Examples should be an array of objects. Returned results will be an array with the different tests and their results.
  $scope.testExamples = function(solutions, examples) {
    solutions = solutions.replace(/\n/g, " ");
    let examplesArr = [];
    examples = examples.split(/\n/);
    examples.forEach(example => examplesArr.push({test: example}));
    mainService.testExamples(solutions, examplesArr).then((response) => $scope.output.push(response.data[0]));
  }


  $scope.testSuite = function(solutions) {
    solutions = solutions.replace(/\n/g, " ");
    // mainService.testSuite(solutions, kataid).then((response) => console.log(response));
  }



});
