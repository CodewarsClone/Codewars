angular.module('app').service('mainService', function($http, $q, $sce) {

  // $sce.trustAsResourceUrl('/s');

  this.getTest = function(solution, examples) {
    return $http({
      method: 'POST',
      url: '/solution',
      data: {
        script: solution
      }
    });
  };

});
