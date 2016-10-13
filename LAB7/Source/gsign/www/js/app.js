// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova','ngCordovaOauth'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {
        url: "/home",
        templateUrl: "templates/home.html",
        controller: "LoginwithGoogle",
        cache: false
      })
    .state("login", {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "LoginwithGoogle",
      cache: false
    });
    $urlRouterProvider.otherwise('/login');

  })




  .controller('LoginwithGoogle',function($scope,$cordovaOauth,$http,$state, $location){
    $scope.LoginGoogle = function(){
      $cordovaOauth.google("868365513982-jpddd0qmui68otu80663ii4jpc7g9hkf.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
       // alert("Auth Success..!!"+result);
        console.log(JSON.stringify(result));
        $scope.showProfile = false;
        $location.path("/templates/home.html");
        $http.get("https://www.googleapis.com/plus/v1/people/me", {
            params: {
              access_token: result.access_token
            }
          })
          .then(function(res) {
            $scope.showProfile = true;
            $scope.details = res.data; //
             console.log($scope.details);// success callback
            $scope.displayName= $scope.details.displayName;
            console.log($scope.displayName);
            $scope.pimage=$scope.details.image.url;
            console.log($scope.pimage);



          }, function(error) {
            alert("Error: " + error);
          });
      $state.go("home")
      }, function(error) {
        alert("Auth Failed..!!"+error);
      });
    };
    $scope.facebookLogin= function(){
      console.log("clicked");
      $cordovaOauth.facebook("380495482340209", ["email"]).then(function(result) {
       // alert("Auth Success..!!"+result);
        $scope.showProfile = false;

        $http.get("https://graph.facebook.com/me", {
            params: {
              access_token: result.access_token
            }
          })
          .then(function(res) {
                       console.log(res);
                  $scope.displayName=res.data.name;
            $scope.pimage="http://graph.facebook.com/v2.8/"+res.data.id+"/picture";
            console.log($scope.displayName);
            console.log( $scope.pimage);
            $scope.showProfile=true;


          }, function(error) {
            alert("Error: " + error);
          });
        $state.go("home");
      }, function(error) {
        alert("Auth Failed..!!"+error);
      });
    };
  })

