angular.module('app').service('mainService', function($http, $q, $sce) {

  // $sce.trustAsResourceUrl('/s');

  this.getTest = function(input) {
    return $http({
      method: 'POST',
      url: '/solution',
      data: {
        script: input
      }
    });
  };

});
