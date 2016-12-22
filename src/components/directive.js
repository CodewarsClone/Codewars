angular.module('app').directive('animateDir', function () {
  return {
    scope: {
      settings: "="
    },
    restrict: 'EA',
    link: function (scope, elems, attrs) {
      $(document).ready(function () {
        $('.side-menu').on('mouseenter', function () {
          console.log('this is working');
          // $('.side-menu-container').css('width', '160px');
          $('.side-menu').css('width', '215px');
          $('.menu-items').css('display','flex');
        });
        $('.side-menu').on('mouseleave', function () {
          console.log("it's all gone");
          $('.side-menu').css('width', '55px');
          $('.menu-items').css('display','none');
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
