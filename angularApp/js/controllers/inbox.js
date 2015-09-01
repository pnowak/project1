/**
 * Controller: InboxCtrl
 */
angular.module('EmailApp')
  .controller('InboxCtrl',
    function InboxCtrl ( $scope, InboxFactory ) {
      'use strict';
      $scope.meta = {
        title: "My Gmail"
      };
    });