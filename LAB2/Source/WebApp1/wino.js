/**
 * Created by pruthvirajreddy on 9/7/2016.
 */

var app = angular.module('MyApp', []);
app.controller('MyCont', function($scope, $http) {

    // Initialization of the scope variables. 

    $scope.origin = localStorage.getItem('origin');
    $scope.destination = localStorage.getItem('destination');
    $scope.tmp = 0;
    $scope.minTemp = 0;
    $scope.maxTemp = 0;


    // Logic for the On-Click event.

    $scope.load = function () {
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + ($scope.origin) + "&APPID=ae917b1257d3132947ca6e1efde11037"

        $http.get(url)
            .success(function (response) {
                $scope.imgWidth = 150;
                $scope.imgHeight = 150;
                $scope.wtData = response.coord;
                $scope.ct = response.name;
                $scope.tmp = response.main.temp - 272.15;
                $scope.minTemp = response.main.temp_min - 272.15;
                $scope.maxTemp = response.main.temp_max - 272.15;
                $scope.hmdy = response.main.humidity;
                $scope.imgCode = response.weather[0].icon;
            });

    };


    $scope.funGet= function(){
    var url1 = "http://api.openweathermap.org/data/2.5/weather?q=" +($scope.destination)+"&APPID=ae917b1257d3132947ca6e1efde11037"
    $http.get(url1)
        .success(function(response) {
            $scope.imgWidth = 150;
            $scope.imgHeight = 150;
            $scope.wtData = response.coord;
            $scope.ct = response.name;
            $scope.tmp = response.main.temp - 272.15;
            $scope.minTemp = response.main.temp_min - 272.15;
            $scope.maxTemp = response.main.temp_max - 272.15;
            $scope.hmdy = response.main.humidity;
            $scope.imgCode = response.weather[0].icon;
        });
    };
});