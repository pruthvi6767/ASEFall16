/**
 * Created by pruthvirajreddy on 11/4/2016.
 */

/**
 * Created by user on 23/10/2016.
 */
var myapp = angular.module('lab10',['userInfoService']);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});


myapp.controller('homeController',function($scope,$http,userdata, $rootScope){
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
            userdata.square(data);

            //window.location.href="home.html";

        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };
    $scope.init= function() {
        var loguser = userdata.get();
        console.log(loguser);
        $scope.name = loguser.name;
        $scope.psw = loguser.password;
        console.log($rootScope.id)
    }
});
