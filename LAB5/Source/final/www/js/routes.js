angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



   .state('lAB5', {
    url: '/lab5',
    templateUrl: 'templates/lAB5.html',
    controller: 'lAB5Ctrl'
  })


   .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

   .state('sIGNUP', {
    url: '/signup',
    templateUrl: 'templates/sIGNUP.html',
    controller: 'sIGNUPCtrl'
  })

   .state('page', {
    url: '/page',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
   })

$urlRouterProvider.otherwise('/page')



});
