angular.module("StockListCtrl",[]).controller("StockListCtrl",["$stateParams","$rootScope","$scope","$state",function(t,e,c,s){var a=this;c.currentState=s,c.stockList={},c.title="",this.getList=function(){c.stockList=[{title:"ストックしたフィード1",userName:"user1@jbcc",postedDate:"2999-12-31T02:00:00+09:00",tagName:"タグ名1",contents:"内容1"},{title:"ストックしたフィード2",userName:"user2@jbcc",postedDate:"2999-12-31T02:00:00+09:00",tagName:"タグ名2",contents:"内容2"},{title:"ストックしたフィード3",userName:"user3@jbcc",postedDate:"2999-12-31T02:00:00+09:00",tagName:"タグ名3",contents:"内容3"}]},a.getList(),c.selectItem=function(t){t.selectedItem=!0,s.go("feed-list.feed-detail",{itemData:t})},c.recentTabSelect=function(){c.title="最近の投稿"},c.stockTabSelect=function(){c.title="ストックした投稿"},c.commentTabSelect=function(){c.title="コメント"}}]);