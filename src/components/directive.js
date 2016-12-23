angular.module('app').directive('animateDir', function () {
  return {
    scope: {
      settings: "="
    },
    restrict: 'EA',
    link: function (scope, elems, attrs) {
      $(document).ready(function () {
        $('.side-menu').on('mouseenter', function () {
          $('.side-menu').css('width', '215px');
          setTimeout(function(){
          $('.menu-items').css('display','flex');
          },200);
        });
        $('.side-menu').on('mouseleave', function () {
          $('.side-menu').css('width', '55px');
          $('.menu-items').css('display','none');
        });
        $('.top-menu').on('mouseenter', function () {
          $('.top-menu').css('background-color', '#222222')
        });

        $('.top-menu').on('mouseleave', function () {
          $('.top-menu').css('background-color', 'rgba(0,0,0,0)')
        });

        $('.solutions-icon').on('mouseclick', function () {
          console.log("This is working");
        });



      })
    }
  }
});
