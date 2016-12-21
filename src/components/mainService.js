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
      url: `api/test/suite/${kataid}`,
      data: {
        script: solution
      }
    });
  };

  this.setSolution = (solution, kataid) => {
    return $http({
      method: 'POST',
      url: `/api/solution/` + kataid,
      data: {
         script: solution
      }
    });
  };


// GET
  this.getUser = () => {
    return $http({
      method: 'GET',
      url: `/api/me`
    })
  }

  this.getKatas = () => {
    return $http({
      method: 'GET',
      url: `/api/kata`
    });
  };

  this.getKataById = (kataid) => {
    return $http({
      method: 'GET',
      url: `/api/kata/` + kataid
    });
  };

  this.getCompletedKatas = () => {
    return $http({
      method: 'GET',
      url: `/api/kata/completed`
    });
  };

  this.getRandomKata = () => {
    return $http({
      method: 'GET',
      url: `/api/kata/random` 
    });
  };

  this.getRandomKyuKata = (kyu) => {
    return $http({
      method: 'GET',
      url: `/api/kata/random/` + kyu 
    });
  };

  this.getKataSolutions = (kataid) => {
    return $http({
      method: 'GET',
      url: `/api/solutions/` + kataid
    });
  };

});
