'use strict';

angular.module('pds')
  .controller('DialogCtrl', function ($scope, $mdDialog, item) {
  	$scope.item = item;
  });
