angular.module('app').directive('formatCode', function() {
  return {
    link: function(scope, element, attr) {
      $(element).on('keyup', function() {
        var input = element.html().split(' ');
        input = input.map((word) => {
          if (word === "function" || word === "Function") {
            word = "<span style='color: purple'>function</span>";
          }
          return word;
        })
        console.log(input);
        scope.solutionInput = input.join(' ');
        element.html(input.join(' '));
      })
    }
  };
});
