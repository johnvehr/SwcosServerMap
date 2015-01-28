'use strict';

angular.module('swcosServerMapApp')
  .service('Upload', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      postFile: function(route,fd,callback){
        $http.post(route,fd,{
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        })
        .success(function(data){
          callback(null,data);
        })
      },
      getFileData: function(route,callback){
        $http.get(route).success(function(sites){
          callback(null,sites);
        })
      }
    }
  });
