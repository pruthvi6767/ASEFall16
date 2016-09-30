angular.module('app.controllers', [])

.controller('lAB5Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$location, $ionicViewService, $state){
  var sflag;
  sflag = false;

  $scope.log = function(paswrd1) {
    localStorage.setItem("paswrd1", paswrd1);
    //$ionicViewService.nextViewOptions({
    //disableAnimate: true,
    // disableBack: true
    //});
    if (window.localStorage.getItem('paswrd1') != window.localStorage.getItem('paswrd')) {
      alert('enter valid credentials');
    }
    else {
      window.location.href = "#/page";
      sflag=true;

    }
    console.log(sflag);
  }
}])

.controller('sIGNUPCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicViewService,$state, $location ) {
  $scope.sup=function(paswrd,email) {

    localStorage.setItem("paswrd", paswrd);
    localStorage.setItem("email", email);

    if ((window.localStorage.getItem("paswrd") == 'undefined' && localStorage.getItem("email") == 'undefined' )
      ||(window.localStorage.getItem("paswrd") == null && localStorage.getItem("email") == null))
       {
      //$ionicViewService.nextViewOptions({
       // disableAnimate: true,
        //disableBack: true

         alert('fill all the fields');
     // });
     // $location.path("/login")

          }
    else {
      window.location.href="#/login";
    }
  }

}])

.controller('pageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$location, $ionicViewService,$state, $http) {
  if(window.localStorage.getItem("paswrd1") == "undefined" || window.localStorage.getItem("paswrd1") == null) {
    // $ionicViewService.nextViewOptions({
    //  disableAnimate: true,
    // disableBack: true
    // });
    window.location.href = "#/login";
  }

    $scope.squery=function () {
       var url= " https://api.fullcontact.com/v2/company/lookup.json?apiKey=c9119ae197c5e22a&domain="+$scope.qinp+"";
      $http.get(url)
        .success(function (response) {
          console.log(response);
          $scope.Name=response.organization[0].name;
          $scope.logourl=response.logo;
          $scope.website=response.website;
          $scope.category=response.category[0].name;
          $scope.services=response.organization[0].keywords;

        })
      $.post(
        'https://apiv2.indico.io/sentiment',
        JSON.stringify({
          'api_key': "c34d287ee73b9f132d842f8b307300ee",
          'data': " $scope.logourl",
        })
      ).then(function(res) { console.log(res) });
      $scope.sentiment=res.surprise;


    }


}])

