angular.module('app', ['ui.router'])


.config(function($stateProvider, $urlRouterProvider){
$stateProvider
.state('home',{
    url: '/',
    templateUrl:'./components/home/home.html',
    controller: 'homeCtrl'
})
.state('kata_list',{
    url: '/kata_list',
    templateUrl:'./components/kata_list/kata_list.html',
    controller: 'kata_listCtrl'
})
.state('login',{
    url: '/login',
    templateUrl:'./components/login/login.html',
    controller: 'loginCtrl'
})
.state('profile',{
    url: '/profile',
    templateUrl:'./components/profile/profile.html',
    controller: 'profileCtrl'
})
.state('solutions',{
    url: '/solutions',
    templateUrl:'./components/solutions/solutions.html',
    controller: 'solutionsCtrl'
})
.state('training',{
    url: '/training',
    templateUrl:'./components/training/training.html',
    controller: 'trainingCtrl'
});

$urlRouterProvider.otherwise('/');
});
