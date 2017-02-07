# webpack-tool

前端工程自动化构建工具，解决前端开发中自动化工具、模块化框架、开发规范、代码部署、开发流程等问题

### 谁使用webpack-tool
[平安科技 官方网站](http://tech.pingan.com)  
2password Web版

### 特点  
- 固定的开发规范，代码调试与构建一步到位，让用户更专注于功能开发  
- 模块化开发，提供了ModJS模块化方案让用户无需关注模块化方案细节，只需像NodeJS一样简单的声明模块依赖便能轻松完成模块化工作
- 使用webpack-dev-middleware中间件，本地调试不生成资源，不占用硬盘空间
- 支持`<!--#Include virtual="..." -->`语法引入模板  
- 支持正则匹配替换静态资源  
- 时间戳版本号


### 目录结构
-config  配置目录  
-src  项目根目录  
&emsp;-entry  入口目录  
&emsp;-inc  模板目录  
&emsp;-m    手机版目录  
&emsp;-assets  资源源文件目录  
-dist  构建目录  

### 开始
1、`npm install`  
2、运行`npm run dev`，访问`127.0.0.1:8080`，进行本地开发调试  
3、运行`npm run build`，`dist`目录为构建目录

### 开发说明
1、src目录为项目根目录，里面的源文件可以通过绝对路径或相对路径引用到所需资源。  
2、entry目录支持CommonJS语法，使用require("...")来导入css和js资源。  
3、html源文件请引用入口目录（entry文件夹）里的文件。  
4、html和shtml都支持`<!--#include virtual="..." -->`语法引用模板文件。  
5、可以修改config目录的配置文件进行自定义配置  
5、未完待续
