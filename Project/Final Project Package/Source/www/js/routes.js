angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider


      .state('tabsController', {
        url: '/page1',
        templateUrl: 'templates/tabsController.html',
        abstract: true
      })

      .state('tabsController.login', {
        url: '/page5',
        views: {
          'tab1': {
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
          }
        }
      })

      .state('tabsController.signup', {
        url: '/page6',
        views: {
          'tab3': {
            templateUrl: 'templates/signup.html',
            controller: 'signupCtrl'
          }
        }
      })

      .state('menu2', {
        url: '/page7',
        templateUrl: 'templates/menu2.html',
        controller: 'menu2Ctrl'
      })

      .state('favourite', {
        url: '/page11',
        templateUrl: 'templates/favourite.html',
        controller: 'favouriteCtrl'
      })

      .state('logo', {
        url: '/page90',
        templateUrl: 'templates/logo.html',
        controller: 'logoCtrl'
      })

      .state('settings', {
        url: '/page12',
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      })

      .state('wlevel1', {
        url: '/page25',
        templateUrl: 'templates/wordlevel1.html',
        controller: 'wlevel1Ctrl'
      })

      .state('wlevelAdult1', {
        url: '/page67',
        templateUrl: 'templates/wordAdultlevel1.html',
        controller: 'wlevelAdult1Ctrl'
      })

      .state('words', {
        url: '/page18',
        templateUrl: 'templates/words.html',
        controller: 'wordsCtrl'
      })

      .state('wordsAdult', {
        url: '/page77',
        templateUrl: 'templates/wordsAdult.html',
        controller: 'wordsAdultCtrl'
      })

      .state('level', {
        url: '/page21',
        templateUrl: 'templates/level.html',
        controller: 'levelCtrl'
      })

      .state('charts', {
        url: '/page22',
        templateUrl: 'templates/visualization.html',
        controller: 'chartsCtrl'
      })

      .state('word12', {
        url: '/page79',
        templateUrl: 'templates/wordlevel12.html',
        controller: 'wordlevel12Ctrl'
      })

      .state('wordAdult12', {
        url: '/page99',
        templateUrl: 'templates/wordlevelAdult12.html',
        controller: 'wordlevelAdult12Ctrl'
      })

      .state('levellogo', {
        url: '/page30',
        templateUrl: 'templates/levelLogo.html',
        controller: 'levelLogoCtrl'
      })

      .state('levellogo2', {
        url: '/page29',
        templateUrl: 'templates/levelLogo2.html',
        controller: 'levelLogo2Ctrl'
      })

      .state('logoLevel', {
        url: '/page25',
        templateUrl: 'templates/logoLevel.html',
        controller: 'levelLogoCtrl'
      })


      .state('tabsController.forgotPassword', {
        url: '/page15',
        views: {
          'tab1': {
            templateUrl: 'templates/forgotPassword.html',
            controller: 'forgotPasswordCtrl'
          }
        }
      })

    $urlRouterProvider.otherwise('/page1/page5')

  });
