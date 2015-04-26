'use strict';

angular.module('pds')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.searchString = '';

    $scope.onSearchChange = function(){
      console.log("Search Photos results from query :",$scope.searchString);

      if($scope.searchString.length > 0){
        $http({
          method: 'GET',
          url: 'https://api.flickr.com/services/rest',
          params: {
            method: 'flickr.photos.search',
            api_key: '70dc2298d7ba4669796e5ccbf4e3288a',
            text: $scope.searchString,
            sort: 'relevance',
            format: 'json',
            per_page: 500,
            nojsoncallback: 1
          }
        }).success(function(data){
          console.log("Photos results OK :", data.photos.total);
          $scope.awesomeThings = data.photos.photo;

          angular.forEach($scope.awesomeThings, function(photo){
            photo.url = 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_q.jpg';
            if(photo.owner){
              $http({
                method: 'GET',
                url: 'https://api.flickr.com/services/rest',
                params: {
                  method: 'flickr.people.getInfo',
                  api_key: '70dc2298d7ba4669796e5ccbf4e3288a',
                  format: 'json',
                  user_id: photo.owner
                }
              }).success(function(data){
                photo.ownerInfo = data.person;
              });
            }
          });
        });
      }else{
        $http({
          method: 'GET',
          url: 'https://api.flickr.com/services/rest',
          params: {
            method: 'flickr.photos.getRecent',
            api_key: '70dc2298d7ba4669796e5ccbf4e3288a',
            format: 'json',
            per_page: 500,
            nojsoncallback: 1
          }
        }).success(function(data){
          console.log("Photos results OK :", data.photos.total);
          $scope.awesomeThings = data.photos.photo;

          angular.forEach($scope.awesomeThings, function(photo){
            photo.url = 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_q.jpg';
          });
        });
      }

    };

    $scope.onSearchChange();

  });
