'use strict';

var app = angular.module('myApp', ['ngRoute','AdalAngular']);

app.config(['$routeProvider','$httpProvider','adalAuthenticationServiceProvider', function ($routeProvider,$httpProvider, adalProvider) {
    $routeProvider.when("/", {
        controller: 'homeCtrl',
        templateUrl: 'app/views/home.html'
    })
    .when("/user", {
        controller: 'userCtrl',
        templateUrl: 'app/views/user.html',
        requireADLogin : true
    }).otherwise({ redirectTo: '/' });

    adalProvider.init({
        instance: 'https://login.microsoftonline.com/',
        tenant: 'XXXXXXX.onmicrosoft.com',// your Azure Active Directory Tenant 
        clientId: 'XXXXXXXXXXXXXXXXXXXXXXXXX',//your App Client ID, you can obtain it from Azure Managment portal
        extraQueryParameter: 'nux=1',
        //cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
    },
    $httpProvider
    );
}]);

app.controller('indexCtrl', ['$scope', 'adalAuthenticationService', '$location', function ($scope, adalService, $location) {
    $scope.login = function () {
        adalService.login();
    };
    $scope.logout = function () {
        adalService.logOut();
    };
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
    $scope.title = "My First AJS App";
}]);
