/**
 * 弹出框
 */
;(function(angular){
    'use strict';

    /**
     * ms.sweetAlert
     */
    angular.module('ms.sweetAlert',[])
        .directive('sweetalert', ['$parse',function($parse){
            return{
                link : function(scope, element, attrs, controller) {
                    var sweetElement = angular.element(element);
                    sweetElement.on('click',function (event) {
                        var sweetOptions = scope.$eval(attrs.sweetOptions);
                        var sweetConfirmOption = scope.$eval(attrs.sweetConfirmOption);
                        var sweetCancelOption = scope.$eval(attrs.sweetCancelOption);
                        swal(sweetOptions,
                            function (isConfirm) {
                                if (isConfirm) {
                                    if (sweetConfirmOption) swal(sweetConfirmOption);
                                    if (attrs.sweetOnConfirm) scope.$evalAsync(attrs.sweetOnConfirm);
                                    /*$(element).trigger("click");*/
                                } else {
                                    if (sweetCancelOption) swal(sweetCancelOption);
                                    if (attrs.sweetOnCancel) scope.$evalAsync(attrs.sweetOnCancel);
                                }
                            });
                        event.stopPropagation();
                    })
                }
            }
        }]);

})(angular);