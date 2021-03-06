/**********TRAINING CONTROLLER************/

angular.module('app').controller('trainingCtrl', function ($scope, $state, mainService, $stateParams) {
	
	mainService.checkAuth();
	$scope.kataid = $stateParams.kataid;
	$scope.passed = false;
	$scope.showInstruction = true;
	$scope.showOutput = false;
	$scope.submit = false;
	$scope.gotError = false;
	$scope.instructionBg = true;
	$scope.outputBg = false;
	
	
	
	/** Create text areas **/
	var textarea1 = document.getElementById('solution-input');
	var solutionsCode = CodeMirror.fromTextArea(textarea1, {
		lineNumbers: true,
		theme: 'seti',
		lineSeparator: '\\n',
	});
	
	var textarea2 = document.getElementById('example-input');
	var examplesCode = CodeMirror.fromTextArea(textarea2, {
		lineNumbers: true,
		theme: 'seti',
	});


	
	$scope.languages = ['JavaScript'];
	$scope.versions = 'Node v6.6.0';
	$scope.output = [];
	$scope.instruction = true;
	
	//NG-SHOWS
	$scope.showOutputShow = true;
	$scope.showInstructionsShow = false;
	$scope.showOutput = function () {
		$scope.showOutputShow = false;
		$scope.showInstructionsShow = true;
	};
	$scope.showInstructions = function () {
		$scope.showOutputShow = true;
		$scope.showInstructionsShow = false;
	};
	
	// GET KATA INFORMATION
	$scope.getKataById = (kataid) => {
		mainService.getKataById(kataid).then((response) => {
			$scope.name = response.data.name;
			$scope.instructions = response.data.description.replace(/\\n/g, '\n');
			$scope.kyu = response.data.kyu;
			$scope.starter = response.data.starter_code;
			$scope.examples = response.data.examples[0].test;
			$scope.kataid = response.data.id;
		}).then(() => {
			solutionsCode.setValue($scope.starter);
			examplesCode.setValue($scope.examples);
		});
	};
	
	$scope.reset = () => {
		examplesCode.setValue($scope.examples);
	}

	solutionsCode.on('change', () => {
		$scope.submit = false;
	});

	$scope.getKataById($scope.kataid);
	
	//Examples should be an array of objects. Returned results will be an array with the different tests and their results.
	$scope.testExamples = function () {
		var solutions = solutionsCode.getValue();
		var examples = examplesCode.getValue();
		$scope.showOutput();
		$scope.instructionBg = false;
		$scope.outputBg = true;
		var t0 = performance.now();
		solutions = solutions
			.replace(/\\n/g, '\n')
			.replace(/\s*\n*\r*\/\/.*\n*\r*/g, '')
			.replace(/\n\s*\./g, `.`)
			.replace(/\\n/g, " ")
			.replace(/\s+/g, " ");
		var examplesArr = [];
		examples = examples
			.replace(/\\n/g, '\n')
			.replace(/\s*\n*\r*\/\/.*\n*\r*/g, '')
			.replace(/\n\s*\./g, `.`)
			.replace(/\n/g, ` `)
			.replace(/\s+/g, ` `);
		mainService.testExamples(solutions, examples).then((response) => {
			$scope.submit = false;
			var t1 = performance.now();
			if (typeof response.data === 'string') {
				$scope.gotError = true;
				$scope.answer = null;
				$scope.error = response.data.replace(/\\n/g, '\n');
				$scope.error = $scope.error.replace(/\\s/g, ' ');
			} else {
				$scope.error = null;
				$scope.gotError = false;
				$scope.answer = response.data.nest;
				$scope.time = Math.round(t1 - t0) + " ms";
				$scope.testPass = response.data.passCount;
				$scope.testFail = response.data.testCount - response.data.passCount;
			}
			
		});
	};
	
	$scope.testSuite = function () {
		var solutions = solutionsCode.getValue();
		$scope.showOutput();
		var t0 = performance.now();
		solutions = solutions
			.replace(/\\n/g, '\n')
			.replace(/\s*\n*\r*\/\/.*\n*\r*/g, '')
			.replace(/\n\s*\./g, `.`)
			.replace(/\\n/g, " ")
			.replace(/\s+/g, " ");
		mainService.testSuite(solutions, $scope.kataid).then((response) => {
			var t1 = performance.now();
			if (typeof response.data === 'string') {
				$scope.gotError = true;
				$scope.answer = null;
				$scope.error = response.data.replace(/\\n/g, '\n');
				$scope.error = $scope.error.replace(/\\s/g, ' ');
			} else {
				$scope.error = null;
				$scope.gotError = false;
				$scope.answer = response.data.nest;
				$scope.time = Math.round(t1 - t0) + " ms";
				$scope.testPass = response.data.passCount;
				$scope.testFail = response.data.testCount - response.data.passCount;

				$scope.submit = (response.data.testCount === response.data.passCount ? true : false);
			}
		});
	};
	
	$scope.submitAnswer = () => {
		var solution = solutionsCode.getValue();
		if ($scope.submit) {
			mainService.submitAnswer(solution, $scope.kataid, mainService.user.id);
			$state.go('menu.solutions',{kataid: $scope.kataid});
			mainService.addPointsToUser(mainService.pointsCalculator($scope.kyu));
		}
	}
	
});
