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
          var elmFile = elm[0].files[0].name,
              elmType = elmFile.substring(elmFile.length - 4,elmFile.length);
          if(elmType === 'xlsx'){
            console.log('called')
            $parse(attr.fileInput)
            .assign(scope,elm[0].files)
            scope.$apply();
          }else {
            $parse(attr.fileInput)
            .assign(scope,'invalid')
            scope.$apply();
          }

        })
      }
    };
  });
