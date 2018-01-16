;(function(angular){
    'use strict';

    /**
     * ms.run
     */
    angular.module('ms.run',[])
        .run(['$rootScope','$state','$stateParams','TipService','defaultErrorMessageResolver',
            function($rootScope,$state,$stateParams,TipService,defaultErrorMessageResolver){
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            /**
             * 全局变量
             * @type {TipService|*}
             */
            $rootScope.TipService = TipService;

            /**
             * jcs-autoValidate模块Api，自定义验证错误处理
             */
            defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages){
                errorMessages['BadStudentID'] = '学号由任意字母、数字组成';
            });

            /**
             * 监听路由切换成功，设置主导航active样式
             */
            $rootScope.$on('$stateChangeSuccess',function(evt, toState, toParams, fromState, fromParams){
                var index = toState.name.indexOf('.');
                if(index == -1){
                    $rootScope.actionNav = toState.name;
                }else{
                    $rootScope.actionNav = toState.name.substr(0,index);
                }
            });
        }])
})(angular);