/**
 * Created by pruthvirajreddy on 9/29/2016.
 */


describe('loginCtrl', function () {
 beforeEach(module('app'));
  var $controller;
  beforeEach(inject(function(_$controller_) {

    $controller =_$controller_;
  }));

  describe('log', function () {
    it('tests login function of loginCtrl', function () {
      var $scope={};
      var controller = $controller('loginCtrl',{ $scope: $scope});
      $scope.tpaswrd1='pruthvi';
      $scope.tsflag=false;
      expect($scope.log(tpaswrd1)).toEqual(true);
      expect($scope.log("undefined")).toEqual(false);
    })

  })
})
