;(function(angular){
    'use strict';

    /**
     * ms.config
     * 定义路由
     */
    angular.module('ms.config',[])
        .config(['$stateProvider','$urlRouterProvider','cfpLoadingBarProvider','$httpProvider','$locationProvider',
            function($stateProvider,$urlRouterProvider,cfpLoadingBarProvider,$httpProvider,$locationProvider){


            /****************** 个人中心  **********************/
            $stateProvider.state('ms',{
                url:'/ms',
                templateUrl:'view/demo/demo.html'
            }).state('tip',{
                url:'/tip',
                templateUrl:'view/demo/tip.html',
                controller:'tipCtrl',
                controllerAs:'tip'
            }).state('tip.tipA',{
                url:'/tipA',
                templateUrl:'view/demo/tipA.html',
                controller:'tipACtrl',
                controllerAs:'tipA'
            }).state('tip.tipB',{
                url:'/tipB',
                templateUrl:'view/demo/tipB.html',
                controller:'tipBCtrl',
                controllerAs:'tipB'
            }).state('modal',{
                url:'/modal',
                templateUrl:'view/demo/modal.html',
                controller:'modalCtrl',
                controllerAs:'modal'
            }).state('modal.topicB',{
                url:'/topicB',
                templateUrl:'view/demo/topicB.html',
                controller:'topicBCtrl',
                controllerAs:'topicB'
            }).state('layout1',{
                url:'/layout1',
                templateUrl:'view/demo/layout1.html',
                controller:'ringCtrl',
                controllerAs:'ring'
            }).state('layout1.ringA',{
                url:'/ringA',
                templateUrl:'view/demo/ringA.html',
                controller:'ringACtrl',
                controllerAs:'ringA'
            }).state('layout1.ringA.issueA',{
                url:'/issueA',
                templateUrl:'view/demo/issueA.html',
                controller:'issueACtrl',
                controllerAs:'issueA'
            }).state('layout1.ringA.issueB',{
                url:'/issueB',
                templateUrl:'view/demo/issueB.html',
                controller:'issueBCtrl',
                controllerAs:'issueB'
            }).state('layout1.ringB',{
                url:'/ringB',
                templateUrl:'view/demo/ringB.html',
                controller:'ringBCtrl',
                controllerAs:'ringB'
            }).state('layout2',{
                url:'/layout2',
                templateUrl:'view/demo/layout2.html',
                controller:'NavCtrl',
                controllerAs:'Nav'
            }).state('layout2.NavA',{
                url:'/NavA',
                templateUrl:'view/demo/NavA.html',
                controller:'NavACtrl',
                controllerAs:'NavA'
            }).state('layout2.NavB',{
                url:'/NavB',
                templateUrl:'view/demo/NavB.html',
                controller:'NavBCtrl',
                controllerAs:'NavB'
            }).state('layout2.NavC',{
                url:'/NavC',
                templateUrl:'view/demo/NavC.html',
                controller:'NavCCtrl',
                controllerAs:'NavC'
            });

            //不同角色的默认路由
            $urlRouterProvider.otherwise("/ms");
            /**
             * 使用HTML5 History API,让URL洁净(去掉!#)
             * $locationProvider.html5Mode(true);
             * 去掉(!),省略index.html
             */
            $locationProvider.hashPrefix('');
            /**
             * 默认加载条相对的元素
             * @type {string}
             */
            cfpLoadingBarProvider.parentSelector = '#app-body';
            /**
             * 挂载拦截器
             */
            $httpProvider.interceptors.push('requestError');
            /**
             * 设置http支持凭据响应
             * @type {boolean}
             */
            $httpProvider.defaults.withCredentials = true;

            //查看$http服务请头设置
            console.log($httpProvider.defaults.headers.common);
        }]);
})(angular);