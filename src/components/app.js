angular.module('app', ['ui.router'])


.config(function($stateProvider, $urlRouterProvider){
$stateProvider

//~~~~~~~~~~~~~Parent States~~~~~~~~~~~~~

.state('login',{
    url: '/login',
    templateUrl:'./components/login/login.html',
    // controller: 'loginCtrl'
})
.state('menu',{
    url: '/',
    templateUrl:'./components/menus/menu.html',
    // controller: 'loginCtrl'
})

//~~~~~~~~~~~~~Child States~~~~~~~~~~~~~

.state('menu.home',{
    url: 'home',
    templateUrl:'./components/home/home.html',
    controller: 'homeCtrl'
})
.state('menu.kata_list',{
    url: 'kata_list',
    templateUrl:'./components/kata_list/kata_list.html',
    controller: 'kata_listCtrl'
})
.state('menu.profile',{
    url: 'profile',
    templateUrl:'./components/profile/profile.html',
    controller: 'profileCtrl'
})
.state('menu.solutions',{
    url: 'solutions/:kataid',
    templateUrl:'./components/solutions/solutions.html',
    controller: 'solutionsCtrl'
})
.state('menu.training',{
    url: 'training/:kataid',
    templateUrl:'./components/training/training.html',
    controller: 'trainingCtrl'
})

.state('menu.docs', {
    url: '/docs',
    templateUrl: './components/docs/docs.html'
    // controller: 'docsCtrl'
});

$urlRouterProvider.otherwise('/login');
});
