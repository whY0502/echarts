/**
 *
 * 滚动指令模块
 * ms.scrollable
 * dependency module:null
 */
;(function (angular) {
    'use strict';

    var module = angular.module('ms.scrollable', []);
    /**
     *
     * 返回顶部
     * uiBackTop
     * 判断条件：elem.scrollTop >= 800
     *
     * 滚动条高度大于或等于800，显示返回顶部按钮
     * 滚动条高度小于800，隐藏返回顶部按钮
     *
     */
    module.directive('uiBackTop', function () {
        return {
            restrict: 'A',
            link: function (scope, elem) {
                /*监听滚动事件*/
                elem.on('scroll', function () {
                    if (elem[0].scrollTop >= 800) {
                        angular.element(document.querySelector('.scrollToTop')).addClass('show');
                    } else {
                        angular.element(document.querySelector('.scrollToTop')).removeClass('show');
                    }
                });
                /*点击返回顶部按钮*/
                scope.scrollToTop = function () {
                    elem[0].scrollTop = 0;
                }
            }
        }
    });

    /**
     *
     * 滚动到某个位置触发某个方法
     *
     * 滚动到顶部
     * uiScrollTop
     * 判断条件：elem.scrollTop === 0;
     *
     * 滚动到底部
     * uiScrollBottom
     * 判断条件：elem.scrollHeight === elem.scrollTop + elem.clientHeight;
     *
     * 通过$eval方法调用
     * attrs[directiveName]绑定到触发的表达式
     *
     * 通过$evalAsync调用，高性能
     */
    angular.forEach({
        uiScrollTop: function (elem) {
            return elem.scrollTop === 0;
        },
        uiScrollBottom: function (elem) {
            return elem.scrollHeight === elem.scrollTop + elem.clientHeight;
        }
    },
    function (reached, directiveName) {
        module.directive(directiveName, [function () {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    /*监听滚动事件*/
                    elem.on('scroll', function () {
                        if (reached(elem[0])) {
                            scope.$evalAsync(attrs[directiveName]);
                            //以下方法不推荐，有性能隐患
                            /*scope.$apply(function () {
                                scope.$eval(attrs[directiveName]);
                            });*/
                        }
                    });
                }
            };
        }]);
    });
})(angular);
