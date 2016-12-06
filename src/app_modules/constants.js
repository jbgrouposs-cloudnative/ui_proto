angular.module('constants',[]);
angular.module('constants').constant('ApiUrlConstant',(function(){
    // REST API URI
    var LAMBDA_BASE_PATH = 'https://qij6pqtvse.execute-api.us-east-1.amazonaws.com/beta/';

    return {
        lambdaBase: LAMBDA_BASE_PATH,
        sampleFunc: 'angularsample'
    }
})());