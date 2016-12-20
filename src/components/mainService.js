angular.module('app').service('mainService', function($http, $q, $sce) {

  // $sce.trustAsResourceUrl('/s');

  this.testExamples = function(solution, examples) {
    return $http({
      method: 'POST',
      url: `http://192.168.0.186:3030/test/examples`,
      data: {
        script: solution,
        examples: examples
      }
    });
  };

  this.testSuite = function(solution, kataid) {
    return $http({
      method: 'POST',
      url: `/test/suite/${kataid}`,
      data: {
        script: solution
      }
    });
  };

});
