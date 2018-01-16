/**
 * Created by Administrator on 2017/4/8.
 */
;
(function (angular) {
    'use strict';
    /**
     * 改造后的侧边滑块
     */
    angular.module('vModalSide',[
        'ngAnimate',
        'vModalSide.config',
        'vModalSide.directives',
        'vModalSide.services'
    ]);

    angular.module('vModalSide.config', [])
        .constant('modalSideConfig', {
            containerSelector: '#app-body',
            containerSelector_card:'body',
            closeOnEsc: true
        });

    angular.module('vModalSide.directives',[])
        .directive('vCloseSide', function(){
            return {
                restrict: 'E',
                scope: {
                    label: '@'
                },
                link: function (scope, iElement, iAttrs) {
                    if (scope.label) {
                        iAttrs.$set('aria-label', scope.label);
                    }

                    iAttrs.$set('role', 'button');
                    iAttrs.$set('tabindex', 0);
                }
            };
        })
        .directive('vDialogSide', function(){
            return {
                restrict: 'AE',
                require: '^vModalSide',
                transclude: true,
                scope: {
                    heading: '@',
                    role: '@'
                },
                link: function (scope, iElement, iAttrs, modalCtrl, transclude) {
                    transclude(scope.$parent, function(clone) {
                        iElement.append(clone);
                    });

                    if (scope.heading) {
                        iAttrs.$set('aria-label', scope.heading);
                    }

                    iAttrs.$set('role', 'dialog');
                    iAttrs.$set('tabindex', -1);

                    iElement[0].focus();
                    setTimeout(function () { iElement[0].focus(); }, 0);
                }
            };
        })
        .directive('vModalSide', ['$document','modalSideConfig',
            function($document, modalSideConfig){
                return {
                    restrict: 'AE',
                    transclude: true,
                    scope: {
                        close: '&?onclose'
                    },
                    controller: angular.noop,
                    link: function (scope, iElement, iAttrs, ctrl, transclude) {
                        transclude(scope.$parent, function(clone) {
                            iElement.append(clone);
                        });

                        scope.close = (angular.isFunction(scope.close)) ? scope.close : angular.noop;

                        function hasParentElement (elem) {
                            while (elem.tagName !== 'V-CLOSE-SIDE') {
                                elem = elem.parentNode;
                                if (!elem) {
                                    return false;
                                }
                            }
                            return true;
                        }

                        function modalClick (event) {
                            var isBackdrop = (event.target.tagName === 'V-MODAL-SIDE');

                            if (isBackdrop || hasParentElement(event.target, 'V-CLOSE-SIDE')) {
                                scope.$apply(function () { scope.close(); });
                            }
                        }

                        function documentKeydown (event) {
                            if (!modalSideConfig.closeOnEsc) { return false; }

                            if (event.keyCode === 27) {
                                scope.$apply(function () {
                                    scope.close();
                                });
                            }
                        }

                        iElement.on('click', modalClick);
                        $document.on('keydown', documentKeydown);

                        scope.$on('$destroy', function () {
                            iElement.off('click', modalClick);
                            $document.off('keydown', documentKeydown);
                        });
                    }
                };
            }
        ])
        .directive('vCard', ['$document','modalSideConfig','$window',
        function($document, modalSideConfig,$window){
            return {
                restrict: 'AE',
                transclude: true,
                scope: {
                    close: '&?onclose'
                },
                controller: angular.noop,
                link: function (scope, iElement, iAttrs, ctrl, transclude) {
                    transclude(scope.$parent, function(clone) {
                        iElement.append(clone);
                    });
                    //关闭窗口
                    scope.close = (angular.isFunction(scope.close)) ? scope.close : angular.noop;
                    //判断父级节点
                    function hasParentElement (elem) {
                        while (elem.tagName !== 'V-CARD') {
                            elem = elem.parentNode;
                            if (!elem) {
                                return false;
                            }
                        }
                        return true;
                    }
                    //点击事件
                    function modalClick (event) {
                        //console.log(event.target.attributes['business-card']);
                        //console.log($window.localStorage.getItem('position') == null);
                        var isSelf = event.target.attributes['business-card'] && $window.localStorage.getItem('position') == null;
                        if(!isSelf){
                            var isBackdrop = (event.target.tagName !== 'V-CARD');
                            if (isBackdrop) {
                                if(!hasParentElement(event.target)){
                                    scope.$apply(function () { scope.close(); });
                                }
                            }
                        }
                    }
                    //按下ESC键
                    function documentKeydown (event) {
                        if (!modalSideConfig.closeOnEsc) {
                            return false;
                        }
                        if (event.keyCode === 27) {
                            scope.$apply(function () {
                                scope.close();
                            });
                        }
                    }
                    //绑定事件
                    $document.on('mouseover',modalClick);
                    $document.on('click', modalClick);
                    $document.on('keydown', documentKeydown);
                    //注销事件
                    scope.$on('$destroy', function () {
                        $document.off('mouseover',modalClick);
                        $document.off('click', modalClick);
                        $document.off('keydown', documentKeydown);
                    });
                }
            };
        }
    ]);

    angular.module('vModalSide.services',[])
        .factory('vModalSide',['$animate','$compile','$rootScope','$controller','$q','$http','$templateCache','$document','modalSideConfig',
            function($animate, $compile, $rootScope, $controller, $q, $http, $templateCache, $document, modalSideConfig){
                return function modalFactory (config) {
                    if (!(!config.template ^ !config.templateUrl)) {
                        throw new Error('Expected modal to have exacly one of either `template` or `templateUrl`');
                    }

                    var controller      = config.controller || null,
                        controllerAs    = config.controllerAs,
                        container       = angular.element(config.container || $document[0].querySelector(modalSideConfig.containerSelector)),
                        root            = angular.element($document[0].querySelector('html')),
                        element         = null,
                        html,
                        scope;

                    if (config.template) {
                        html = $q.when(config.template);
                    } else {
                        html = $http.get(config.templateUrl, {
                            cache: $templateCache
                        }).
                        then(function (response) {
                            return response.data;
                        });
                    }

                    function activate (locals) {
                        return html.then(function (html) {
                            if (!element) {
                                attach(html, locals);
                            }
                        });
                    }


                    function attach (html, locals) {
                        element = angular.element(html);
                        if (element.length === 0) {
                            throw new Error('The template contains no elements; you need to wrap text nodes');
                        }
                        scope = $rootScope.$new();
                        if (controller) {
                            if (!locals) {
                                locals = {};
                            }
                            for (var prop in locals) {
                                scope[prop] = locals[prop];
                            }
                            var ctrl = $controller(controller, {$scope: scope});
                            if (controllerAs) {
                                scope[controllerAs] = ctrl;
                            }
                        } else if (locals) {
                            for (var prop in locals) {
                                scope[prop] = locals[prop];
                            }
                        }
                        $compile(element)(scope);
                        container.attr('v-modal-open', '');
                        root.attr('v-modal-active', '');
                        return $animate.enter(element, container);
                    }

                    function deactivate () {
                        if (!element) {
                            return $q.when();
                        }
                        return $animate.leave(element).then(function () {
                            scope.$destroy();
                            scope = null;
                            element.remove();
                            element = null;
                            container.removeAttr('v-modal-open');
                            root.removeAttr('v-modal-active', '');
                        });
                    }

                    function active () {
                        return !!element;
                    }

                    return {
                        activate: activate,
                        deactivate: deactivate,
                        active: active
                    };
                };
            }
        ])
        .factory('businessCard',['$animate','$compile','$rootScope','$controller','$q','$http','$templateCache','$document','modalSideConfig',
            function($animate, $compile, $rootScope, $controller, $q, $http, $templateCache, $document, modalSideConfig){
                return function modalFactory (config) {
                    if (!(!config.template ^ !config.templateUrl)) {
                        throw new Error('Expected modal to have exacly one of either `template` or `templateUrl`');
                    }

                    var controller      = config.controller || null,
                        controllerAs    = config.controllerAs,
                        container       = angular.element(config.container || $document[0].querySelector(modalSideConfig.containerSelector_card)),
                        //root            = angular.element($document[0].querySelector('html')),
                        element         = null,
                        html,
                        scope;

                    if (config.template) {
                        html = $q.when(config.template);
                    } else {
                        html = $http.get(config.templateUrl, {
                            cache: $templateCache
                        }).
                        then(function (response) {
                            return response.data;
                        });
                    }

                    function activate (locals) {
                        return html.then(function (html) {
                            if (!element) {
                                attach(html, locals);
                            }
                        });
                    }


                    function attach (html, locals) {
                        element = angular.element(html);
                        if (element.length === 0) {
                            throw new Error('The template contains no elements; you need to wrap text nodes');
                        }
                        scope = $rootScope.$new();
                        if (controller) {
                            if (!locals) {
                                locals = {};
                            }
                            for (var prop in locals) {
                                scope[prop] = locals[prop];
                            }
                            var ctrl = $controller(controller, {$scope: scope});
                            if (controllerAs) {
                                scope[controllerAs] = ctrl;
                            }
                        } else if (locals) {
                            for (var prop in locals) {
                                scope[prop] = locals[prop];
                            }
                        }
                        $compile(element)(scope);
                        //container.attr('v-modal-open', '');
                        //root.attr('v-modal-active', '');
                        return $animate.enter(element, container);
                    }

                    function deactivate () {
                        if (!element) {
                            return $q.when();
                        }
                        return $animate.leave(element).then(function () {
                            if(scope){
                                scope.$destroy();
                                scope = null;
                            }
                            if(element){
                                element.remove();
                                element = null;
                            }
                            //container.removeAttr('v-modal-open');
                            //root.removeAttr('v-modal-active', '');
                        });
                    }

                    function active () {
                        return !!element;
                    }

                    return {
                        activate: activate,
                        deactivate: deactivate,
                        active: active
                    };
                };
            }
        ]);
}(angular));