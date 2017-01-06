
angular.module('app').controller('kata_listCtrl', function($scope, $state, mainService) {

  mainService.checkAuth();
  $scope.tags = ["Fundamentals", "Data Types", "Algorithms", "Logic", "Strings", "Numbers", "Arrays", "Basic Language Features", "Mathematics", "Programming Paradigms", "Control Flow", "Declarative Programming", "Data Structures", "Puzzles", "Games", "Advanced Language Features", "Functions", "Regular Expressions", "Object-oriented Programming", "Lists", "Functional Programming", "Objects", "Bugs", "Utilities", "Arithmetic", "Loops", "Parsing", "Binary", "Integers", "Sorting", "Algebra", "Classes", "Formatting", "Theoretical Computer Science", "Dates/Time", "Security", "Higher-order Functions", "Prototypes", "Computability Theory", "Recursion", "Geometry", "Sequences", "Babel", "Cryptography", "ES2015", "Design Principles", "Graphs", "Hacking Holidays", "Design Patterns", "Validation"]

  $scope.sortOptions = ["Newest", "Oldest", "Popularity", "Positive Feedback", "Most Completed", "Least Completed", "Recently Published", "Hardest", "Easiest", "Name"];
  $scope.languageOptions = ["All", "My Languages", "C (Beta)", "C++", "C#", "Clojure", "CoffeeScript", "Crystal (Beta)", "Dart (Beta)", "Elixir", "F# (Beta)", "Haskell", "Java", "JavaScript", "OCami (Beta)", "PHP", "Python", "Ruby", "Rust (Beta)", "Shell (Beta)"];
  $scope.statusOptions = ["Approved & Beta", "Approved", "Beta"];
  $scope.progressOptions = ["All", "Kata I have not trained on", "Kata I have not completed", "Kata I have completed"];

  $scope.kyuIcons = [
    "./assets/imgs/1_kyu_icon.png",
    "./assets/imgs/2_kyu_icon.png",
    "./assets/imgs/3_kyu_icon.png",
    "./assets/imgs/4_kyu_icon.png",
    "./assets/imgs/5_kyu_icon.png",
    "./assets/imgs/6_kyu_icon.png",
    "./assets/imgs/7_kyu_icon.png",
    "./assets/imgs/8_kyu_icon.png",
  ]

  $scope.colorIcons = [  "./assets/imgs/1_kyu_icon_color.png", "./assets/imgs/2_kyu_icon_color.png",
  "./assets/imgs/3_kyu_icon_color.png",   "./assets/imgs/4_kyu_icon_color.png", "./assets/imgs/5_kyu_icon_color.png",    "./assets/imgs/6_kyu_icon_color.png", "./assets/imgs/7_kyu_icon_color.png", "./assets/imgs/8_kyu_icon_color.png", ];

  $scope.iconFlags = [];
  $scope.iconDisplay = [];
  $scope.setIconDisplay = () => {
    for (let i = 0; i < 8; i++) {
      $scope.iconFlags[i] = false;
      $scope.iconDisplay[i] = $scope.kyuIcons[i];
    }
  }

  $scope.searchFunction = (kata) => {
    return kata.name === $scope.Filter;
  }

    $scope.getRandomKataList = () => {
        mainService.getRandomKataList(mainService.user.kyu_level).then(response => {
            $scope.randomKataList = response.data;
            $scope.displayKataList = $scope.randomKataList;
            $scope.totalKata = $scope.displayKataList.length;
            $scope.getKataVotes();
        })
    }

    $scope.searchKatasByName = (userInput) => {
        mainService.searchKatasByName(`%${userInput}%`).then(response => {
            $scope.searchResult = response.data;
        })
    }

    $scope.getKatasByKyu = (kyu) => {
        $scope.setIconDisplay();
        $scope.iconFlags[kyu-1] = true;
        $scope.iconDisplay[kyu-1] = $scope.colorIcons[kyu-1];
        // for (let i = $scope.displayKataList.length - 1; i >= 0; i--) {
        //   if ($scope.displayKataList[i].kyu !== kyu) {
        //     $scope.displayKataList.splice(i, 1);
        //   }
        // }
        $scope.totalKata = $scope.displayKataList.length;
        mainService.getKatasByKyu(kyu).then(response => {
            $scope.displayKataList = response.data;
            $scope.totalKata = $scope.displayKataList.length;
        })
    }

    $scope.init = () => {
        $scope.getRandomKataList();
        $scope.setIconDisplay();
    }

    $scope.tagClick = (filterThing) => {
      $scope.setIconDisplay();
      $scope.displayKataList = [];
      for (let i = 0; i < $scope.randomKataList.length; i++) {
        if ($scope.randomKataList[i].tags.indexOf(filterThing.toUpperCase()) !== -1) {
          $scope.displayKataList.push($scope.randomKataList[i])
        }
      }
      $scope.totalKata = $scope.displayKataList.length;
    }

    // Have yet to test this because kata are not displaying correctly.
    $scope.languageSort = (language) => {
      $scope.displayKataList = [];
      // This double for loop is very ugly, but I did it this way to prevent it breaking if there are variations in database input. It worked without it before, but the old version would break if human error ever entered JAvascript instead of JavaScript, for example, when inputting information.
      for (let i = 0; i < $scope.randomKataList.length; i++) {
        for (let j = 0; j < $scope.randomKataList[i].languages.length; j++) {
          if ($scope.randomKataList[i].languages[j].toUpperCase() === language.toUpperCase()) {
            $scope.displayKataList.push($scope.randomKataList[i])
          }
        }
      }
      $scope.totalKata = $scope.displayKataList.length;
    }

    $scope.getKataVotes = () => {
        mainService.getKataVotes().then(response => {
            $scope.allKataVotes = response.data
            console.log($scope.allKataVotes);
            $scope.likes = $scope.allKataVotes[0];
            $scope.dislikes = $scope.allKataVotes[1];
            $scope.votes = $scope.allKataVotes[2];
            $scope.votes.forEach((vote) => {
              vote.likes = 0;
              vote.votes = parseInt(vote.votes);
              for (let i = 0; i < $scope.likes.length; i++) {
                if ($scope.likes[i].kata_id === vote.kata_id) {
                    vote.likes += 1;
                }
              }
              vote.satisfaction = (vote.likes/vote.votes)*100;
            });
            $scope.displayKataList.forEach((kata) => {
              kata.satisfaction = 0;
              kata.votes = 0;
              for (let i of $scope.votes) {
                if (i.kata_id === kata.id) {
                  kata.satisfaction = i.satisfaction;
                  kata.votes = i.votes;
                }
              }
            });
        })
    }

});
