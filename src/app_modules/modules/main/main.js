/**
 * Viewの共通コントローラ
 */
angular.module('MainCtrl',[]).controller('MainCtrl',[
	'$stateParams',
	'$rootScope',
	'$scope',
	'$state',
	function($stateParams, $rootScope, $scope, $state){
		$scope.currentState = $state;
		
	}
]);