/**********TRAINING CONTROLLER************/

// each Ctrl should call  - mainService.user - for access to the user object

angular.module('app').controller('trainingCtrl', function($scope, $state, mainService) {

  /** Create text areas **/
  var textarea1 = document.getElementById('solution-input');
  var solutionsCode = CodeMirror.fromTextArea(textarea1, {
   lineNumbers: true,
   theme: 'seti',
  });

  var textarea2 = document.getElementById('example-input');
  var examplesCode = CodeMirror.fromTextArea(textarea2, {
   lineNumbers: true,
   theme: 'seti',
  });

  $scope.languages = ['JavaScript', 'Python'];
  $scope.versions = ['Node v0.10.33', 'Node v6.6.0'];
  $scope.output = [];

  //NG-SHOWS
  $scope.showOutputShow = true;
  $scope.showInstructionsShow = false;
  $scope.showOutput = function() {
    $scope.showOutputShow = false;
    $scope.showInstructionsShow = true;
  }
  $scope.showInstructions = function() {
    $scope.showOutputShow = true;
    $scope.showInstructionsShow = false;
  }

  // GET KATA INFORMATION
  $scope.getKataById = (kataid) => {
    mainService.getKataById(kataid).then((response) => {
      console.log(response.data);
      $scope.name = response.data.name;
      $scope.instructions = response.data.description;
      $scope.kyu = response.data.kyu;
      $scope.starter = response.data.starter_code;
      $scope.examples = response.data.examples.map((example) => {return example.test});
      $scope.kataid = response.data.id;
    }).then(() =>{
      solutionsCode.setValue($scope.starter);
      examplesCode.setValue($scope.examples.join(/\n/));
    });
  }

  $scope.getKataById(2);



  //Examples should be an array of objects. Returned results will be an array with the different tests and their results.
  $scope.testExamples = function() {
    var solutions = solutionsCode.getValue();
    var examples = examplesCode.getValue();
    $scope.showOutput();
    solutions = solutions.replace(/\n/g, " ");
    solutions = solutions.replace(/\s+/g, " ");
    var examplesArr = [];
    console.log("solutions: ", solutions, " examples: ", examples);
    examples = examples.split(/\n/);
    console.log(examples);
    examples.forEach(example => examplesArr.push({test: example}));
    var t0 = performance.now()
    mainService.testExamples(solutions, examplesArr).then((response) => $scope.output.push(response.data[0]));
    var t1 = performance.now();
    $scope.time = "Time: " + Math.round((t1 - t0)*1000) + " ms";
  }

  $scope.testSuite = function() {
    var solutions = solutionsCode.getValue();
    $scope.showOutput();
    solutions = solutions.replace(/\n/g, " ");
    solutions = solutions.replace(/\s+/g, " ");
    // mainService.testSuite(solutions, $scope.kataid).then((response) => console.log(response));
  }

  $scope.submitAnswer = (solution, kataid, userid) => {
    mainService.submitAnswer(solution, kataid, userid);
  }

});
