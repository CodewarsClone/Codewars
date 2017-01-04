
/************ SOLUTIONS CONTROLLER *********/

angular.module('app').controller('solutionsCtrl', function($scope, $state, mainService, $stateParams) {
  
  mainService.checkAuth();
  $scope.kataid = $stateParams.kataid;
  $scope.user = mainService.user;
  // $scope.kataSolutions = [{ script:"function dog(x) { var jerk = 'hello' }"}];

  // NO LONGER NECESSARY, BUT USEFUL FOR REFERENCE. IT ALSO HAPPENS TO WORK, ALBEIT WITH A DELAY BECAUSE OF THE SETTIMEOUT.
  // var textareas = [];
  // var codemirrors =[];//s
  // function makeCodeMirrors() {
  //   for (let i = 0; i < $scope.kataSolutions.length; i++) {
  //     textareas[i] = document.getElementById(`solution-text${$scope.kataSolutions[i].id}`);
  //     console.log("within controller", textareas[i]);
  //     codemirrors[i] = CodeMirror.fromTextArea(textareas[i], {
  //       lineNumbers: true,
  //       theme: 'seti',
  //       readOnly: true,
  //     });
  //     codemirrors[i].setValue($scope.kataSolutions[i].script)
  //   }
  // }


    $scope.getKataById = (kataid) => {
        mainService.getKataById(kataid).then(response => {
            $scope.kataById = response.data;
            $scope.getKataSolutions($scope.kataid);
            // console.log($scope.kataById);
        })
    }

    var solutionsExist = false;

    $scope.getKataSolutions = (kataid) => {
        mainService.getKataSolutions(kataid).then(response => {
            $scope.kataSolutions = response.data;
            if ($scope.kataSolutions[0]) {
              // solutionsPageCode.setValue("Here's where your code should be.");
            } else {
              // solutionsPageCode.setValue("It looks like you haven't submitted any solutions to this kata.");
            }
            console.log($scope.kataSolutions)
            // setTimeout(makeCodeMirrors, 1000);
        })
    }

    $scope.voteSolution = (solutionid, vote) => { // the vote is a true or false value
        mainService.voteSolution(mainService.user.id, solutionid, vote).then(response => {
            $scope.solutionVotes = response.data;
            console.log($scope.solutionVotes);
        })
    }

    $scope.init = () => {
        $scope.getKataById($scope.kataid);
    }//s



    



});
