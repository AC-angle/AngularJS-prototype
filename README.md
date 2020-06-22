# AngularJS 原型
🎯 基于Angular JS搭建的原型项目。

- 主分支master用于维护常用的组件、指令和过滤器等，其余分支为各个版本的原型，比如手机端、移动端和通用Grunt版本等。

- 如果你希望在此维护自己的分支可以告知我们加入[AC-angle](https://github.com/AC-angle)，分支名字请以自己的名称开头。

## 贡献者

- [心叶](https://github.com/yelloxing)（yelloxing@gmail.com）

## 项目说明

首先看看目录结构：

    - build 打包后的公共JS和CSS文件，用于生产环境
    - htmls 交易代码主要在这里开发
    - images 图片资源
    - libs 公共的JS一般存放在这里
      - min 一般存放angular、jquery等最基本的公共第三方JS
      config.js 项目启动入口，包括路由、请求等配合和公共方法等（备注：当然可以拆分成多个文件）
      preload.js 帮忙加载资源的，用于开发环境
    - styles 样式CSS文件
    .csslint css语法校验规则
    .jshintrc js语法校验规则
    Gruntfile.js 打包插件Grunt.js配置文件
    index.html 项目入口（这里打开以后会首先运行项目启动入口）
    jshint.debug.txt js语法校验结果（css的会直接打印在控制台）
    package.json 项目信息，依赖的包和脚本都配置文件

接着我们来说说项目启动过程：

首先，会从config.js开始执行，前面说了，这是启动入口，在这里主要就干了二件事：

- 使用```angular.module```方法定义模块:不同模块拥有不同功能，可以设置依赖关系，主模块只有一个，也就是项目入口```index.html```中```<XXX ng-app="startApp">```定义的，表示框架对这块区域进行管理。
- 配置模块：$rootScope上的方法，路由等都属于配置模块

模块定义并配置好以后，在本项目中是设置的自动启动（手动启动：angular.bootstrap(XXX,['startApp']);}），也就是```ng-app="startApp"```这段代码。

启动过程为了方便理解，可以划分成二步：

- 第一步：挂载公共的指令，过滤器，服务等
- 第二步：解析控制区域模板并生效：简单的理解就是框架理解管理区域有什么，然后让你写的生效（比如你用了某个指令，那就根据你定义的指令，生效等）

以上就大概是全部了，只不过上面的启动过程，其实是不断重复的过程，比如打开新的页面，会挂载新的控制器，然后解析模板并生效，如此往复，直至网页关闭。

## License

[MIT](https://github.com/AC-angle/AngularJS-prototype/blob/master/LICENSE)

Copyright (c) 2020 AC-angle