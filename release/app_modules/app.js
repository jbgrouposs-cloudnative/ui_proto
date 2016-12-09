var app=angular.module("app",["ui.router","restangular","ui.bootstrap","ngAnimate","ngSanitize","ui.validate","ngTouch","hc.marked","hljs","angular-markdown-editor","constants","config","MainCtrl","FeedListCtrl","FeedDetailCtrl","FeedPostCtrl","StockListCtrl"],["$stateProvider","$urlRouterProvider",function(t,e){e.otherwise("/feed-list"),t.state("main",{url:"/main",templateUrl:"app_modules/modules/main/main.html",controller:"MainCtrl"}).state("feed-list",{url:"/feed-list",templateUrl:"app_modules/modules/feed/list/list.html",controller:"FeedListCtrl"}).state("feed-list.feed-detail",{url:"/feed-detail",params:{itemData:null},templateUrl:"app_modules/modules/feed/detail/detail.html",controller:"FeedDetailCtrl"}).state("feed-list.feed-post",{url:"/feed-post",templateUrl:"app_modules/modules/feed/post/post.html",controller:"FeedPostCtrl"}).state("feed-list.stock-list",{url:"/stock-list",templateUrl:"app_modules/modules/stock/list.html",controller:"StockListCtrl"})}]).config(["markedProvider","hljsServiceProvider",function(t,e){t.setOptions({gfm:!0,tables:!0,sanitize:!0,highlight:function(t,e){return e?hljs.highlight(e,t,!0).value:hljs.highlightAuto(t).value}}),e.setOptions({tabReplace:"    "})}]);app.run(["$rootScope","$location",function(t,e){}]);