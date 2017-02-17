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
          //$state.go('tabsController.login', {}, {location: "replace"});
          window.location.href='login.html'

        }, function (error) {
          sharedUtils.hideLoading();
          sharedUtils.showAlert("Please note", "Entered email id is already registered");
        });

      } else {
        sharedUtils.showAlert("Please note", "Entered data is not valid");
      }
    }

  })

  .controller('menu2Ctrl', function ($scope, $rootScope, $ionicSideMenuDelegate, fireBaseData, $state,
                                     $ionicHistory, $firebaseArray, sharedCartService, sharedUtils) {

    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        $scope.user_info = user; //Saves data to user_info
      } else {

        $ionicSideMenuDelegate.toggleLeft(); //To close the side bar
        $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space

        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $rootScope.extras = false;
        sharedUtils.hideLoading();
        $state.go('tabsController.login', {}, {location: "replace"});

      }
    });

    // On Loggin in to menu page, the sideMenu drag state is set to true
    $ionicSideMenuDelegate.canDragContent(true);
    $rootScope.extras = true;

    // When user visits A-> B -> C -> A and clicks back, he will close the app instead of back linking
    $scope.$on('$ionicView.enter', function (ev) {
      if (ev.targetScope !== $scope) {
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
      }
    });


    $scope.loadMenu = function () {
      sharedUtils.showLoading();
      $scope.menu = $firebaseArray(fireBaseData.refMenu());
      sharedUtils.hideLoading();
    }

    $scope.showProductInfo = function (id) {

    };
    $scope.addToCart = function (item) {
      sharedCartService.add(item);
    };


    $scope.goLevel = function () {
      $state.go('level', {}, {location: "replace"});
    };
    $scope.gocharts = function () {
      $state.go('charts', {}, {location: "replace"});
    };

    $scope.goLevelLogo = function () {
      $state.go('levellogo', {}, {location: "replace"});
    };


  })

  .controller('indexCtrl', function ($scope, $rootScope, sharedUtils, $ionicHistory, $state, $ionicSideMenuDelegate, sharedCartService) {

    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        $scope.user_info = user; //Saves data to user_info

        //Only when the user is logged in, the cart qty is shown
        //Else it will show unwanted console error till we get the user object
        $scope.get_total = function () {
          var total_qty = 0;
          for (var i = 0; i < sharedCartService.cart_items.length; i++) {
            total_qty += sharedCartService.cart_items[i].item_qty;
          }
          return total_qty;
        };

      } else {

        $ionicSideMenuDelegate.toggleLeft(); //To close the side bar
        $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space

        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $rootScope.extras = false;
        sharedUtils.hideLoading();
        $state.go('tabsController.login', {}, {location: "replace"});

      }
    });

    $scope.logout = function () {

      sharedUtils.showLoading();

      // Main Firebase logout
      firebase.auth().signOut().then(function () {


        $ionicSideMenuDelegate.toggleLeft(); //To close the side bar
        $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space

        $ionicHistory.nextViewOptions({
          historyRoot: true
        });


        $rootScope.extras = false;
        sharedUtils.hideLoading();
        $state.go('tabsController.login', {}, {location: "replace"});

      }, function (error) {
        sharedUtils.showAlert("Error", "Logout Failed")
      });

    }

  })

  .controller('favouriteCtrl', function ($scope, $rootScope) {

    $rootScope.extras = true;
  })

  .controller('logoCtrl',
    function ($scope, $http, $rootScope, $stateParams, $location, $ionicViewService, $state) {

      $rootScope.extras = true;

      $scope.squery = function (data) {
        console.log($scope.valuesearch);
        var url = 'http://api.fullcontact.com/v2/company/lookup.json?apiKey=c9119ae197c5e22a&domain=' + data//+($scope.valuesearch)
        $http.get(url)
          .success(function (response) {
            console.log(response);
            $scope.Name = response.organization.name;
            $scope.logourl = response.logo;
            $scope.website = response.website;
            $scope.category = response.category[0].name;
            $scope.services = response.organization.keywords[0];
            $scope.founded = response.organization.founded;

          })
      }
    })

  .controller('settingsCtrl', function ($scope, $rootScope, fireBaseData, $firebaseObject,
                                        $ionicPopup, $state, $window, $firebaseArray,
                                        sharedUtils) {
    //Bugs are most prevailing here
    $rootScope.extras = true;

    //Shows loading bar
    sharedUtils.showLoading();

    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {

        //Accessing an array of objects using firebaseObject, does not give you the $id , so use firebase array to get $id
        $scope.addresses = $firebaseArray(fireBaseData.refUser().child(user.uid).child("address"));

        // firebaseObject is good for accessing single objects for eg:- telephone. Don't use it for array of objects
        $scope.user_extras = $firebaseObject(fireBaseData.refUser().child(user.uid));

        $scope.user_info = user; //Saves data to user_info
        //NOTE: $scope.user_info is not writable ie you can't use it inside ng-model of <input>

        //You have to create a local variable for storing emails
        $scope.data_editable = {};
        $scope.data_editable.email = $scope.user_info.email;  // For editing store it in local variable
        $scope.data_editable.password = "";

        $scope.$apply();

        sharedUtils.hideLoading();

      }

    });

    $scope.addManipulation = function (edit_val) {  // Takes care of address add and edit ie Address Manipulator


      if (edit_val != null) {
        $scope.data = edit_val; // For editing address
        var title = "Edit Address";
        var sub_title = "Edit your address";
      }
      else {
        $scope.data = {};    // For adding new address
        var title = "Add Address";
        var sub_title = "Add your new address";
      }
      // An elaborate, custom popup
      var addressPopup = $ionicPopup.show({
        template: '<input type="text"   placeholder="Nick Name"  ng-model="data.nickname"> <br/> ' +
        '<input type="text"   placeholder="Address" ng-model="data.address"> <br/> ' +
        '<input type="number" placeholder="Pincode" ng-model="data.pin"> <br/> ' +
        '<input type="number" placeholder="Phone" ng-model="data.phone">',
        title: title,
        subTitle: sub_title,
        scope: $scope,
        buttons: [
          {text: 'Close'},
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!$scope.data.nickname || !$scope.data.address || !$scope.data.pin || !$scope.data.phone) {
                e.preventDefault(); //don't allow the user to close unless he enters full details
              } else {
                return $scope.data;
              }
            }
          }
        ]
      });

      addressPopup.then(function (res) {

        if (edit_val != null) {
          //Update  address
          if (res != null) { // res ==null  => close
            fireBaseData.refUser().child($scope.user_info.uid).child("address").child(edit_val.$id).update({    // set
              nickname: res.nickname,
              address: res.address,
              pin: res.pin,
              phone: res.phone
            });
          }
        } else {
          //Add new address
          fireBaseData.refUser().child($scope.user_info.uid).child("address").push({    // set
            nickname: res.nickname,
            address: res.address,
            pin: res.pin,
            phone: res.phone
          });
        }

      });

    };

    // A confirm dialog for deleting address
    $scope.deleteAddress = function (del_id) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete Address',
        template: 'Are you sure you want to delete this address',
        buttons: [
          {text: 'No', type: 'button-stable'},
          {
            text: 'Yes', type: 'button-assertive', onTap: function () {
            return del_id;
          }
          }
        ]
      });

      confirmPopup.then(function (res) {
        if (res) {
          fireBaseData.refUser().child($scope.user_info.uid).child("address").child(res).remove();
        }
      });
    };

    $scope.save = function (extras, editable) {
      //1. Edit Telephone doesnt show popup 2. Using extras and editable  // Bugs
      if (extras.telephone != "" && extras.telephone != null) {
        //Update  Telephone
        fireBaseData.refUser().child($scope.user_info.uid).update({    // set
          telephone: extras.telephone
        });
      }

      //Edit Password
      if (editable.password != "" && editable.password != null) {
        //Update Password in UserAuthentication Table
        firebase.auth().currentUser.updatePassword(editable.password).then(function (ok) {
        }, function (error) {
        });
        sharedUtils.showAlert("Account", "Password Updated");
      }

      //Edit Email
      if (editable.email != "" && editable.email != null && editable.email != $scope.user_info.email) {

        //Update Email/Username in UserAuthentication Table
        firebase.auth().currentUser.updateEmail(editable.email).then(function (ok) {
          $window.location.reload(true);
          //sharedUtils.showAlert("Account","Email Updated");
        }, function (error) {
          sharedUtils.showAlert("ERROR", error);
        });
      }

    };

    $scope.cancel = function () {
      // Simple Reload
      $window.location.reload(true);
      console.log("CANCEL");
    }

  })

  .controller('wordsCtrl', function ($scope, $rootScope, $ionicSideMenuDelegate, fireBaseData, $state,
                                     $ionicHistory, $firebaseArray, sharedCartService, sharedUtils) {
    $scope.goLevel1 = function () {
      $state.go('wlevel1', {}, {location: "replace"});
    };

  })

  .controller('wordsAdultCtrl', function ($scope, $rootScope, $ionicSideMenuDelegate, fireBaseData, $state,
                                          $ionicHistory, $firebaseArray, sharedCartService, sharedUtils) {
    $scope.goLevelAdult1 = function () {
      $state.go('wlevelAdult1', {}, {location: "replace"});
    };

  })

  .controller('levelCtrl', function ($scope, $rootScope, $ionicSideMenuDelegate, fireBaseData, $state,
                                     $ionicHistory, $firebaseArray, sharedCartService, sharedUtils) {
    $scope.goWord = function () {
      $state.go('words', {}, {location: "replace"});
    };

    $scope.goWordAdult = function () {
      $state.go('wordsAdult', {}, {location: "replace"});
    };

  })

  .controller('chartsCtrl', function ($scope, $rootScope, $ionicSideMenuDelegate, fireBaseData, $state,
                                      $ionicHistory, $firebaseArray, sharedCartService, sharedUtils) {

    $scope.goViz1 = function () {
      $scope.viz1 = true;
      $scope.viz2 = false;
    }

    $scope.goViz2 = function () {
      $scope.viz1 = false;
      $scope.viz2 = true;
    }

  })

  .controller('levelLogo2Ctrl', function ($scope, logoservice, $rootScope, $ionicSideMenuDelegate, fireBaseData, $state,
                                          $ionicHistory, $firebaseArray, sharedCartService, sharedUtils) {
    init();
    function init() {
      logoservice.getFeedbackPaged().then(function (data) {

        // $scope.logoimages=data;


        console.log(data);
        $scope.images = data.data[0].result;

        //$scope.images=[];
        /*for( var i=0; i<data.length;i++){
         $scope.images[i]=data.data[0].result[i].url;

         }*/

        console.log($scope.images);

      });

    }

    /*$scope.goLogo = function () {
     $state.go('logoLevel', {}, {location: "replace"});
     };*/
    $scope.hde = true;
    $scope.isCorrect = function (value) {

      if (value == 'Master Card' || value == 'master card') {
        $scope.hde = true;
        return true;
      }
      else {

        return false;
      }
    }

    $scope.isNotCorrect = function (value) {

      if (value == ' ' || value == 'undefined') {
        return true;
        //$scope.hde=false;
      }
      else {
        $scope.hde = false;
        return false;
      }
    }

  })

  .controller('levelLogoCtrl', function ($scope, logoservice, $rootScope, $ionicSideMenuDelegate, fireBaseData, $state,
                                         $ionicHistory, $firebaseArray, sharedCartService, sharedUtils) {

    init();

    function init() {
      logoservice.getFeedbackPaged().then(function (data) {

        // $scope.logoimages=data;


        console.log(data);
<<<<<<< HEAD
        $scope.images=data.data[0].result;

        //$scope.images=[];
        /*for( var i=0; i<data.length;i++){
          $scope.images[i]=data.data[0].result[i].url;

        }*/

        console.log($scope.images);
=======
        $scope.images = data.data[0].result;

        //$scope.images=[];
        /*for( var i=0; i<data.length;i++){
         $scope.images[i]=data.data[0].result[i].url;
>>>>>>> d5c34fc98ff53395ab76aa455cb89429bb09027c

         }*/

        console.log($scope.images);



      });

    }

    /*$scope.goLogo = function () {
<<<<<<< HEAD
      $state.go('logoLevel', {}, {location: "replace"});
    };*/
    $scope.hde=true;
    $scope.isCorrect = function (value) {

      if (value == 'american express' || value == 'American express') {
        $scope.hde=true;
=======
     $state.go('logoLevel', {}, {location: "replace"});
     };*/
    $scope.hde = true;
    $scope.isCorrect = function (value) {

      if (value == 'american express' || value == 'American express') {
        $scope.hde = true;
>>>>>>> d5c34fc98ff53395ab76aa455cb89429bb09027c
        return true;
      }
      else {

        return false;
      }
    }

    $scope.isNotCorrect = function (value) {

<<<<<<< HEAD
      if (value==' ' || value=='undefined') {
=======
      if (value == ' ' || value == 'undefined') {
>>>>>>> d5c34fc98ff53395ab76aa455cb89429bb09027c
        return true;
        //$scope.hde=false;
      }
      else {
<<<<<<< HEAD
        $scope.hde=false;
=======
        $scope.hde = false;
>>>>>>> d5c34fc98ff53395ab76aa455cb89429bb09027c
        return false;
      }
    }

    $scope.goLevelLogo2 = function () {
      $state.go('levellogo2', {}, {location: "replace"});
    };
<<<<<<< HEAD

  })

  .controller('levelLogo2Ctrl', function ($scope,logoservice, $rootScope, $ionicSideMenuDelegate, fireBaseData, $state,
                                         $ionicHistory, $firebaseArray, sharedCartService, sharedUtils) {
    init();
    function init() {
      logoservice.getFeedbackPaged().then(function(data){

        // $scope.logoimages=data;



        console.log(data);
        $scope.images=data.data[0].result;

        //$scope.images=[];
        /*for( var i=0; i<data.length;i++){
         $scope.images[i]=data.data[0].result[i].url;

         }*/

        console.log($scope.images);

      });

    }
    /*$scope.goLogo = function () {
     $state.go('logoLevel', {}, {location: "replace"});
     };*/
    $scope.hde=true;
    $scope.isCorrect = function (value) {

      if (value == 'Master Card' || value == 'master card') {
        $scope.hde=true;
        return true;
      }
      else {

        return false;
      }
    }

    $scope.isNotCorrect = function (value) {

      if (value==' ' || value=='undefined') {
        return true;
        //$scope.hde=false;
      }
      else {
        $scope.hde=false;
        return false;
      }
    }
=======
>>>>>>> d5c34fc98ff53395ab76aa455cb89429bb09027c

  })


  .controller('wlevel1Ctrl', function ($scope, $rootScope, $ionicSideMenuDelegate, fireBaseData, $state,
                                       $ionicHistory, $firebaseArray, sharedCartService, sharedUtils) {
    $scope.goWord12 = function () {
      $state.go('word12', {}, {location: "replace"});
    };


    $scope.isCorrect = function (value) {

      if (value == 'Apple' || value == 'apple') {
        return true;
      }
      else {

        return false;
      }
    }

    $scope.isNotCorrect = function (value) {

      if (value == 'Mango' || value == 'mongo') {
        return true;
      }
      else {

        return false;
      }
    }

  })


  .controller('wordlevel12Ctrl', function ($scope, $rootScope, $ionicSideMenuDelegate, fireBaseData, $state,
                                           $ionicHistory, $firebaseArray, sharedCartService, sharedUtils) {

    $scope.isCorrect = function (value) {

      if (value == 'Canopy' || value == 'canopy') {
        return true;
      }
      else {

        return false;
      }
    }
    $scope.isNotCorrect = function (value) {

      if (value == 'Cloth' || value == 'cloth') {
        return true;
      }
      else {
        return false;
      }
    }
  })

  .controller('wlevelAdult1Ctrl', function ($scope, $rootScope, $ionicSideMenuDelegate, fireBaseData, $state,
                                            $ionicHistory, $firebaseArray, sharedCartService, sharedUtils) {
    $scope.goWordAdult12 = function () {
      $state.go('wordAdult12', {}, {location: "replace"});
    };


    $scope.isCorrect = function (value) {

      if (value == 'Cubicle' || value == 'cubicle') {
        return true;
      }
      else {

        return false;
      }
    }

    $scope.isNotCorrect = function (value) {

      if (value == 'Table' || value == 'table') {
        return true;
      }
      else {

        return false;
      }
    }

  })

  .controller('wordlevelAdult12Ctrl', function ($scope, $rootScope, $ionicSideMenuDelegate, fireBaseData, $state,
                                                $ionicHistory, $firebaseArray, sharedCartService, sharedUtils) {

    $scope.isCorrect = function (value) {

      if (value == 'Ascetic' || value == 'ascetic') {
        return true;
      }
      else {

        return false;
      }
    }
    $scope.isNotCorrect = function (value) {

      if (value == 'Tree' || value == 'tree') {
        return true;
      }
      else {
        return false;
      }
    }
  })

