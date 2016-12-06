angular.module('config',[]);
angular.module('config').config([
	'RestangularProvider',
	'ApiUrlConstant',
	function(RestangularProvider, ApiUrlConstant){
	    //JSONP Setting
		RestangularProvider.setJsonp(true);
		RestangularProvider.setDefaultRequestParams('jsonp', {callback: 'JSON_CALLBACK'});

		//RestangularProvider.setDefaultHeaders({'Authorization': ""});
		//RestangularProvider.setDefaultHeaders({'X-XSRF-TOKEN': CSRF_TOKEN});
		//RestangularProvider.setDefaultRequestParams({apiKey: '4f847ad3e4b08a2eed5f3b54'})
    }
 ]);
angular.module('config').run([
    '$rootScope',
    '$state',
    '$location',
    'Restangular',
    'ApiUrlConstant',
    function($rootScope, $state, $location, Restangular, ApiUrlConstant){
        //Lambda REST APIのベースURL設定
        Restangular.setBaseUrl(ApiUrlConstant.lambdaBase);
        Restangular.setFullResponse(true);
    }
]);
