'use strict';

angular.module('shopModule')
    .controller('shopController',['$scope','$log','$mdSidenav','$timeout',function($scope,$log,$mdSidenav,$timeout){
        $scope.toggleLeft = buildDelayedToggler('left');
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

	$scope.load = 20;
	$scope.loaded = false;
	$timeout(function(){
		$scope.loaded = true;
	},2000);

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    }]);

