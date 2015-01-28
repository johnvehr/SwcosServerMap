'use strict';

angular.module('swcosServerMapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('upload', {
        url: '/',
        templateUrl: 'app/upload/upload.html',
        controller: 'UploadCtrl'
      });
  });
