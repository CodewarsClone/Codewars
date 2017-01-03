
angular.module('app').controller('kata_listCtrl', function($scope, $state, mainService) {

  $scope.tags = ["Fundamentals", "Data Types", "Algorithms", "Logic", "Strings", "Numbers", "Arrays", "Basic Language Features", "Mathematics", "Programming Paradigms", "Control Flow", "Declarative Programming", "Data Structures", "Puzzles", "Games", "Advanced Language Features", "Functions", "Regular Expressions", "Object-oriented Programming", "Lists", "Functional Programming", "Objects", "Bugs", "Utilities", "Arithmetic", "Loops", "Parsing", "Binary", "Integers", "Sorting", "Algebra", "Classes", "Formatting", "Theoretical Computer Science", "Dates/Time", "Security", "Higher-order Functions", "Prototypes", "Computability Theory", "Recursion", "Geometry", "Sequences", "Babel", "Cryptography", "ES2015", "Design Principles", "Graphs", "Hacking Holidays", "Design Patterns", "Validation"]

  $scope.sortOptions = ["Newest", "Oldest", "Popularity", "Positive Feedback", "Most Completed", "Least Completed", "Recently Published", "Hardest", "Easiest", "Name"];
  $scope.languageOptions = ["All", "My Languages", "C", "C++", "C#", "Clojure"];
  $scope.statusOptions = ["Approved & Beta", "Approved", "Beta"];
  $scope.progressOptions = ["All", "Kata I have not trained on", "Kata I have not completed", "Kata I have completed"];

  $scope.searchFunction = (kata) => {
    return kata.name === $scope.Filter;
  }

    $scope.getRandomKataList = () => {
        mainService.getRandomKataList(mainService.user.kyu_level).then(response => {
            console.log(response.data);
            $scope.randomKataList = response.data;
            $scope.displayKataList = $scope.randomKataList;
            $scope.totalKata = $scope.displayKataList.length;
        })
    }

    $scope.searchKatasByName = (userInput) => {
        mainService.searchKatasByName(`%${userInput}%`).then(response => {
            $scope.searchResult = response.data;
        })
    }

    $scope.getKatasByKyu = (kyu) => {
        mainService.getKatasByKyu(kyu).then(response => {
            $scope.displayKataList = response.data;
            $scope.totalKata = $scope.displayKataList.length;
        })
    }

    $scope.init = () => {
        $scope.getRandomKataList();
    }

    $scope.tagClick = (filterThing) => {
      $scope.displayKataList = [];
      for (let i = 0; i < $scope.randomKataList.length; i++) {
        if ($scope.randomKataList[i].tags.indexOf(filterThing.toUpperCase()) !== -1) {
          $scope.displayKataList.push($scope.randomKataList[i])
        }
      }
      $scope.totalKata = $scope.displayKataList.length;
    }

});
