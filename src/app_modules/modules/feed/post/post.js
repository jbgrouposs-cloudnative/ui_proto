angular.module('FeedPostCtrl',[]).controller('FeedPostCtrl',[
	'$stateParams',
	'$rootScope',
	'$scope',
	'$state',
	'marked',
	function($stateParams, $rootScope, $scope, $state, marked){
		$scope.feed = {
			feedTitle: '',
			feedTag: ''
		};
		$scope.editorValue = "";
		
		$scope.fullScreenPreview = function() {
			$rootScope.markdownEditorObjects.editorValue.showPreview();
			$rootScope.markdownEditorObjects.editorValue.setFullscreen(true);
		};

		$scope.onFullScreenCallback = function(e) {
			e.showPreview();
		};

		$scope.onFullScreenExitCallback = function(e) {
			e.hidePreview();
		};

		$scope.postFeedData = function(feedData){
			var postData = {
				feedTitle: feedData.feedTitle,
				feedTag: feedData.feedTag,
				feedContents: $scope.editorValue
			};
			//console.log(JSON.stringify(postData));
			$state.go('feed-list', {}, {reload: true});
		};
	}
]);