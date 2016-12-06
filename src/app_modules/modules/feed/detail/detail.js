angular.module('FeedDetailCtrl',[]).controller('FeedDetailCtrl',[
	'$stateParams',
	'$rootScope',
	'$scope',
	'$state',
	'marked',
	function($stateParams, $rootScope, $scope, $state, marked){
		$scope.itemData = $stateParams.itemData;
		$scope.markdownStr = "# ここから内容  \n## Markdown directive Test  \n---\n*It works!*\n#### Markdown [cheatsheet](//github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)  \n\n*This* **is** [markdown](https://daringfireball.net/projects/markdown/)\\n and `{{ 1 + 2 }}` = {{ 1 + 2 }}  \n\n---  \n";
		
		$scope.commentList = [
			{userName: 'user1@jbcc', commentContents: '##### コメントしました'},
			{userName: 'user2@jbcc', commentContents: '##### コメントしました  \n and `{{ 1 + 2 }}` = {{ 1 + 2 }}'},
			{userName: 'user3@jbcc', commentContents: '##### コメントしました'}
		];
		
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

	}
]);