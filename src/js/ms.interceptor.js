/**
 * 拦截器
 */
;(function (angular) {
    'use strict';
    /**
     * ms.interceptor
     */
    angular.module('ms.interceptor',[])
        .factory('requestError', ['$rootScope','$q', '$injector', function ($rootScope,$q, $injector) {
            return {
                "request": function (config) {
                    var cfpLoadingBar = $injector.get('cfpLoadingBar');
                    cfpLoadingBar.start();
                    return config || $q.when(config);
                },
                "response": function (response) {
                    var cfpLoadingBar = $injector.get('cfpLoadingBar');
                    cfpLoadingBar.complete();
                    return response;
                },
                'requestError': function (config) {
                    return $q.reject(config);
                },
                'responseError': function (response) {
                    return $q.reject(response);
                }
            }
        }]);
})(angular);