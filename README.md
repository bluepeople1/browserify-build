### browserify-build
	
使用`browserify-build`,可用避免工作目录有多余的`gulpfile.js`和相应的`node_moudles`文件。同时也避免了当存在多个工作目录时，么个目录都需相应的gulp文件。


#### 安装

 * `npm install -g browserify-build`, 安装到全局变量，便于使用
 
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



 
