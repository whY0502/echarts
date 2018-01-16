/**
 * 后台通用REST服务
 */
;(function (angular) {
    'use strict';

    /**
     * ms.service
     */
    angular.module('ms.commonService',[])
        .factory('commonService',['$http','$q',function($http,$q){
            var commonService = {};
            commonService.getMethod = function(url){
                var defered = $q.defer();
                $http.get(url)
                    .then(function(data){
                        defered.resolve(data);  
                    })
                    .catch(function(err){
                        defered.reject(err);
                    });
                //把deferred对象中的promise对象返回出来
                return defered.promise;
            };
            return commonService;
        }]);
})(angular);