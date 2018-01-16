/**
 * 模块依赖配置
 */
;(function(angular){
    'use strict';

    /**
     * 手动启动Angular
     */
    function angularBootstrap(){
        /**
         * 手动启动Module,依赖模块需提前声明
         * MoorApplication dependency module；
         * 依赖库、插件
         * ngResource,ui-router,ngAnimate,angular-loading-bar,
         * jcs-autoValidate,ui.sortable,v-modal,sweetAlert,chart.js
         * 自定义|扩展
         * ms.sweetAlert,ms.config,ms.run,ms.im,ms.modal,ms.filter,
         * ms.service,ms.scrollable,ms.directive,ms.interceptor,ms.user,
         * ms.core.research,ms.center,ms.resource,ms.activity.task,
         * ms.topic,ms.share,ms.expert,ms.root.ctrl,ms.admin,ms.school
         */
        angular.module('MoorApplication', [
            'ngResource',
            'ui.router',
            'ngAnimate',
            'angular-loading-bar',
            'jcs-autoValidate',
            '720kb.datepicker',
            'angular-echarts',
            'ms.sweetAlert',
            'ms.config',
            'ms.run',
            'ms.modal',
            'ms.filter',
            'ms.scrollable',
            'ms.directive',
            'ms.interceptor',
            'ms.service',
            'ms.root.ctrl',
            'ms.demo',
            'ms.commonService'
        ]);
        angular.bootstrap(document,['MoorApplication']);
    }
    /**
     * 页面加载完毕
     */
    angular.element(document).ready(function(){
        /**
         * 启动
         */
        angularBootstrap();
    });
})(angular);