'use strict'
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
      debug: false,
      events: true
    })

    $urlRouterProvider.otherwise('/home')

    $stateProvider
      .state('home', {
        templateUrl: 'views/pages/home.html',
        url: '/home',
        controller: 'homeCtrl'
      })
      .state('thanks', {
        templateUrl: 'views/pages/thanks.html',
        url: '/thanks',
        controller: 'thanksCtrl'
      })
  }])
