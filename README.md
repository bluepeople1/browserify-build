### browserify-build
	
使用`browserify-build`,可用避免工作目录有多余的`gulpfile.js`和相应的`node_moudles`文件。同时也避免了当存在多个工作目录时，么个目录都需相应的gulp文件。


#### 安装

 * `npm install -g browserify-build`, 安装到全局变量，便于使用
 
#### 用法
 	
 	browserify-build init 
 	   在工作目录执行，将会自动创建一个简单可用的demo
 	   
 	browserify-build config
 		如已经存在工作目录，则执行该命令，创建：build.conf.json文件
 	
 	browserify-build start
 		根据工作目录下的build.conf.json，进行相应编译部署
 	
 	broserify-build build
 		开始进行构建。


 
