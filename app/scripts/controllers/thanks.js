'use strict'
angular.module('sbAdminApp')
  .controller('registerCtrl', function ($scope, $rootScope, $http, $window) {
    $rootScope.user = {}
    $scope.setUser = function (user) {
      $rootScope.user = user
    }
    $scope.register = function (user) {
      $http.post('http://127.0.0.1:3000/apis/register', user)
        .then(function (response) {
          if (response.data.code === 'R001') {
            $window.alert('Already Registered')
            $window.location.replace('/#/login', '_blank')
          } else if (response.data.code === 'R002') {
            $window.alert('Registered Successfully')
            $window.location.replace('/#/twitterlogin', '_blank')
          }
        }).catch(function (error) {
          $window.alert(error.data.message)
        })
    }
  })
