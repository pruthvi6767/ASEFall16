/**
 * Created by user on 23/10/2016.
 */
var myapp = angular.module('sign',['userInfoService']);
//var myApp = angular.module('myApp', ['ngRoute']);

myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});
myapp.controller('signController',function($scope,$http,userdata, $location, $rootScope){
    $scope.getData = function(){
        //console.log($scope.formData.lname);
        //console.log($scope.formData.fname);
       // console.log($scope.formData.email);
        //console.log($scope.formData.password);
        //console.log($scope.formData.cpassword);
        var dataParams = {
           // 'fname' : $scope.fname,
            //'lname' : $scope.lname,
            'email' : $scope.email,
            //'pw' : $scope.pw
        };
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var req = $http.get("http://localhost:8081/login/"+$scope.email);
        req.success(function(data, status, headers, config) {
            //$scope.message = data;
            //console.log(data);
            //$scope.username= data.fname + data.lname;
            //$scope.pwd= data.password;
            userdata.change(data);
           // console.log(data);
            console.log( userdata.get());
            $rootScope.id=data._id;
            console.log($rootScope.id)

            window.location.href="home.html";
            $location.path('home.html')

        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };

});


