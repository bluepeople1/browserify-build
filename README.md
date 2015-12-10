### browserify-build
	
使用`browserify-build`,可用避免工作目录有多余的`gulpfile.js`和相应的`node_moudles`文件。同时也避免了当存在多个工作目录时，么个目录都需相应的gulp文件。


#### 安装

 * `npm install -g browserify-build`, 安装到全局变量，便于使用
 * 全局安装后，可以避免冗余的`gulpfile.js`，只需要一份`build.conf.json`就可以执行整个构建工具，类似于`webpack`

#### 功能
 * 支持es6, react, sass
 * 基于browser-sync的服务器，支持自动刷新, 多终端同步，远程调试，css注入
 * 基于`browseriry`构建，bundle参数放在`build.conf.json`的`browserify.bundleConfigs`数组中
 * 支持显示`require('**.html')`, 无须使用`html2js`进行转换。
 


#### 用法
 	
 	* browserify-build config 
 	   创建build.conf.json配置文件
 	   
 	* brosserify-build init
 	   创建可用的一个demo
 	   
 	* browserify-build clone
 		clone相应的gulp task，以便自行修改
 	
 	* browserify-build start
 		类似执行gulp dev
 	
 	* browserify-build build
 	    构建，类似执行gulp build
 
#### config参数说明

 * `app`默认的开发目录
 * `build`构建目录，每次执行`browserify-build build`，都会自动清空该目录然后重新生成最终代码
 * `scripts`js代码目录
 * `styles`css或sass代码目录
 * `port`端口号，启动服务器的端口号，如果该端口已经被占用，则默认使用`port + 1`的端口
 * `https`指定服务器是否开启https，默认为`false`
 * `proxy`是否开启代理，默认为`false`，如果想用代理，则填入代理地址如`http://localhost:8000`
 * `browserify` browserify的构建参数，其中`bundleConfigs`为指定的构建数组
   * `entries` 入口文件
   * `dest` 开发时打包之后的存放地址
   * `build` 最终构建时存放的地址
   * `outputName` 打包文件的名字
 



 
