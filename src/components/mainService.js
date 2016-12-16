angular.module('app').service('mainService', function($http, $q, $sce) {

  $sce.trustAsResourceUrl('https://api.musixmatch.com/ws/1.1');

  this.getTest = function() {
    return $http({
      method: 'GET',
      url: 'http://'
    });
  };

});
