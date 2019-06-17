'use strict'
angular.module('sbAdminApp')
  .controller('homeCtrl', function ($scope, $rootScope, $http, $window) {
    $rootScope.user = {}
    $scope.setUser = function (user) {
      $rootScope.user = user
    }
    $scope.submit = function (user) {
      $http.post('http://127.0.0.1:3000/apis/register', user)
        .then(function (response) {
          $window.location.replace('/#/register', '_blank')
        }).catch(function (error) {
          $window.alert(error.data.message)
          $scope.code = null
        })
    }
    $scope.validateName = function (name) {
      if (name) {
        if (!name.match(/^[A-Za-z]+$/)) {
          $scope.user.name = null
          return $window.alert('Invalid Name')
        }
      }
    }

    $scope.validateEmail = function (email) {
      if (email) {
        if (!email.match(/\S+@\S+\.\S+/)) {
          $scope.user.email = null
          return $window.alert('Invalid Email')
        }
      }
    }

    $scope.validateMobile = function (mobile) {
      if (mobile) {
        if (mobile.toString().length !== 10) {
          $scope.user.mobile = null
          return $window.alert('Invalid Number')
        }
      }
    }

    $scope.validateUniqueCode = function (code) {
      if (code) {
        let req = {
          code
        }
        $http.post('http://127.0.0.1:3000/apis/validateUniqueCode', req)
          .then(function (response) {
            // $window.location.replace('/#/register', '_blank')
          }).catch(function (error) {
            $window.alert(error.data.message)
            $scope.user.uniqueCode = null
          })
      }
    }

    $scope.uploadFile = function () {
      var fd = new FormData()
      fd.append('file', $scope.myFile)

      $http.post('http://127.0.0.1:3000/apis/uploadFile', fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
      }).then((response) => {
        $scope.user.path = response.data ? response.data : $scope.user.path
        $window.alert('Uploaded')
      }).catch((err) => {
        $window.alert('Uploaded')
      })
    }
  })

angular.module('sbAdminApp')
  .directive('demoFileModel', function ($parse) {
    return {
      restrict: 'A', // the directive can be used as an attribute only

      /*
       link is a function that defines functionality of directive
       scope: scope associated with the element
       element: element on which this directive used
       attrs: key value pair of element attributes
       */
      link: function (scope, element, attrs) {
        var model = $parse(attrs.demoFileModel),
          modelSetter = model.assign //define a setter for demoFileModel

          //Bind change event on the element
          element.bind('change', function () {
          // Call apply on scope, it checks for value changes and reflect them on UI
          scope.$apply(function () {
            // set the model value
            modelSetter(scope, element[0].files[0])
              })
          })
      }
    }
})
