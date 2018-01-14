 var app = angular.module('myApp', ['ui.router']);

 // advantage of ui router is without even changing url u can change page through state
 app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
     $stateProvider.state('add', {
         templateUrl: 'templates/add/add.html',
         controller: 'addCtrl'
     }).state('view', {
         templateUrl: 'templates/view/view.html',
         controller: 'viewCtrl'
     }).state('report', {
         templateUrl: 'templates/report/report.html',
         controller: 'reportCtrl'
     });
     $urlRouterProvider.otherwise('/');
     $locationProvider.html5Mode(true);
 });

 app.controller('myCtrl', function($scope, $http, $state) {
     $state.go('view');
 });