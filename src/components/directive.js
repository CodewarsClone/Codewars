angular.module('app').directive('animateDir', function () {
  return {
    scope: {
      settings: "="
    },
    restrict: 'EA',
    link: function (scope, elems, attrs) {
      $(document).ready(function () {
        $('.side-menu').on('mouseenter', function () {
          $('.side-menu-container').css('width', '160px');
        });
        $('.side-menu-container').on('mouseleave', function () {
          $('.side-menu-container').css('width', '0px');
        });
        $('.top-menu').on('mouseenter', function () {
          console.log('You have entered the twilight zone');
        });

        $('.solutions-icon').on('mouseclick', function () {
          console.log("This is working");
        });



      })
    }
  }
});
