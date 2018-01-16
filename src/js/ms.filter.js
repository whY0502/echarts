/**
 * 通用过滤器
 */
;(function (angular) {
    'use strict';

    var format = function(time, format){
        var t = new Date(time);
        var tf = function(i){return (i < 10 ? '0' : '') + i};
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
            switch(a){
                case 'yyyy':
                    return tf(t.getFullYear());
                    break;
                case 'MM':
                    return tf(t.getMonth() + 1);
                    break;
                case 'mm':
                    return tf(t.getMinutes());
                    break;
                case 'dd':
                    return tf(t.getDate());
                    break;
                case 'HH':
                    return tf(t.getHours());
                    break;
                case 'ss':
                    return tf(t.getSeconds());
                    break;
            }
        })
    };
    /**
     * ms.filter
     */
    angular.module('ms.filter',[])
        //过滤器：将文本数据以html格式输出
        .filter('trustHtml', ['$sce', function ($sce) {
            return function (input) {
                return $sce.trustAsHtml(input);
            }
        }])
        //副文本框格式化换行符
        .filter('textAreaHtml', ['$sce', function ($sce) {
            return function (input) {
                if(input){
                    input = input.toString().replace(/\n/g, '<br />');
                }
                return $sce.trustAsHtml(input);
            }
        }])
        //搜索关键字，高亮搜索条件
        .filter('highLightWords', ['$sce', function ($sce) {
            return function (input,param) {
                if(param && input){
                    /**
                     /i (忽略大小写)
                     /g (全文查找出现的所有匹配字符)
                     /m (多行查找)
                     /gi(全文查找、忽略大小写)
                     /ig(全文查找、忽略大小写)
                     */
                    input = input.toString().replace(new RegExp(param,"gi"),'<attr style="color:red">'+param+'</attr>');
                }
                return $sce.trustAsHtml(input);
            }
        }])
        .filter('timesFormat',function(){
            return function (data){
                var date1 = new Date(data); //开始时间
                var now = new Date();    //结束时间
                var date3 = new Date(date1.getFullYear()+"/"+(date1.getMonth()+1)+"/"+date1.getDate());
                var today = new Date(now.getFullYear()+"/"+(now.getMonth()+1)+"/"+now.getDate());
                var times = today.getTime() - date3.getTime();  //时间差的毫秒数
                //计算出相差天数
                var days = times/86400000;
                var HH = date1.getHours()<10?'0'+date1.getHours()+':':date1.getHours()+':';
                var mm = date1.getMinutes()<10?'0'+date1.getMinutes():date1.getMinutes();
                if(days==0){
                    return '今天 '+HH+mm;
                }
                if(days==1){
                    return '昨天 '+HH+mm;
                }
                if(days>1){
                    var y = (date1.getFullYear()!=now.getFullYear())?date1.getFullYear()+'-':'';
                    var MM = (date1.getMonth()+1)<10?'0'+(date1.getMonth()+1)+'-':(date1.getMonth()+1)+'-';
                    var dd = date1.getDate()<10?'0'+date1.getDate()+' ':date1.getDate()+' ';

                    return y+MM+dd+HH+mm;
                }
            }
        })
        //日期格式化
        .filter('format_date', function () {
            return function (data) {
                var date1 = new Date(data); //开始时间
                var date2 = new Date();    //结束时间
                var date3 = date2.getTime() - date1.getTime();  //时间差的毫秒数
                //计算出相差天数
                var days = Math.floor(date3 / (24 * 3600 * 1000));
                //计算出小时数
                var leave1 = date3 % (24 * 3600 * 1000);   //计算天数后剩余的毫秒数
                var hours = Math.floor(leave1 / (3600 * 1000));
                //计算相差分钟数
                var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
                var minutes = Math.floor(leave2 / (60 * 1000));
                //计算相差秒数
                var leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
                var seconds = Math.round(leave3 / 1000);
                if (days > 0 && days <= 3) return days + '天前';
                else if (hours > 0) {
                    return hours + '小时前';
                } else if (minutes > 0) {
                    return minutes + '分钟前'
                } else {
                    return '刚刚';
                }
            }
        })
        .filter('getUserImgByLink', function () {
            return function (user) {
                var imgStr = "";
                if (user && user.links && user.links.length > 0) {
                    imgStr = user.links[0].href
                } else {
                    imgStr = 'img/b_photo.png';
                }
                return imgStr;
            }
        })
        .filter('showUserPhoto', ['$sce',function ($sce) {
            return function (user) {
                var imgStr = "";
                var userName = user.userName;
                if (user && user.links && user.links.length > 0) {
                    imgStr = user.links[0].href;
                } else {
                    //默认返回MM
                    if(userName == null || userName.length == 0){
                        imgStr = 'MM';
                    }else{
                        //charCodeAt() 返回0 ~ 65535之间的整数，即位于指定位置的字符unicode编码
                        //charAt() 返回字符子串

                        //取倒数第一个字符
                        var code1 = userName.charCodeAt(userName.length - 1);
                        //判断字母的unicode编码取值区间
                        if((code1 >= 0x0001 && code1<= 0x007e) || (0xff60<=code1 && code1<= 0xff9f)){
                            if(userName.length > 1){//倒数第一的字符是字母，则继续取倒数第二个字符判断
                                var code2 = userName.charCodeAt(userName.length - 2);
                                //如果倒数第二个字符也是字母，则返回倒数一二个字符组成的字符串
                                if((code2 >= 0x0001 && code2<= 0x007e) || (0xff60<=code2 && code2<= 0xff9f)){
                                    imgStr = userName.charAt(userName.length - 2) + userName.charAt(userName.length - 1);
                                }else{//如果倒数第二个字符不是字母，则只返回倒数第一个字母
                                    imgStr = userName.charAt(userName.length - 1);
                                }
                            }else{//userName只由一个字母组成
                                imgStr = userName.charAt(userName.length - 1);
                            }
                            //返回结果大写格式化
                            imgStr = imgStr.toUpperCase();
                        }else{//返回一个中文汉字
                            imgStr = userName.charAt(userName.length - 1);
                        }
                    }
                }
                return imgStr;
            }
        }])
        .filter('getResourceType',function(){
            return function(type) {
                if (type == 'mp4') {
                    return 'video/mp4';
                } else if(type == 'pdf') {
                    return 'application/pdf';
                } else if(type == 'excel'){
                    return 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                }else if(type == 'word'){
                    return 'application/msword,' +
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.template,' +
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                }else if(type == 'ppt'){
                    return 'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation';
                }
            }
        })
        .filter('formatTargetContent',function(){
            return function (content){
                return content.replace(/z-j-m-y-m-o-o-r-s/g,'// ');
            }
        });
})(angular);