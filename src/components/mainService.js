angular.module('app').service('mainService', function($http, $q, $sce) {

  // $sce.trustAsResourceUrl('/s');

// POST
  this.testExamples = (solution, examples) => {
    return $http({
      method: 'POST',
      url: `http://192.168.0.186:3030/test/examples`,
      data: {
        script: solution,
        examples: examples
      }
    });
  };

  this.testSuite = (solution, kataid) => {
    return $http({
      method: 'POST',
      url: `/test/suite/${kataid}`,
      data: {
        script: solution
      }
    });
  };

  // this.nameFunction = () => {
  //   return $http({
  //     method: 'POST',
  //     url: ``, /solution/:kataId
  //     data: {

  //     }
  //   });
  // };


// GET
  // this.nameFunction = () => {
  //   return $http({
  //     method: 'GET',
  //     url: ``, /kata
  //     data: {

  //     }
  //   });
  // };

  // this.nameFunction = () => {
  //   return $http({
  //     method: 'GET',
  //     url: ``, /kata/:kataId
  //     data: {

  //     }
  //   });
  // };

  // this.nameFunction = () => {
  //   return $http({
  //     method: 'GET',
  //     url: ``, /kata/completed
  //     data: {

  //     }
  //   });
  // };

  // this.nameFunction = () => {
  //   return $http({
  //     method: 'GET',
  //     url: ``, /kata/random
  //     data: {

  //     }
  //   });
  // };

  // this.nameFunction = () => {
  //   return $http({
  //     method: 'GET',
  //     url: ``, /kata/random/:kyu
  //     data: {

  //     }
  //   });
  // };

  // this.nameFunction = () => {
  //   return $http({
  //     method: 'GET',
  //     url: ``, /solutions/:kataId
  //     data: {

  //     }
  //   });
  // };

});
