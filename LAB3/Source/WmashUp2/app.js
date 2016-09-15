/**
 * Created by pruthvirajreddy on 9/14/2016.
 */

var app = angular.module('myApp', []);
app.controller('search', function($scope, $http, $document) {

    $scope.findMovie = function () {
        var url="http://api.themoviedb.org/3/search/movie?api_key=62c648959dff042c455e5d6d7ed0413b&query="+($scope.mtitle)
//console.log($scope.mtitle);
        $http.get(url)
            .success(function (response) {
               // var demo= JSON.stringify(response);
                console.log(response);
                $scope.posterimg = response.results[0].poster_path;
                $scope.img = "https://image.tmdb.org/t/p/original"+($scope.posterimg);
                $scope.Title=response.results[0].title;
                $scope.Popularity=response.results[0].popularity;
                $scope.Releasedon=response.results[0].release_date;
                $scope.Liked=response.results[0].vote_count;
                $scope.Storyline=response.results[0].overview;

            });
    };

    $scope.findtags=function(){

        var url1="https://api.clarifai.com/v1/tag?model=general-v1.3&url="+($scope.img)+"&access_token=otzFLGrgGDcIkDD0d87JD9LiKOhu8E";
         $http.get(url1)
             .success(function(response2){
                   console.log(response2);
                  $scope.entities=response2.results[0].result.tag['classes'];
             });

    }

});
    
   
