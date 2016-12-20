angular.module('app').service('mainService', function($http, $q, $sce) {

  // $sce.trustAsResourceUrl('/s');

  this.testExamples = function(solution, examples, kataid) {
    return $http({
      method: 'POST',
      url: `/test/examples/${kataid}`,
      data: {
        script: solution,
        examples: examples
      }
    });
  };

  this.testSuite = function(solution, kataid) {
    return $http({
      method: 'POST',
      url: `/test/${kataid}`,
      data: {
        script: solution
      }
    });
  };

});
