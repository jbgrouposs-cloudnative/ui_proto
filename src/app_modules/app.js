var app = angular.module('app',
    ['ui.router',
     'restangular',
     'ui.bootstrap',
     'ngAnimate',
     'ngSanitize',
     'ui.validate',
     'ngTouch',
     'hc.marked',
     'hljs',
     'angular-markdown-editor',
     'constants',
     'config',
     'MainCtrl',
     'FeedListCtrl',
     'FeedDetailCtrl',
     'FeedPostCtrl',
     'StockListCtrl'],
    ['$stateProvider',
     '$urlRouterProvider',
function($stateProvider, $urlRouterProvider)
{
    $urlRouterProvider.otherwise('/feed-list');

    $stateProvider
        .state('main',{
            url:'/main',
            templateUrl:'app_modules/modules/main/main.html',
            controller:'MainCtrl'
        })
        .state('feed-list',{
            url:'/feed-list',
            templateUrl:'app_modules/modules/feed/list/list.html',
            controller:'FeedListCtrl'
        })
        .state('feed-list.feed-detail',{
            url:'/feed-detail',
            params: {itemData: null},
            templateUrl:'app_modules/modules/feed/detail/detail.html',
            controller:'FeedDetailCtrl'
        })
        .state('feed-list.feed-post',{
            url:'/feed-post',
            templateUrl:'app_modules/modules/feed/post/post.html',
            controller:'FeedPostCtrl'
        })
        .state('feed-list.stock-list',{
            url:'/stock-list',
            templateUrl:'app_modules/modules/stock/list.html',
            controller:'StockListCtrl'
        });
    
}])
.config(['markedProvider', 'hljsServiceProvider', function(markedProvider, hljsServiceProvider) {
    // marked config
    markedProvider.setOptions({
        gfm: true,
        tables: true,
        sanitize: true,
        highlight: function (code, lang) {
            if (lang) {
                return hljs.highlight(lang, code, true).value;
            } else {
                return hljs.highlightAuto(code).value;
            }
        }
    });

    // highlight config
    hljsServiceProvider.setOptions({
        // replace tab with 4 spaces
        tabReplace: '    '
    });
}]);
app.run(['$rootScope', '$location', function($rootScope, $location) {
}]);
