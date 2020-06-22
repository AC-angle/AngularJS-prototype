/**
 * --------------------------------------
 * 模块定义
 * --------------------------------------
 */

// 自定义扩展模块
var libapp = angular.module("ui.libraries", []);

// 控制器模块
var ctrlapp = angular.module("ui.ctrl", []);

//主模块定义（同时引入需要的模块）
var startapp = angular.module("startApp", ['ui.router', 'ui.libraries', 'ui.ctrl']);

/**
 * --------------------------------------
 * 模块启动
 * --------------------------------------
 */
//主模块
startapp.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', "$compileProvider", "$filterProvider", "$provide", function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
  "use strict";

  //定义需要使用的方法
  ctrlapp.register = {
    controller: $controllerProvider.register,
    directive: $compileProvider.directive,
    filter: $filterProvider.register,
    factory: $provide.factory,
    service: $provide.service
  };

  //异步加载控制器文件
  startapp.asyncjs = function (js) {
    return ['$q', function ($q) {

      var delay = $q.defer(),
        load = function () {
          window.$.getScript(js, function () {
            delay.resolve();
          });
        };
      load();
      return delay.promise;
    }];
  };

  /**
   * --------------------------------------
   * 定义路由
   * --------------------------------------
   */

  var addToken = function (url) {
    return url + "?_=" + new Date().valueOf();
  };

  $stateProvider

    // 输入控制类指令
    .state("InputCtrlDirectives", {
      url: "/InputCtrlDirectives",
      templateUrl: addToken("htmls/inputCtrl@Directives/mod.html"),
      resolve: {
        delay: startapp.asyncjs('htmls/inputCtrl@Directives/mod.js')
      },
      controller: "InputCtrlDirectivesController"
    })

    // 金额类过滤器
    .state("MoneyFilters", {
      url: "/MoneyFilters",
      templateUrl: addToken("htmls/money@Filters/mod.html"),
      resolve: {
        delay: startapp.asyncjs('htmls/money@Filters/mod.js')
      },
      controller: "MoneyFiltersController"
    })

    // 日期或时间类组件
    .state("TimeComponents", {
      url: "/TimeComponents",
      templateUrl: addToken("htmls/time@Components/mod.html"),
      resolve: {
        delay: startapp.asyncjs('htmls/time@Components/mod.js')
      },
      controller: "TimeComponentsController"
    })

    // 日期或时间类过滤器
    .state("TimeFilters", {
      url: "/TimeFilters",
      templateUrl: addToken("htmls/time@Filters/mod.html"),
      resolve: {
        delay: startapp.asyncjs('htmls/time@Filters/mod.js')
      },
      controller: "TimeFiltersController"
    });

  $urlRouterProvider.otherwise("/InputCtrlDirectives");

}]).run(['$rootScope', '$state', function ($rootScope, $state) {

  "use strict";

  // 路由跳转
  $rootScope.goto = function (state) {
    $state.go(state);
  };

}]);