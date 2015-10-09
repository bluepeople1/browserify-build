### 自动化构建工具
  
自动化构建工具基于几个模块开发：gulp, browserify, browsersync开发，主要实现基本的构建和开发，具体的推送方案暂时还没实现。

#### 注意事项

* 构建工具使用了sass，sass编译依赖于ruby，请移步[ruby官网](https://www.ruby-lang.org/zh_cn/)安装
* python 3.x的版本与2.x版本不兼容，请使用2.x的版本
* 如果不想使用sass, 请在gulpfile.js中

		gulp.task('default', ['clean', 'browserify', 'sass', 'wiredep', 'serve'], function () {
			gulp.watch("bower.json", ['wiredep']);
		});
		
		<!--改成下面的-->
			gulp.task('default', ['clean', 'browserify', 'wiredep', 'serve'], function () {
			gulp.watch("bower.json", ['wiredep']);
		});

* 若没有自动刷新，请执行`npm install -g browser-sync`, 如果安装没有成功，请继续执行以下操作，参照[browser-sync官网](http://www.browsersync.io/docs/#windows-users)

  * 安装 [Visual Studio 2013 Update 4](http://www.visualstudio.com/en-us/news/vs2013-update4-rc-vs.aspx)
  * 执行 `npm install -g browser-sync --msvs_version=2013`
 

#### 部署环境

* 代码仓库部署在gitlab上，请熟悉基本git操作并自行安装git
* 基于node的开发完成，如果还没有装node，请移步[node官网](https://nodejs.org/)进行下载安装，具体过程略过。
* 进入当前目录，启动命令行，输入`npm start`
* 如果安装失败，应该是npm源被公司屏蔽了，可以选择切换成国内的源，可以输入`npm config set registry https://registry.npm.taobao.org `；
* 看到这里，那么恭喜环境已经搭好了

#### gulp构建

* 上面是第一次安装时，会默认安装依赖模块，其中`npm start`指令是下面四个指令的集合
  * `npm install -g bower gulp` 全局安装`gulp` `bower`
  * `npm install` 安装`package.json`中指定的依赖模块
  * `bower install` 安装`bower`指定的依赖
  * `gulp default`启动`gulp`服务器
  

#### 结构

 * 整个文件一共有4个文件夹目录，其中app为我们的开发文件夹，所有开发代码建议都同意保存在app下，build文件夹为开发工具构建后的文件夹，任何情况下都不建议去修改该文件夹下地东西，node_modules为npm依赖模块的文件夹，属于库文件，绝不允许修改(node_modules已经被添加到.gitignore中,避免提交到git仓库中)，bower_components为bower安装的库文件，也不允许修改
 * `npm start`命令只是在第一次git clone后执行，后面的开发中，并不需要重复执行`npm build`, 只需要执行`gulp`就好
 * 开发时，请在命令行中输入：`gulp`, 然后会启动服务器，并在浏览器中打开。
 * 当开发结束后，请输入`gulp build --production`, 工程会自动构建。
 
