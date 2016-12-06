angular.module('FeedListCtrl',[]).controller('FeedListCtrl',[
	'$stateParams',
	'$rootScope',
	'$scope',
	'$state',
	function($stateParams, $rootScope, $scope, $state){
		var self = this;
		$scope.currentState = $state;
		$scope.feedList = {};

		/**
		 * フィード一覧を取得します。
		 */
		this.getList = function(){
			
			$scope.feedList = [
				{title:'タイトル1', userName:'user1@jbcc', postedDate:'2999-12-31T02:00:00+09:00', tagName:'タグ名1', contents:'内容1'},
				{title:'タイトル2', userName:'user2@jbcc', postedDate:'2999-12-31T02:00:00+09:00', tagName:'タグ名2', contents:'内容2'},
				{title:'タイトル3', userName:'user3@jbcc', postedDate:'2999-12-31T02:00:00+09:00', tagName:'タグ名3', contents:'内容3'}
			];

		};

		//一覧取得
		self.getList();

		/**
		 * リストアイテム選択時のイベントハンドラ
		 */
		$scope.selectItem = function(item){
			item.selectedItem = true;
			//フィード詳細へ遷移
			$state.go('feed-list.feed-detail', {itemData: item});
		};		
	}
]);