/**
 * 后台通用REST服务
 */
;(function (angular) {
    'use strict';

    /**
     * ms.service
     */
    angular.module('ms.service',[])
        .factory('topicService',['commonService',function(commonService){
            var service = {};
            service.getTopicList = function(url){
                return commonService.getMethod(url);
            };
            return service;
            // var service = commonService.getMethod('http://192.168.20.179:3000/statistics/data/user')
            //                     .then(function(data){
            //                         console.log("==========================");
            //                         console.log(data);
            //                         console.log("==========================");
                                    
            //                         return data.data;

            //                     });
            // return service;
            // service.date1 = commonService.getMethod('http://192.168.20.179:3000/statistics/data/expert');
            // service.date1 = commonService.getMethod('http://192.168.20.179:3000/statistics/data/topic/question');
            // service.date1 = commonService.getMethod('http://192.168.20.179:3000/statistics/data/topic/question');
            // service.date1 = commonService.getMethod('http://192.168.20.179:3000/statistics/data/topic/question');

            
        }])
        //分页
        .factory('bigPageService',function () {
            return function (total,page,limit){
                var pageList = [];
                var ignore = '...';
                var totalPage = Math.floor((total + limit -1) / limit);
                if(totalPage>11){
                    if(page>5){
                        for(var p=1;p<4;p++){
                            pageList.push(p);
                        }
                        pageList.push(ignore);
                        if(totalPage+1-page>5){
                            for(var p=page-2;p<page+3;p++){
                                pageList.push(p);
                            }
                            pageList.push(ignore);
                            for(var p=3;p>0;p--){
                                pageList.push(totalPage+1-p);
                            }
                        }else if(totalPage+1-page<5) {
                            for(var p=5;p>0;p--){
                                pageList.push(totalPage+1-p);
                            }
                        }else{
                            for(var p=7;p>0;p--){
                                pageList.push(totalPage+1-p);
                            }
                        }
                    }else if(page<5){
                        if(page+2>5){
                            for(var p=1;p<7;p++){
                                pageList.push(p);
                            }
                        }else{
                            for(var p=1;p<6;p++){
                                pageList.push(p);
                            }
                        }
                        pageList.push(ignore);
                        for(var p=3;p>0;p--){
                            pageList.push(totalPage+1-p);
                        }
                    }else{
                        for(var p=1;p<8;p++){
                            pageList.push(p);
                        }
                        pageList.push(ignore);
                        for(var p=3;p>0;p--){
                            pageList.push(totalPage+1-p);
                        }
                    }
                }else{
                    for(var p=1;p<totalPage+1;p++){
                        pageList.push(p);
                    }
                }
                //console.log(pageList);
                return pageList;
            };
        })
        .factory('TipService', function() {
            return {
                message : null,
                type : null,
                setMessage : function(msg,type){
                    this.message = msg;
                    this.type = type;
                    var _self = this;
                    $timeout(function(){
                        _self.clear();
                    },3000);
                },
                clear : function(){
                    this.message = null;
                    this.type = null;
                }
            };
            // return {
            //     experts : 
            //     [
            //         {
            //             fields:"软件工程",
            //             member:123,
            //             solo:[
            //                 {name:"张三",num:33},
            //                 {name:"李四",num:55},
            //                 {name:"王五",num:66},
            //             ]
            //         },
            //         {
            //             fields:"土木工程",
            //             member:234,
            //             solo:[
            //                 {name:"张三",num:33},
            //                 {name:"李四",num:55},
            //                 {name:"王五",num:66},
            //             ]
            //         },
            //         {
            //             fields:"艺术文化",
            //             member:345,
            //             solo:[
            //                 {name:"张三",num:33},
            //                 {name:"李四",num:55},
            //                 {name:"王五",num:66},
            //             ]
            //         },
            //         {
            //             fields:"法学",
            //             member:356,
            //             solo:[
            //                 {name:"张三",num:33},
            //                 {name:"李四",num:55},
            //                 {name:"王五",num:66},
            //             ]
            //         },
            //         {
            //             fields:"实用医学",
            //             member:456,
            //             solo:[
            //                 {name:"张三",num:33},
            //                 {name:"李四",num:55},
            //                 {name:"王五",num:66},
            //             ]
            //         },
            //         {
            //             fields:"地理科学",
            //             member:567,
            //             solo:[
            //                 {name:"张三",num:33},
            //                 {name:"李四",num:55},
            //                 {name:"王五",num:66},
            //             ]
            //         },
            //         {
            //             fields:"工程动力",
            //             member:678,
            //             solo:[
            //                 {name:"张三",num:33},
            //                 {name:"李四",num:55},
            //                 {name:"王五",num:66},
            //             ]
            //         },
            //         {
            //             fields:"汉语言",
            //             member:333,
            //             solo:[
            //                 {name:"张三",num:33},
            //                 {name:"李四",num:55},
            //                 {name:"王五",num:66},
            //             ]
            //         }
            //     ],
            //     topics :
            //     [
            //         {
            //             schoolName:"北京美育中学",
            //             topicName:["英国现当代小说赏析","美国现当代小说赏析","中国现当代小说赏析","俄罗斯现当代小说赏析"]
            //         },
            //         {
            //             schoolName:"成都美育中学",
            //             topicName:["英国现当代小说赏析","美国现当代小说赏析","中国现当代小说赏析","俄罗斯现当代小说赏析"]
            //         },
            //         {
            //             schoolName:"上海美育中学",
            //             topicName:["英国现当代小说赏析","美国现当代小说赏析","中国现当代小说赏析","俄罗斯现当代小说赏析"]
            //         },
            //         {
            //             schoolName:"天津美育中学",
            //             topicName:["美国现当代小说赏析","中国现当代小说赏析","俄罗斯现当代小说赏析"]
            //         }
            //     ]


            // };
        });
})(angular);