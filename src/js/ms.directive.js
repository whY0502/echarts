/**
 * 通用指令
 * ms.directive
 * dependency module:null
 */
;(function (angular) {
    'use strict';

    angular.module('ms.directive',[])
        .directive('perbar',function(){
            return {    
                scope: {    
                    id: "@",    
                    legend: "=",    
                    //item: "=",    
                    data: "="    
                },    
                restrict: 'E',    
                template: '<div style="height:400px;"></div>',    
                replace: true,    
                link: function($scope, element, attrs, controller) {  
                    var a = []; 
                    // $scope.$watch('$scope.data',function(){
                    //     scope.data=$scope.data;
                    // })  ;
                    var option = {   
                          
                        title:{  
                                text : '人数比例',//标题说明  
                                x:'center'//居中  
                            },  
                        // 提示框，鼠标悬浮交互时的信息提示    
          
                        tooltip: {    
                            show: true,    
                            formatter: "{a} <br/>{b} : {c} ({d}%)"  
                        },    
                        // 图例    
                        legend: {  
                             x : 'center',  
                             y : 'bottom',  
                            data: $scope.legend    
                        },    
                         
                        // 数据内容数组    
                        series: [  
                        {  
                            name:'',  
                            type: 'pie',   
                            radius:"55%",  
                            center:['50%','50%'],  
                          
                            label: {   
                                normal: {   
                                    position: 'inner' //内置文本标签   
                                }   
                            },  
                            labelLine: {  
                                normal: {  
                                    show: false  
                                }  
                            },  
                          
                            data:$scope.data,  
          
                            itemStyle : {  
                                normal: {  
                                    label: {  
                                        show: false  
                                    },  
                                    labelLine: {  
                                        show: false  
                                    }  
                                },  
                                emphasis: {  
                                    label: {  
                                        show: true,  
                                        position: 'outer'  
                                    },  
                                    labelLine: {  
                                        show: true,  
                                        lineStyle: {  
                                            color: 'red'  
                                        },  
                                    },  
                                }  
                            }  
                        }  
                          
                        ]  
                            
                    };    
                    var myChart = echarts.init(document.getElementById($scope.id),'macarons');    
                    myChart.setOption(option);    
                }    
            };    
        })
        .directive('expbar',function(){
            return {    
                scope: {    
                    id: "@",    
                    legend: "=",    
                    //item: "=",    
                    data: "="    
                },    
                restrict: 'E',    
                template: '<div style="height:400px;"></div>',    
                replace: true,    
                link: function($scope, element, attrs, controller) {  
                    var a = []; 
                    var option = {   
                        title:{  
                                text : '专家相关数据展示',//标题说明  
                                subtext:'数据来源Moors后台' 
                            },  
                        // 提示框，鼠标悬浮交互时的信息提示    
          
                        tooltip: {    
                             
                        },    
                        // 图例    
                        legend: {   
                            data: $scope.legend    
                        }, 
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                magicType: {show: true, type: ['line', 'bar']},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        }, 
                        calculable : true,
                        xAxis : [
                            {
                                type : 'value',
                                boundaryGap : [0, 0.01]
                            }
                        ],
                        yAxis : [
                            {
                                type : 'category',
                                data : $scope.legend
                            }
                        ],  
                         
                        // 数据内容数组    
                        series: [  
                        {  

                            name:'',  
                            type: 'bar',  
                            barWidth:'60',
                            label: {   
                                normal: {   
                                    position: 'inner' //内置文本标签   
                                }   
                            },  
                            labelLine: {  
                                normal: {  
                                    show: false  
                                }  
                            },  
                          
                            data:$scope.data,  
          
                            itemStyle : {  
                                normal: {  
                                    label: {  
                                        show: false  
                                    },  
                                    labelLine: {  
                                        show: false  
                                    }  
                                },  
                                emphasis: {  
                                    label: {  
                                        show: true,  
                                        position: 'outer'  
                                    },  
                                    labelLine: {  
                                        show: true,  
                                        lineStyle: {  
                                            color: 'red'  
                                        },  
                                    },  
                                }  
                            }  
                        }  
                          
                        ]  
                            
                    };    
                    var myChart = echarts.init(document.getElementById($scope.id),'macarons');    
                    myChart.setOption(option);    
                }    
            };    
        })
        .directive('pie',function(){
            return {    
                scope: {    
                    id: "@",    
                    legend: "=",    
                    //item: "=",    
                    data: "=" ,
                    counts:"="   
                },    
                restrict: 'E',    
                template: '<div style="height:400px;"></div>',    
                replace: true,    
                link: function($scope, element, attrs, controller) {  
                    var a = []; 
                    var option = {   
                          
                        title:{  
                                text : '',//标题说明  
                                subtext:'数据来源Moors后台' 
                            },  
                        // 提示框，鼠标悬浮交互时的信息提示    
          
                        tooltip: {    
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },    
                        // 图例    
                        legend: {   
                            orient : 'vertical',
                            x : 'left',
                            data:$scope.legend
                        }, 
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                magicType: {
                                    show: true, 
                                    type: ['pie', 'funnel']
                                },
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        }, 
                        calculable : true,
                        graphic:{
                            type:'text',
                            left:'center',
                            top:'center',
                            style:{
                                text:'当前总数\n '+$scope.counts,
                                textAlign:'center',
                                fill:'yellowgreen',
                                width:200,
                                height:200,
                                font:'25px bolder'
                            },
                            

                        },
                        // color:[ 
                        //     '#da70d6', '#32cd32', '#ff7f50', '#87cefa', '#6495ed', 
                        //     '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0', 
                        //     '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700', 
                        //     '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0' 
                        // ],
                         
                        // 数据内容数组    
                        series: [  
                        {  
                            name:'',
                            type:'pie',
                            radius : ['50%', '70%'],
                            startAngle:'270',
                            itemStyle:{
                                normal:{
                                    label:{
                                        textStyle:{fontSize:'16'},
                                        borderWidth:'400'
                                    }
                                }
                            },
                            
                            //for funnel
                            x:'60%',
                            width:'35%',
                            funnelAlign:'left',

                            data:$scope.data
                        }  
                          
                        ]  
                            
                    }; 
                       
                    var myChart = echarts.init(document.getElementById($scope.id),'dark');    
                    myChart.setOption(option);    
                }    
            };    
        })
        .directive('scatter',function(){
            return {    
                scope: {    
                    id: "@",    
                    legend: "=",    
                    //item: "=",    
                    data: "="  
                },    
                restrict: 'E',    
                template: '<div style="height:400px;"></div>',    
                replace: true,    
                link: function($scope, element, attrs, controller) {  
                    var a = []; 
                    var option = {   
                          
                        title:{  
                                text : '专家回复问题情况',//标题说明  
                                subtext:'数据来源Moors后台' 
                            },  
                        // 提示框，鼠标悬浮交互时的信息提示    
          
                        tooltip: {    
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} "
                        },    
                        // 图例    
                        legend: {   
                            right: 10,
                            data: '回复问题数'
                        }, 
                        xAxis: {
                            
                            type : 'category',
                            data : $scope.legend,
                            splitLine: {
                                lineStyle: {
                                    type: 'dashed'
                                }
                            }
                        },
                        yAxis: {
                            splitLine: {
                                lineStyle: {
                                    type: 'dashed'
                                }
                            },
                            scale: true,

                        },
                         
                        // 数据内容数组    
                        series: [  
                        {  
                            name:'',
                            type:'scatter',
                            label: {
                                emphasis: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            itemStyle:{
                                normal:{
                                    shadowBlur: 10,
                                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                                    shadowOffsetY: 5,
                                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                        offset: 0,
                                        color: 'rgb(251, 118, 123)'
                                    }, {
                                        offset: 1,
                                        color: 'rgb(204, 46, 72)'
                                    }])
                                }
                            },

                            data:$scope.data
                        }  
                          
                        ]  
                            
                    }; 
                       
                    var myChart = echarts.init(document.getElementById($scope.id),'dark');    
                    myChart.setOption(option);    
                }    
            };    
        })
        .directive('treeView',function(){
            return {
                restrict: 'E',
                templateUrl: 'organization-treeView.html',
                scope: {
                    treeData: '=',
                    treeType:'@',
                    activeNodeId:'@',
                    textField: '@',
                    clickNode: '&',
                    createNode:'&',
                    sortNode:'&',
                    updateNode:'&',
                    deleteNode:'&'
                },
                controller:['$scope', function($scope){
                    //点击节点，加载业务数据
                    $scope.loadDataByItem = function(item, $event){
                        $scope.activeNodeId = item.id;
                        $scope.warpCallback('clickNode',item, $event);
                        $event.stopPropagation();
                    };
                    //控制节点的展示与收缩
                    $scope.itemExpended = function(item, $event){
                        item.$$isExpend = ! item.$$isExpend;
                        $event.stopPropagation();
                    };
                    //控制节点的菜单
                    $scope.getItemIcon = function(item,treeType){
                        var isLeaf = $scope.isLeaf(item,treeType);
                        if(isLeaf){
                            return 'icon ion-ios-box-outline';
                        }
                        return item.$$isExpend ? 'fa fa-folder-open':'icon ion-folder';
                        //return item.$$isExpend ? 'icon ion-ios-folder-outline':'icon ion-ios-folder';
                    };
                    //控制展开收缩菜单
                    $scope.getItemExpansionIcon = function(item){
                        return item.$$isExpend ? 'icon ion-android-arrow-dropup-circle':'icon ion-android-arrow-dropdown-circle';
                    };
                    //判断是否为叶子节点)
                    $scope.isLeaf = function(item,treeType){
                        return (treeType == 1 && item.level ==3) || (treeType == 2 && item.level ==2);
                        //return !item.children || !item.children.length;
                    };
                    //回调主控制器方法
                    $scope.warpCallback = function(callback, item, $event){
                        ($scope[callback] || angular.noop)({
                            $item:item,
                            $event:$event
                        });
                    };
                }]
            };
        })
        .directive("subScrollable", function(){
            return{
                restrict: "C",
                link: function(scope,element){
                    element[0].style.height = document.documentElement.clientHeight +"px";
                }
            }
        })
        //全局提示
        .directive('alertBar',function(){
            return {
                restrict: 'EA',
                templateUrl: 'view/alertBar.html',
                scope : {
                    message : "=",
                    type : "="
                },
                link: function(scope, element, attrs){
                    scope.hideAlert = function() {
                        scope.message = null;
                        scope.type = null;
                    };
                }
            };
        })
        //分页条
        .directive('pagination',function(){
            return {
                restrict:'EA',
                templateUrl:'view/pagination.html',
                scope : {
                    page:'=',
                    totalPage:'=',
                    pageList:'=',
                    query:'&'
                }
            }
        })
        //评论form
        .directive('commentForm',function(){
            return {
                restrict:'E',
                templateUrl:'view/commentForm.html',
                scope:{
                    item:'=',
                    dialogContent:'=',
                    toUserName:'@',
                    submitFun:'&'
                },
                link: function(scope, element, attrs){
                    //提交回复
                    scope.submit = function(){
                        if(scope.dialogContent == '' || scope.dialogContent == null){ return; }
                        scope.submitFun({item:scope.item},{dialogContent:scope.dialogContent});
                        scope.dialogContent = null;
                    }
                }
            }
        })
        //用户卡片
        .directive('businessCard',['businessCardModal','$timeout','$window',
            function(businessCardModal,$timeout,$window){
            return{
                restrict:'A',
                scope:{
                    userObject:'='
                },
                link:function(scope,element,attrs){
                    element.on('click',function(event){//mouseover
                        var offset = 0;
                        if(element.hasClass('photo-max')){
                            offset = 21;//:42/2
                        }else if(element.hasClass('photo-min')){
                            offset = 16;//:32/2
                        }else{
                            offset = 19;//:37/2
                        }
                        var X = this.getBoundingClientRect().left+document.documentElement.scrollLeft;
                        var Y = this.getBoundingClientRect().top+document.documentElement.scrollTop;
                        var R = document.body.clientWidth-this.getBoundingClientRect().right;
                        //console.log("元素位置是X:"+X+";Y:"+Y+";R:"+R);
                        var localPosition = $window.localStorage.getItem('position');
                        if(localPosition != null){
                            if(localPosition === X+":"+Y && businessCardModal.active()){
                                $window.localStorage.removeItem('position');
                                //console.log('removeItem...');
                                return;
                            }else{
                                $window.localStorage.setItem('position',X+":"+Y);
                            }
                        }else{
                            $window.localStorage.setItem('position',X+":"+Y);
                        }
                        if(businessCardModal.active()){
                            scope.$apply(function () {
                                businessCardModal.deactivate();
                            });
                        }
                        $timeout(function(){
                            businessCardModal.activate({
                                userObject:scope.userObject,
                                left:X,
                                top:Y,
                                right:R,
                                offset:offset
                            })
                        },200);
                        //阻止事件传播
                        event.stopPropagation();
                    });
                }
            }
        }])
})(angular);
