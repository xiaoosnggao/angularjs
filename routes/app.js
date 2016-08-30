var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider

        .when('/', {//首页
            templateUrl: "./components/home/home.html",
            controller: 'home'
        })

        .when('/case', {//案例
            templateUrl: './components/case/case.html',
            controller: 'case'
        })

        .when('/caseInfo', {//案例详情
            templateUrl: './components/case/caseInfo.html',
            controller: 'caseInfo'
        })

        .when('/designer', {//设计师
            templateUrl: './components/designer/designer.html',
            controller: 'designer'
        })
        .when('/tribal', {//部落
            templateUrl: './components/tribal/tribal.html',
            controller: 'tribal'
        })

        .when('/userContent', {//我的
            templateUrl: './components/user/userContent.html',
            controller: 'userContent'
        })

        .when('/myOrder', {//我的订单
            templateUrl: './components/myOrder/myOrder.html',
            controller: 'myOrder'
        })
        .when('/backlog', {//待办事项
            templateUrl: './components/backlog/backlog.html',
            controller: 'backlog'
        })

        .when('/focusCollection', {//收藏关注
            templateUrl: './components/focusCollection/focusCollection.html',
            controller: 'focusCollection'
        })

        .when('/privateMessage', {//私信
            templateUrl: './components/privateMessage/privateMessage.html',
            controller: 'privateMessage'
        })

        .when('/systemMessage', {//系统消息
            templateUrl: './components/systemMessage/systemMessage.html',
            controller: 'systemMessage'
        })

        .otherwise({redirectTo: '/'});
}]);

//公用组件
app.directive("routerFooter", function ($location) {//footer
    return {
        templateUrl: './components/footer/footer.html',
        controller: function ($scope) {
            $scope.path = $location.$$path
        }
    };
});
app.directive("routerHeader", function () {//footer
    return {
        templateUrl: './components/header/header.html'
    };
});

//首页
app.controller('home', function ($scope) {
    $scope.message = '首页';//页面name
    $scope.homePosition = {cityName: "北京"};//定位地址
    //banner数据
    $scope.bannerData = [{'bannerImg': './static/images/wxc-banner.jpg'}, {'bannerImg': './static/images/wxc-banner.jpg'}, {'bannerImg': './static/images/wxc-banner.jpg'}];
    //预约数据
    $scope.homeReg = {
        userName: "",
        userTel: "",
        userRegion: "",
        userCity: "",
        userNum: "995212"
    };
    //产品数据
    $scope.homeProduct = [{
        productImg: "./static/images/wxc-product-img.png",
        productPrice: "699",
        productTitle: "超值无醛套餐",
        productDescribe: "全屋无醛装修，即装即住，全家安心"
    }, {
        productImg: "./static/images/wxc-product-img.png",
        productPrice: "699",
        productTitle: "超值无醛套餐2",
        productDescribe: "全屋无醛装修，即装即住，全家安心111111"
    }, {
        productImg: "./static/images/wxc-product-img.png",
        productPrice: "699",
        productTitle: "超值无醛套餐3",
        productDescribe: "全屋无醛装修，即装即住，3333"
    }];
    //banner渲染完成执行Slider.js
    $scope.isEnd = 0;
    $scope.homeIsEnd = function ($last) {
        if ($last) {
            $scope.isEnd++;
            if ($scope.isEnd >= 2) {
                Slider.newClass({
                    slide: document.querySelector(".slide"),
                    item: 0,
                    switch: true,
                    time: 3000
                });
            }
        }
    }
});

//案例
app.controller('case', function ($scope) {
    $scope.$on('$viewContentLoaded', function () {
        $scope.caseProduct = [{
            productHref: "#/caseInfo",
            productImg: "./static/images/wxc-product-img.png",
            productPrice: "699",
            productTitle: "超值无醛套餐",
            productDescribe: "全屋无醛装修，即装即住，全家安心",
            productDoor: "一居室 45㎡",
            isCollection: true,
            collectionNum: 999
        }, {
            productHref: "#/caseInfo",
            productImg: "./static/images/wxc-product-img.png",
            productPrice: "699",
            productTitle: "超值无醛套餐",
            productDescribe: "全屋无醛装修，即装即住，全家安心",
            productDoor: "一居室 45㎡",
            isCollection: false,
            collectionNum: 2
        }, {
            productHref: "#/caseInfo",
            productImg: "./static/images/wxc-product-img.png",
            productPrice: "699",
            productTitle: "超值无醛套餐",
            productDescribe: "全屋无醛装修，即装即住，全家安心",
            productDoor: "一居室 45㎡",
            isCollection: false,
            collectionNum: 10
        }];

        $(".wxc-head-select").sKongHeadSelect({
            eleL: $(".wxc-select-px"),
            eleShowL: $(".wxc-head-dq"),
            eleR: $(".wxc-selectSelect"),
            eleShowR: $(".wxc-cell-content")
        });

        //下拉加载
        downLoad.newClass({
            slide: document.querySelector(".scrollable"),//要滚动列表的父元素直接添加 class scrollable
            slideBoxClass: ".scrollable-box",//滚动的元素 scrollable-box
            type: "loading",
            refreshFn: function (num) {
                //刷新ajax
                var siRefresh = false;
                return true;
                //获取数据成功返回 siRefresh=true return siRefresh
                //获取数据失败返回 siRefresh=false return siRefresh
            },
            loading: function (num) {
                //加载ajax
                var siLoading = false;
                $.ajax();
                //获取数据成功 siLoading=true return siLoading
                //获取数据失败 siLoading=false return siLoading
                return true;
            }

        })
    });
});
app.controller('caseInfo', function ($scope) {

});


//设计师
app.controller('designer', function ($scope) {
    $scope.$on('$viewContentLoaded', function () {
        selectTouch.newClass({
            slide: $(".wxc-select-touch"),
            slideBox: $(".wxc-select-touch-warp"),
            sMain: $(".wxc-select-touch-warp .wxc-select-touch-b"),
            ele: $(".wxc-selectSelect"),
            item: 0
        });

        $(".wxc-head-select").sKongHeadSelect({
            eleL: $(".wxc-select-px"),
            eleShowL: $(".wxc-head-dq"),
            eleR: $(".wxc-selectSelect"),
            eleShowR: $(".wxc-cell-content")
        });
    });

});

//部落
app.controller('tribal', function ($scope) {
    $scope.$on('$viewContentLoaded', function () {

    });
});

//我的
app.controller('userContent', function ($scope) {
    $scope.$on('$viewContentLoaded', function () {

    });

});

//我的订单
app.controller('myOrder', function ($scope) {
    $scope.$on('$viewContentLoaded', function () {

    });

});

//待办事项
app.controller('backlog', function ($scope) {
    $scope.$on('$viewContentLoaded', function () {

    });

});

//私信
app.controller('privateMessage', function ($scope) {
    $scope.$on('$viewContentLoaded', function () {
        inputClear()
    });

});

//系统消息
app.controller('systemMessage', function ($scope) {
    $scope.$on('$viewContentLoaded', function () {
    });

});
