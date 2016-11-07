/**
 * Created by pruthvirajreddy on 11/4/2016.
 */

var userInfoService = angular.module('userInfoService', [ ])
    .service('userdata', function ($rootScope, $window) {
        var user={
                   id:"",name: "", password: ""
        }
        this.sdata = function (data) {
            user.id=data._id;
            user.name= data.fname + data.lname;
            user.password= data.password;
            console.log(user);
            this.rdata();
        };


        this.rdata = function(){

            return user;
        };


        $window.rootScopes = $window.rootScopes || [];
        $window.rootScopes.push($rootScope);

        if (!!$window.sharedService){
            return $window.sharedService;
        }
        $window.sharedService = {
            change: function(data){
                user = data;
                $rootScope.id=user.id;
                angular.forEach($window.rootScopes, function(scope) {
                    if(!scope.$$phase) {
                        scope.$apply();
                    }
                });
            },
            get: function(){
                return user;
            }
        }

        return $window.sharedService;
    });

//        return {
  //          setData: function(data) {
    //            user = data;
      //      },
        //    getData: function() {
          //      return user;
            //}
        //};

    //});
