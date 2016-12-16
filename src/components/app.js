angular.module('app', ['ui.router'])


.config(function($stateProvider, $urlRouterProvider){
$stateProvider
.state('home',{
    url: '/',
    templateUrl:'./home/home.html',
    controller: 'homeCtrl'
})
.state('kata_list',{
    url: '/kata_list',
    templateUrl:'./kata_list/kata_list.html',
    controller: 'kata_listCtrl'
})
.state('login',{
    url: '/login',
    templateUrl:'./login/login.html',
    controller: 'loginCtrl'
})
.state('profile',{
    url: '/profile',
    templateUrl:'./profile/profile.html',
    controller: 'profileCtrl'
})
.state('solutions',{
    url: '/solutions',
    templateUrl:'./solutions/solutions.html',
    controller: 'solutionsCtrl'
})
.state('training',{
    url: '/training',
    templateUrl:'./training/training.html',
    controller: 'trainingCtrl'
});

$urlRouterProvider.otherwise('/');
});

