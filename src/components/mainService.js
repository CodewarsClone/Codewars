/************* MAIN SERVICE ***************/

angular.module('app').service('mainService', function($http, $q, $sce) {

  // $sce.trustAsResourceUrl('/s');

this.user = {}

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

  this.setSolution = (solution, kataid) => {
    return $http({
      method: 'POST',
      url: `/solution/` + kataid,
      data: {
         script: solution
      }
    });
  };


// GET
  this.getMe = () => {
    return $http({
      method: 'GET',
      url: `/me`
    })
  }

  this.getKatas = () => {
    return $http({
      method: 'GET',
      url: `/kata`
    });
  };

  this.getKataById = (kataid) => {
    return $http({
      method: 'GET',
      url: `http://192.168.0.186:3030/kata/` + kataid
    });
  };

  this.completedKatas = () => {
    return $http({
      method: 'GET',
      url: `/kata/completed`
    });
  };

  this.randomKata = () => {
    return $http({
      method: 'GET',
      url: `/kata/random`
    });
  };

  this.randomKyuKata = (kyu) => {
    return $http({
      method: 'GET',
      url: `/kata/random/` + kyu
    });
  };

  this.kataSolutions = (kataid) => {
    return $http({
      method: 'GET',
      url: `/solutions/` + kataid
    });
  };

});
