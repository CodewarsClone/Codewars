
angular.module('app').controller('kata_listCtrl', function($scope, $state, mainService) {

  $scope.tags = ["Fundamentals", "Data Types", "Algorithms", "Logic", "Strings", "Numbers", "Arrays", "Basic Language Features", "Mathematics", "Programming Paradigms", "Control Flow", "Declarative Programming", "Data Structures", "Puzzles", "Games", "Advanced Language Features", "Functions", "Regular Expressions", "Object-oriented Programming", "Lists", "Functional Programming", "Objects", "Bugs", "Utilities", "Arithmetic", "Loops", "Parsing", "Binary", "Integers", "Sorting", "Algebra", "Classes", "Formatting", "Theoretical Computer Science", "Dates/Time", "Security", "Higher-order Functions", "Prototypes", "Computability Theory", "Recursion", "Geometry", "Sequences", "Babel", "Cryptography", "ES2015", "Design Principles", "Graphs", "Hacking Holidays", "Design Patterns", "Validation"]

  $scope.sortOptions = ["Newest", "Oldest", "Popularity", "Positive Feedback", "Most Completed", "Least Completed", "Recently Published", "Hardest", "Easiest", "Name"];
  $scope.languageOptions = ["All", "My Languages", "C", "C++", "C#", "Clojure"];
  $scope.statusOptions = ["Approved & Beta", "Approved", "Beta"];
  $scope.progressOptions = ["All", "Kata I have not trained on", "Kata I have not completed", "Kata I have completed"];

  $scope.searchFunction = (kata) => {
    return kata.name === $scope.Filter;
  }

    $scope.getRandomKataList = (userid) => {
        mainService.getRandomKataList(userid).then(response => {
            console.log(response.data);
            $scope.randomKataList = response.data;
            $scope.totalKata = $scope.randomKataList.length;
        })
    }

    $scope.searchKatasByName = (userInput) => {
        mainService.searchKatasByName(`%${userInput}%`).then(response => {
            console.log(response.data);
            $scope.searchResult = response.data;
        })
    }

    $scope.getKatasByKyu = (kyu) => {
        mainService.getKatasByKyu(kyu).then(response => {
            console.log(response.data);
            $scope.randomKataList = response.data;
            $scope.totalKata = $scope.randomKataList.length;
        })
    }

    $scope.init = () => {
        $scope.getRandomKataList(mainService.user.id);
    }

});
