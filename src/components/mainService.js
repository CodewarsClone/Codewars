/************* MAIN SERVICE ***************/

angular.module('app').service('mainService', function($http, $q, $sce, $state) {

  // $sce.trustAsResourceUrl('/s');

  // Dummy information so I don't have to mess with the server all the time.
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

  // 192.168.0.186:3030

  this.testSuite = (solution, kataid) => {
    return $http({
      method: 'POST',
      url: `http://192.168.0.186:3030/api/test/suite/${kataid}`,
      data: {
        script: solution
      }
    });
  };

  this.submitAnswer = (solution, kataid, userid) => {
    return $http({
      method: 'POST',
      url: `/api/submit-answer/` + kataid,
      data: {
         userid: userid,
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

  this.voteKata = (userid, kataid, vote) => {
    return $http({
      method: 'POST',
      url: `/api/kata-votes`,
      data: {
        userid: userid,
        kataid: kataid,
        vote: vote
      }
    })
  }

  this.voteSolution = (userid, solutionid, vote) => {
    return $http({
      method: 'POST',
      url: `/api/solution-votes/`,
      data: {
        userid: userid,
        solutionid: solutionid,
        vote: vote
      }
    })
  };

// GET
  this.getUser = () => {
    return $http({
      method: 'GET',
      url: `/api/me`
    })
  };

  // trainingCtrl
  this.getKataById = (kataid) => {
    return $http({
      method: 'GET',
      url: `/api/kata/` + kataid
    });
  };

  // homeCtrl - displaying one kata within range
  this.getRandomKata = (userkyu) => {
    return $http({
      method: 'GET',
      url: `/api/random-kata/${userkyu}`
    });
  };

  // kata_listCtrl = displays a plethora of katas based on user ability
  this.getRandomKataList = (userkyu) => {
    return $http({
      method: 'GET',
      url: `/api/random-kata-list/${userkyu}`
    });
  };

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
      url: `/api/solutions/` + kataid
    });
  };

  // profileCtrl - brings back a specific users kata information (script, name, kyu, description) - use on kata tab soltion tab
  this.getUserKatas = (userid) => {
    return $http({
      method: 'GET',
      url: `/api/get-user-katas/` + userid
    });
  };

  this.getKataVotes = () => {
    return $http({
      method: 'GET',
      url: `/api/kata-votes`
    });
  };

  this.getSolutionVotes = () => {
    return $http({
      method: 'GET',
      url: `/api/solution-votes/`
    })
  }

// PUT
  this.addPointsToUser = (points) => {
    return $http({
      method: 'PUT',
      url: `/api/points`,
      data: {
        points: points,
      }
    }).then( () => {
    	this.getUser().then(res => {
    		this.user = res.data;
		    $state.reload();
	    })
    })
  };

// OTHER
  this.rankCalculator = (user) => {
  switch (true) {
    case user.points < 12:
      return user.kyu_level = 8;
      break;
    case user.points < 24 && user.points >= 12:
      return user.kyu_level = 7;
      break;
    case user.points < 48 && user.points >= 24:
      return user.kyu_level = 6;
      break;
    case user.points < 96 && user.points >= 48:
      return user.kyu_level = 5;
      break;
    case user.points < 192 && user.points >= 96:
      return user.kyu_level = 4;
      break;
    case user.points < 384 && user.points >= 192:
      return user.kyu_level = 3;
      break;
    case user.points < 768 && user.points >= 384:
      return user.kyu_level = 2;
      break;
    case user.points >= 768:
      return user.kyu_level = 1;
      break;
  }
};

  this.pointsCalculator = (kyu) => {
    
	  if (kyu === 8) {
	  	this.user.points += 1;
	  	return this.user.points
	  }else if (kyu === 7) {
	  	this.user.points += 2;
	  	return this.user.points
	  }else if (kyu === 6) {
	  	this.user.points += 4;
	  	return this.user.points
	  }else if (kyu === 5) {
	  	this.user.points += 8;
	  	return this.user.points
	  }else if (kyu === 4) {
	  	this.user.points += 16;
	  	return this.user.points
	  }else if (kyu === 3) {
	  	this.user.points += 32;
	  	return this.user.points
	  }else if (kyu === 2) {
	  	this.user.points += 64;
	  	return this.user.points
	  }else if (kyu === 1) {
	  	this.user.points += 128;
	  	return this.user.points
	  }
  };

  this.checkAuth = () => {
    $http({
      method: 'GET',
      url: `/api/check-auth`
    }).then(response => {
    }, response => {
       $state.go('login');
    })
  };

});
