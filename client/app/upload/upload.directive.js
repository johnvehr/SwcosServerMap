'use strict';

angular.module('swcosServerMapApp')
  .directive('upload', function () {
    return {
      templateUrl: 'app/upload/upload.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  })

  .directive('fileInput', function ($parse) {
    return {
      restrict:'A',
      link:function(scope,elm,attr){
        elm.bind('change',function(){
          $parse(attr.fileInput)
          .assign(scope,elm[0].files)
          scope.$apply();
        })
      }
    };
  });
