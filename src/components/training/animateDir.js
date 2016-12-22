angular.module('app').directive('trainingAnimateDir', function () {
  return {
    scope: {
      trainingAnimate: "="
    },
    restrict: 'EA',
    link: function (scope, elems, attrs) {
      $(document).ready(function () {
        $('.solutions-icon').on('mouseclick', function () {
          console.log("This is working");
        });
      })
    }
  }
});
