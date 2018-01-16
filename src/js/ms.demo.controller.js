/**
 * Created by Administrator on 2017/7/31.
 */

;(function (angular) {

    angular.module('ms.demo', [])
        .controller('ringCtrl', ['$scope', function ($scope) {
            var vm = this;
            vm.Navflag = null;
            $scope.$on('navigation',function(e,data){
                vm.Navflag = data;
            });
        }])
        .controller('ringACtrl', ['$scope', function ($scope) {
            $scope.$emit('navigation','ringA');
        }])
        .controller('issueACtrl', ['$scope','topicService',function ($scope,topicService) {
            var arr = new Array;
            topicService.getTopicList('http://192.168.20.179:3000/statistics/data/topic/question')
                .then(function(datas){
                    var questions = datas.data[1];
                    for(var i = 0; i < questions.length; i++){
                        arr.push({
                            'value':questions[i].question_school_total,
                            'name':questions[i].school_name});
                    }
                    $scope.data = arr;
                    $scope.counts = datas.data[0][0].question_total;
                });

        }])
        .controller('issueBCtrl', ['$scope','topicService',function ($scope,topicService) {
            //$scope.$emit('navigation','issueB');
            var vm = this;
            
            topicService.getTopicList('http://192.168.20.179:3000/statistics/data/topic/question')
            .then(function(datas){
                //console.log(datas);
                $scope.schools = datas.data[1];
                $scope.selectedItem = datas.data[1][0];
            });
        }])
        .controller('ringBCtrl', ['$scope','topicService', function ($scope,topicService) {
           $scope.$emit('navigation','ringB');
           var arr = new Array;
           topicService.getTopicList('http://192.168.20.179:3000/statistics/data/topic/share')
                .then(function(datas){
                    //console.log(datas);
                    var topics = datas.data[1];
                    for(var i = 0; i < topics.length; i++){
                        arr.push({
                            'value':topics[i].share_school_total,
                            'name':topics[i].school_name});
                    }
                    $scope.data = arr;
                    $scope.counts = datas.data[0][0].question_total;
                    // console.log("=============");
                    // console.log(topics);
                    // console.log("=============");
                    // console.log($scope.data);
                });

        }])
        .controller('shareACtrl', ['$scope','topicService',function ($scope,topicService) {
            
            topicService.getTopicList('http://192.168.20.179:3000/statistics/data/topic/share')
            .then(function(datas){
                //console.log(datas);
                $scope.counts = datas.data[0][0].question_total;
            });

        }])
        .controller('shareBCtrl', ['$scope','topicService',function ($scope,topicService) {
            var vm = this;
            //vm.selectedItem =vm.schools[0];
           
            topicService.getTopicList('http://192.168.20.179:3000/statistics/data/topic/share')
            .then(function(datas){
                $scope.schools = datas.data[1];
                $scope.selectedItem = datas.data[1][0];
            }); 
        }])
        
        .controller('NavCtrl', ['$scope', function ($scope) {
            var vm = this;
            vm.Navflag = null;
            $scope.$on('navigation',function(e,data){
                vm.Navflag = data;
            });
        }])
        .controller('NavACtrl', ['$scope','topicService',function ($scope,topicService) {
            $scope.$emit('navigation','NavA');
            $scope.legend = ["专家数", "回答问题数"];
            topicService.getTopicList('http://192.168.20.179:3000/statistics/data/expert')
            .then(function(datas){
                $scope.experts = datas.data[0][0].total;
                $scope.questions = datas.data[2][0]["sum\(c\.count\)"];
                $scope.data = [    
                    {value:datas.data[0][0].total, name:'专家数'},
                    {value:datas.data[2][0]["sum\(c\.count\)"],name:'回答问题数'}
                ];
            }); 
            
        }])
        .controller('NavBCtrl', ['$scope', 'topicService',function ($scope,topicService) {
            $scope.$emit('navigation','NavB');
            var vm = this;
            //vm.experts = TipService.experts;
            topicService.getTopicList('http://192.168.20.179:3000/statistics/data/expert')
                .then(function(datas){
                    //console.log(datas);
                    $scope.experts = datas.data[1];
                }); 
            
        }])
        .controller('NavCCtrl', ['$scope','topicService',function ($scope,topicService) {
            $scope.$emit('navigation','NavC');
            var arr = new Array;
            var arrName = new Array;
            topicService.getTopicList('http://192.168.20.179:3000/statistics/data/expert')
                .then(function(datas){
                    var experts = datas.data[3];
                    for(var i = 0; i < experts.length; i++){
                        arr.push({
                            'value':experts[i].count,
                            'name':experts[i].user_name});
                        arrName.push(experts[i].user_name);
                    }
                    $scope.data = arr;
                    $scope.legend = arrName;
                });
            
        }])
        .controller('tipCtrl', ['$scope', function ($scope) {
            var vm = this;
            vm.Navflag = null;
            $scope.$on('navigation',function(e,data){
                vm.Navflag = data;
            });
        }])
        .controller('tipACtrl', ['$scope','topicService',function ($scope,topicService) {
            $scope.$emit('navigation','tipA');
            
            $scope.legend = ["Web端用户注册", "移动端用户注册","校方导入"];      
            
            // $http({
            //     url:'http://192.168.20.179:3000/statistics/data/user',
            //     method:'GET'
            // }).then(function successCallback(res) {
            //     $scope.counts = res.data[1];
            //     console.log($scope.counts);
            // },function errorCallback(err) {
            //     console.log('失败');
            // });
            // console.log("=============");
            // console.log($scope.counts);
            // console.log("=================");
            topicService.getTopicList('http://192.168.20.179:3000/statistics/data/user')
                .then(function(datas){
                    //console.log(datas);
                    //$scope.counts = datas.data[1];
                    $scope.data = [    
                        {value:datas.data[1][1].count, name:'Web端用户注册'},
                        {value:datas.data[1][2].count,name:'移动端用户注册'}  ,
                        {value:datas.data[1][0].count,name:'校方导入'}    
                    ]; 
                    // $scope.data = [    
                    //     {value:111, name:'Web端用户注册'},
                    //     {value:222,name:'移动端用户注册'}  ,
                    //     {value:333,name:'校方导入'}    
                    // ];  
            });

            //console.log($scope.data);
            
            
            // $timeout(function() {
            //     console.log("=====");
            //     console.log($scope.counts1.count);
            //     console.log("=====");
            // },5000);

            // $scope.counts1.count = topicService.data.data[1][1];
            // console.log("==========");
            // console.log($scope.data);
            // console.log("==========");
             
            

            
        }])
        .controller('tipBCtrl', ['$scope','topicService',function ($scope,topicService) {
            $scope.$emit('navigation','tipB');
            topicService.getTopicList('http://192.168.20.179:3000/statistics/data/user')
                .then(function(datas){
                    //console.log(datas);
                    $scope.data = datas.data[2];
            });
            
        }])
        .controller('modalCtrl', ['$scope','topicService', function ($scope,topicService) {
            var vm = this;
            vm.Navflag = null;
            $scope.$on('navigation',function(e,data){
                vm.Navflag = data;
            });
            var arr = new Array;
            topicService.getTopicList('http://192.168.20.179:3000/statistics/data/research')
                .then(function(datas){
                    //console.log(datas);
                    var topics = datas.data[1];
                    for(var i = 0; i < topics.length; i++){
                        arr.push({
                            'value':topics[i].research_school_total,
                            'name':topics[i].school_name});
                    }
                    $scope.data = arr;
                    $scope.counts = datas.data[0][0].research_total;
                    // console.log("=============");
                    // console.log(topics);
                    // console.log("=============");
                    // console.log($scope.data);
                });

        }])
        .controller('topicBCtrl', ['$scope','topicService',function ($scope,topicService) {
            $scope.$emit('navigation','topicB');
            var vm = this;
            
            topicService.getTopicList('http://192.168.20.179:3000/statistics/data/research')
                .then(function(datas){
                    //console.log(datas);
                    $scope.topics = datas.data[1];
                });
        }]);
})(angular);
