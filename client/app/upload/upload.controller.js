'use strict';

angular.module('swcosServerMapApp')
  .controller('UploadCtrl', function ($scope, $http, localStorageService) {
    $scope.filesChanged = function(elm){
      $scope.files=elm.files
      if($scope.files.substring($scope.files.length, $scope.files.length - 4) === "xlsx"){
        $scope.fileStatus = true;
      }else {
        false;
      }
      $scope.$apply();
    }

    $scope.dynamic = 0;
    $scope.dynamicStatus;

    $scope.upload = function() {
      $scope.dynamicStatus = "Receiving address coordinates(lat/lng) back from Google..This could take a few minutes."
      var file = $scope.files;
      console.log('file is' + JSON.stringify(file));

      var fd = new FormData();
      angular.forEach($scope.files,function(file){
        fd.append('file',file)

      })
      //Hand off to the server to convert data from xml to json
      $http.post('/api/uploads',fd,{
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
      .success(function(data){
        data = angular.fromJson(data);
        $scope.dynamicVal = 100 / data.length;


        var params = []
        //function gradualBuild(){
          for(var key in data){
            params[key] = data[key]
            params['id'] = data.indexOf(data[key])

            var called = 0
            var pauseCounter = -1

            setTimeout(function(){
              pauseCounter += 1;
              params[pauseCounter]['id'] = pauseCounter;
              var objParams = params[pauseCounter];

              buildGeoCords(objParams,function(err,updatedParams){

                console.log(updatedParams)

                $scope.$apply(function(){
                  $scope.dynamicStatus
                  $scope.dynamic += $scope.dynamicVal
                  $scope.dynamicFixed = $scope.dynamic.toFixed()
                  $scope.dynamicStatus = $scope.dynamic >= 100 ? "Complete" : $scope.dynamicStatus
                })

                called++
                //temp store it in local storage then pull after finished loop
                localStorageService.set(updatedParams.id,updatedParams)

                if(called == data.length){
                  requestSites();
                }
              })
            },500 * key)
          }
        //}

      //  gradualBuild()

        function requestSites(){
          console.log("CALLED REQUEST SITES")
          var siteKeys = localStorageService.keys()
          var newSiteData = []
          for(var i=0;i<siteKeys.length;i++){
            newSiteData.push(localStorageService.get(siteKeys[i]))
          }
          //console.log(newSiteData)
          $http.post('/api/uploads/write',newSiteData).success(function(res){
            console.log('success')
          }).error(function(){
            console.log('Error')
          })
        }

        function buildGeoCords(objParams,callback){
          var objParamsError;
          var geocoder = new google.maps.Geocoder();
          geocoder.geocode({address: objParams.Location},function(result,status){
            if(status == google.maps.GeocoderStatus.OK){
              objParams.lat = result[0].geometry.location.lat();
              objParams.lng = result[0].geometry.location.lng();
              objParamsError = null;
            }
            if(status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT){
              objParamsError = "REACHED QUERY LIMIT TO GOOGLE MAPS";
            }
            callback(objParamsError,objParams);
          })
        }

      })
      .error(function(){
        console.log('Error')
      })
    }

    /*$http.get('server/api/data/swcosJsData.json').success(function(sites){
      $scope.sites = sites

    })*/
    $http.get('/api/uploads').success(function(sites){
      if(sites){
        $scope.sites = angular.fromJson(sites)
        console.log($scope.sites)
      }else{
        console.log("fail")
      }
    })

    $scope.swcosUploads = function(){
      $http.get('/api/uploads/read').success(function(file){
        console.log(file)
      })
    }


  });
