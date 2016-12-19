'use strict';

angular.module('app', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: './components/home/home.html',
        controller: 'homeCtrl'
    }).state('kata_list', {
        url: '/kata_list',
        templateUrl: './components/kata_list/kata_list.html',
        controller: 'kata_listCtrl'
    }).state('login', {
        url: '/login',
        templateUrl: './components/login/login.html',
        controller: 'loginCtrl'
    }).state('profile', {
        url: '/profile',
        templateUrl: './components/profile/profile.html',
        controller: 'profileCtrl'
    }).state('solutions', {
        url: '/solutions',
        templateUrl: './components/solutions/solutions.html',
        controller: 'solutionsCtrl'
    }).state('training', {
        url: '/training',
        templateUrl: './components/training/training.html',
        controller: 'trainingCtrl'
    });

    $urlRouterProvider.otherwise('/');
});
'use strict';

angular.module('app').service('mainService', function ($http, $q, $sce) {

  // $sce.trustAsResourceUrl('/s');

  this.getTest = function (input) {
    return $http({
      method: 'POST',
      url: '/solution',
      data: {
        script: input
      }
    });
  };
});
'use strict';

/***********HOME CONTROLLER***********/

angular.module('app').controller('homeCtrl', function ($scope, $state, mainService) {});
"use strict";
"use strict";
"use strict";
"use strict";
'use strict';

/**********TRAINING CONTROLLER************/

angular.module('app').controller('trainingCtrl', function ($scope, $state, mainService) {

  $scope.sendSolution = function (input) {
    // mainService.getTest(input).then((response) => console.log(response));
    input = input.replace(/\n/g, " ");
    console.log(input);
  };
});
//# sourceMappingURL=bundle.js.map
