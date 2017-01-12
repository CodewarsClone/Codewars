/************* MAIN SERVICE ***************/

angular.module('app').service('mainService', function($http, $q, $sce, $state) {

  // $sce.trustAsResourceUrl('/s');

  this.user = {};

// POST
  this.testExamples = (solution, examples) => {
    return $http({
      method: 'POST',
      url: `http://code.baert.io/api/test/examples`,
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
      url: `http://code.baert.io/api/test/suite/${kataid}`,
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

  this.getKataById = (kataid) => {
    return $http({
      method: 'GET',
      url: `/api/kata/` + kataid
    });
  };

  this.getRandomKata = (userkyu) => {
    return $http({
      method: 'GET',
      url: `/api/random-kata/${userkyu}`
    });
  };

  this.getRandomKataList = (userkyu) => {
    return $http({
      method: 'GET',
      url: `/api/random-kata-list/${userkyu}`
    });
  };

  this.getKatasByKyu = (kyu) => {
    return $http({
      method: 'GET',
      url: `/api/katas-by-kyu/` + kyu
    });
  };

  this.getKataSolutions = (kataid) => {
    return $http({
      method: 'GET',
      url: `/api/solutions/` + kataid
    });
  };

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
      //  $state.go('login');
    })
  };

});
