angular.module('app.controllers', ['firebase'])

  .controller('loginCtrl', function ($scope, $firebaseAuth, $rootScope, $ionicHistory, sharedUtils, $state, $ionicSideMenuDelegate, $cordovaOauth, $http) {
    $rootScope.extras = false;  // For hiding the side bar and nav icon

    // When the user logs out and reaches login page,
    // we clear all the history and cache to prevent back link
    $scope.$on('$ionicView.enter', function (ev) {
      if (ev.targetScope !== $scope) {
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
      }
    });

    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {

        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $ionicSideMenuDelegate.canDragContent(true);  // Sets up the sideMenu dragable
        $rootScope.extras = true;
        sharedUtils.hideLoading();
        $state.go('menu2', {}, {location: "replace"});

      }
    });


    $scope.loginEmail = function (formName, cred) {
      if (formName.$valid) {  // Check if the form data is valid or not
        sharedUtils.showLoading();
        //Email

        firebase.auth().signInWithEmailAndPassword(cred.email, cred.password).then(function (result) {
            $ionicHistory.nextViewOptions({
              historyRoot: true
            });
            $rootScope.extras = true;
            sharedUtils.hideLoading();
            $state.go('menu2', {}, {location: "replace"});
          },
          function (error) {
            sharedUtils.hideLoading();
            sharedUtils.showAlert("Please note", "Entered Email id/Password is not valid");
          }
        );
      } else {
        sharedUtils.showAlert("Please note", "Enter valid email id");
      }
    };
    $scope.login = function () {
      var ref = new Firebase('https://my-first-project-68e3c.firebaseio.com');
      var authObject = $firebaseAuth(ref);
      authObject.$authWithOAuthPopup('facebook').then(function (authDate) {
        console.log(authData);
      }).catch(function (error) {
          console.log('error' + error);
        }
      )
    };

    $scope.LoginGoogle = function () {
      $cordovaOauth.google("868365513982-jpddd0qmui68otu80663ii4jpc7g9hkf.apps.googleusercontent.com",
        ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"])
        .then(function (result) {
          // alert("Auth Success..!!"+result);
          console.log(JSON.stringify(result));
          $scope.showProfile = false;

          $http.get("https://www.googleapis.com/plus/v1/people/me", {
            params: {
              access_token: result.access_token
            }
          })
            .then(function (res) {
              $scope.showProfile = true;
              $scope.details = res.data; //
              console.log($scope.details);// success callback
              $scope.displayName = $scope.details.displayName;
              console.log($scope.displayName);
              $scope.photoURL = $scope.details.image.url;
              console.log($scope.photoURL);

              $ionicSideMenuDelegate.canDragContent(true);  // Sets up the sideMenu dragable
              $rootScope.extras = true;
              sharedUtils.hideLoading();
              $state.go('menu2', {}, {location: "replace"});

            }, function (error) {
              alert("Error: " + error);
            });

        }, function (error) {
          alert("Auth Failed..!!" + error);
        });

    };
  })


  .controller('signupCtrl', function ($scope, $rootScope, sharedUtils, $ionicSideMenuDelegate,
                                      $state, fireBaseData, $ionicHistory) {
    $rootScope.extras = false; // For hiding the side bar and nav icon

    $scope.signupEmail = function (formName, cred) {

      if (formName.$valid) {  // Check if the form data is valid or not

        sharedUtils.showLoading();

        //Main Firebase Authentication part
        firebase.auth().createUserWithEmailAndPassword(cred.email, cred.password).then(function (result) {

          //Add name and default dp to the Autherisation table
          result.updateProfile({
            displayName: cred.name,
            photoURL: "default_dp"
          }).then(function () {
          }, function (error) {
          });

          //Add phone number to the user table
          fireBaseData.refUser().child(result.uid).set({
            telephone: cred.phone
          });

          //Registered OK
          $ionicHistory.nextViewOptions({
            historyRoot: true
          });
          $ionicSideMenuDelegate.canDragContent(true);  // Sets up the sideMenu dragable
          $rootScope.extras = true;
          sharedUtils.hideLoading();
          $state.go('menu2', {}, {location: "replace"});

        }, function (error) {
          sharedUtils.hideLoading();
          sharedUtils.showAlert("Please note", "Entered email id is already registered");
        });

      } else {
        sharedUtils.showAlert("Please note", "Entered data is not valid");
      }
    }
  })

  
