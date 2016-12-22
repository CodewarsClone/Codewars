/************* MAIN SERVICE ***************/

angular.module('app').service('mainService', function($http, $q, $sce) {

  // $sce.trustAsResourceUrl('/s');

  // Dumby information so I don't have to mess with the server all the time.
  // this.user = {id: 4, github_id: "20197415", name: "Steven", email: null, picture_url: "https://avatars.githubusercontent.com/u/20197415?v=3", username: "Steven-Nagie"};
  this.user = {};

// POST
  this.testExamples = (solution, examples) => {
    return $http({
      method: 'POST',
      url: `http://192.168.0.186:3030/api/test/examples`,
      data: {
        script: solution,
        examples: examples
      }
    });
  };

  this.testSuite = (solution, kataid) => {
    return $http({
      method: 'POST',
      url: `/api/test/suite/${kataid}`,
      data: {
        script: solution
      }
    });
  };

  this.setSolution = (solution, kataid) => {
    return $http({
      method: 'POST',
      url: `/api/solution/` + kataid,
      data: {
         script: solution
      }
    });
  };

   //kata_listCtrl
  this.searchKatasByName = (input) => {
    return $http({
      method: 'POST',
      url: `/api/kata-by-name`,
      data: {
        userInput: input
      }
    })
  }


// GET
  this.getUser = () => {
    return $http({
      method: 'GET',
      url: `/api/me`
    })
  }

  // trainingCtrl
  this.getKataById = (kataid) => {
    return $http({
      method: 'GET',
      url: `/api/kata/` + kataid
    });
  };

  // homeCtrl - displaying one kata withing range
  // kata_listCtrl = displays a plethora of katas based on user ability
  this.getRandomKata = (userid) => { // eventually we will want it to return a random kata based on the users experience. THAT IS WHY THERE IS AN ID PARAM
    return $http({
      method: 'GET',
      url: `/api/random-kata`
    });
  };

  this.getRandomKataList = (userid) => {
    return $http({
      method: 'GET',
      url: `/api/random-kata-list`
    });
  }

  // kata_listCtrl
  this.getKatasByKyu = (kyu) => {
    return $http({
      method: 'GET',
      url: `/api/katas-by-kyu/` + kyu 
    });
  };

  // solutionsCtrl
  this.getKataSolutions = (kataid) => {
    return $http({
      method: 'GET',
<<<<<<< HEAD
      url: `/api/kata-random/` + kyu
=======
      url: `/api/solutions/` + kataid
>>>>>>> master
    });
  };

  // profileCtrl - brings back a specific users kata information (script, name, kyu, description) - use on kata tab soltion tab
  this.getUserKatas = () => {
    return $http({
      method: 'GET',
      url: `/api/get-user-katas`
    });
  };




});
