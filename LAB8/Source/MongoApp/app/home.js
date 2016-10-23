/**
 * Created by pruthvirajreddy on 10/23/2016.
 */

var app  = angular.module('trans', []);


app.controller('transcontroller',['$scope','$http',function($scope,$http){
     var set='False';
    $scope.getEnglish=function(chattext){
        console.log(chattext);
         
        var url="http://localhost:8080/RESTExample/restexample/utranslate/";
        var res = $http.post(url+chattext);
        res.success(function(result) {
            console.log(result);
        })

    }
}])
