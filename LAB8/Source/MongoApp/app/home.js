/**
 * Created by pruthvirajreddy on 10/23/2016.
 */

var app  = angular.module('trans', []);


app.controller('transcontroller',['$scope','$http',function($scope,$http){
     var set='False';
    var set1="False";
    $scope.getEnglish=function(chattext){
        console.log(chattext);
         
        var url="http://localhost:8080/RESTExample/restexample/utranslate/";
        var res = $http.get(url+chattext);
        res.success(function(result) {
            console.log(result);
            $scope.English=result[1].data.translations[0].translatedText;
            $scope.set1='True';
            $scope.set='False';
            //$scope.chatText="";

        })

    }


   $scope.getGerman=function(chattext){
    console.log(chattext);

    var url="http://localhost:8080/RESTExample/restexample/ltranslate/";
    var res = $http.get(url+chattext);
    res.success(function(result) {
        console.log(result);
        $scope.German=result[1].data.translations[0].translatedText;
        $scope.set='True';
        $scope.set1='False'

    })

    }
    
    $scope.getDollars=function(money){
        var url="http://localhost:8080/RESTExample/restexample/etodjson/";
        var res=$http.get(url+money);
        res.success(function (result) {
            console.log(result);
            $scope.cvalue=result.Dollars;

        })
    }

    $scope.getEuros=function(money){
        var url="http://localhost:8080/RESTExample/restexample/dtoejson/";
        var res=$http.get(url+money);
        res.success(function (result) {
            console.log(result);
            $scope.cvalue=result.Euros;

        })
    }



}])