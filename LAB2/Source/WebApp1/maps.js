/**
 * Created by pruthvirajreddy on 9/7/2016.
 */

var app = angular.module('GoogleDirection', [])
    app.controller('googlemapoutput', function ($scope, $http) {
        $scope.origin = "";
        $scope.tmp = 0;
        $scope.minTemp = 0;
        $scope.maxTemp = 0;

// Logic for the On-Click event.

        $scope.funGet = function () {
            var url = "http://api.openweathermap.org/data/2.5/weather?q=" + ($scope.origin) + "&APPID=ae917b1257d3132947ca6e1efde11037";
            $http.get(url)
                .success(function (response) {
                    $scope.imgWidth = 20;
                    $scope.imgHeight = 40;
                    $scope.wtData = response.coord;
                    $scope.ct = response.name;
                    $scope.tmp = response.main.temp - 272.15;
                    $scope.minTemp = response.main.temp_min - 272.15;
                    $scope.maxTemp = response.main.temp_max - 272.15;
                    $scope.hmdy = response.main.humidity;
                    $scope.imgCode = response.weather[0].icon;
                });
        };
        var map;
        var mapOptions;
        var directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: true
        });
        var directionsService = new google.maps.DirectionsService();

        $scope.initialize = function () {
            navigator.geolocation.getCurrentPosition(function (position) {

                var pos = new google.maps.LatLng(
                    position.coords.latitude,
                    position.coords.longitude);

                var mapOptions = {
                    zoom: 16,
                    center: pos
                };

                map = new google.maps.Map(document.getElementById('map-canvas'),
                    mapOptions);
                var marker = new google.maps.Marker({
                    position: pos,
                    map: map
                });
            });
        };
        $scope.calcRoute = function () {
            var end = document.getElementById('destination').value;
            var start = document.getElementById('origin').value;

            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setMap(map);
                    directionsDisplay.setDirections(response);
                    console.log(status);
                }

            });
        };

        google.maps.event.addDomListener(window, 'load', $scope.initialize);
    });

 