/**
 * 模态框
 */
;(function (angular) {
    'use strict';

    /**
     * ms.modal
     * dependency module:
     * vModal(第三方插件)
     * ms.ctrl.modal
     * ms.service.modal
     */
    angular.module('ms.modal', [
        'vModal',
        'vModalSide',
        'ms.ctrl.modal',
        'ms.service.modal'
    ]);

    /**
     * ms.ctrl.modal
     */
    angular.module('ms.ctrl.modal', [])
    .controller('vDemoModal1Ctrl',['$scope', 'vDemoModal1',
        function ($scope, vDemoModal1) {
        var vm = this;
        vm.close = vDemoModal1.deactivate;
    }])
    .controller('vDemoModal2Ctrl',['$scope', 'vDemoModal2',
        function ($scope, vDemoModal2) {
            var vm = this;
            vm.close = vDemoModal2.deactivate;
    }])
    .controller('vDemoSideModal1Ctrl',['vDemoSide1Modal',function(vDemoSide1Modal){
        var vm = this;
        //全屏模式
        vm.fullScreenMode = false;
        vm.changeMode = function(){
            vm.fullScreenMode = !vm.fullScreenMode;
        };
        vm.close = vDemoSide1Modal.deactivate;
    }])
    .controller('vDemoSideModal2Ctrl',['vDemoSide2Modal',function(vDemoSide2Modal){
        var vm = this;
        vm.close = vDemoSide2Modal.deactivate;
    }])
    .controller('businessCardCtrl',['$scope','businessCardModal',
        function ($scope,businessCardModal) {
            var vm = this;
            vm.close = businessCardModal.deactivate;
            vm.userObject = $scope.userObject;
            /**
             * w：v-card的固定高度
             * h：v-card的固定宽度
             * mLeft：60+15+10 | sidebar:width:60px，flex容器padding-left:15px;v-card padding-left:10px;
             * $scope.offset：当前元素居中偏移量（元素宽度的一半）
             * $scope.left：当前元素距离屏幕左侧X轴偏移量
             * $scope.top：当前元素距离屏幕顶部Y轴偏移量
             * $scope.right：当前元素距离屏幕右侧偏移量
             * @type {number}
             */
            var w = 340, h = 150, mLeft = 85;
            var animateClass = 'fadeInDown';

            var left=0,top=0;
            left = $scope.left-w/2 + $scope.offset;
            top = $scope.top-h;

            if($scope.left < 230){
                left =$scope.left-mLeft/2;
                animateClass = 'fadeInRight';
            }
            if($scope.right<200){
                left = $scope.left-w+60;
                animateClass = 'fadeInLeft';
            }
            if($scope.top < h){
                top = $scope.top+$scope.offset*2;
            }
            if($scope.top<h){
                if($scope.left >= 230){
                    animateClass = 'fadeInUp-bottom';
                }else{
                    animateClass = 'fadeInUp-left';
                }
                if($scope.right< 200){
                    animateClass = 'fadeInLeft-bottom';
                }
            }
            //渲染动画class
            vm.animateClass = animateClass;
            //动态style
            vm.style={
                left:left+"px",
                top:top+"px"
            };
        }]);
    /**
     * ms.service.modal
     */
    angular.module('ms.service.modal', [])
    .factory('vDemoModal1', ['vModal', function (vModal) {
        return vModal({
            controller: 'vDemoModal1Ctrl',
            controllerAs: 'modal',
            templateUrl: 'vDemo1-modal-template.html'
        });
    }])
    .factory('vDemoModal2', ['vModal', function (vModal) {
        return vModal({
            controller: 'vDemoModal2Ctrl',
            controllerAs: 'modal',
            templateUrl: 'vDemo2-modal-template.html'
        });
    }])
    .factory('vDemoSide1Modal',['vModalSide',function(vModalSide){
        return vModalSide({
            controller:'vDemoSideModal1Ctrl',
            controllerAs:'modal',
            templateUrl:'vDemoSide-modal-template.html'
        })
    }])
    .factory('vDemoSide2Modal',['vModalSide',function(vModalSide){
        return vModalSide({
            controller:'vDemoSideModal2Ctrl',
            controllerAs:'modal',
            templateUrl:'vDemoSideFit-modal-template.html'
        })
    }])
    .factory('businessCardModal',['businessCard',function(businessCard){
        return businessCard({
            controller:'businessCardCtrl',
            controllerAs:'modal',
            templateUrl:'business-card-modal.html'
        })
    }]);
})(angular);