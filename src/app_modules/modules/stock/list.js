angular.module('StockListCtrl',[]).controller('StockListCtrl',[
	'$stateParams',
	'$rootScope',
	'$scope',
	'$state',
	function($stateParams, $rootScope, $scope, $state){
		var self = this;
		$scope.currentState = $state;
		$scope.stockList = {};
		$scope.title = '';

		/**
		 * フィード一覧を取得します。
		 */
		this.getList = function(){
			
			$scope.stockList = [
				{title:'ストックしたフィード1', userName:'user1@jbcc', postedDate:'2999-12-31T02:00:00+09:00', tagName:'タグ名1', contents:'内容1'},
				{title:'ストックしたフィード2', userName:'user2@jbcc', postedDate:'2999-12-31T02:00:00+09:00', tagName:'タグ名2', contents:'内容2'},
				{title:'ストックしたフィード3', userName:'user3@jbcc', postedDate:'2999-12-31T02:00:00+09:00', tagName:'タグ名3', contents:'内容3'}
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

		$scope.recentTabSelect = function(){
			$scope.title = '最近の投稿';
		};

		$scope.stockTabSelect = function(){
			$scope.title = 'ストックした投稿';
		};

		$scope.commentTabSelect = function(){
			$scope.title = 'コメント';
		};
	}
]);