angular.module('app', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {template: '这是首页页面'})
            .when('/case', {template: 'case'})
            .when('/demand', {template: 'demand'})
            .when('/tribal', {template: 'tribal'})
            .when('/userContent', {template: 'userContent'})
            .otherwise({redirectTo: '/'});
    }]);
// <a href="#/" class="skong-nav-home skongwx-nav-content"><i class="skongwx-icon skongwx-icon-home"></i>首页</a>
//     <a href="#/case" class="skong-nav-home skongwx-nav-content"><i class="skongwx-icon skongwx-icon-case"></i>案例</a>
//     <a href="#/demand" class="skong-nav-home skongwx-nav-content"><i class="skongwx-icon skongwx-icon-designer"></i>设计师</a>
//     <a href="#/tribal" class="skong-nav-home skongwx-nav-content"><i class="skongwx-icon skongwx-icon-tribal"></i>部落</a>
//     <a href="#/userContent" class="skong-nav-home skongwx-nav-content"><i class="skongwx-icon skongwx-icon-me"></i>我的</a>
