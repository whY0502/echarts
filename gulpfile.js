'use strict';
/*===================================================================================
=            装载工具		            =
====================================================================================*/
var config          = require('./config.js');                   //配置文件
var gulp 			= require('gulp'),							//基础库
	concat 			= require('gulp-concat'),					//文件合并
	connect 		= require('gulp-connect'),					//web服务
	csso 			= require('gulp-csso'),						//css压缩
	clean 			= require('gulp-clean'),					//清空文件夹
	jshint 			= require('gulp-jshint'),					//js检查
	less 			= require('gulp-less'),						//less编译
	minifyCss       = require('gulp-clean-css'),                //压缩css
	mobilizer 		= require('gulp-mobilizer'),				//伪类hover剥离器
	path 			= require('path'),							//文件路径
	protractor 		= require('gulp-protractor').protractor,	//测试
	releaseTasks 	= require('gulp-release-tasks'),			//关联任务
	rename 			= require('gulp-rename'),					//文件重命名
	os 				= require('path-os'),						//系统临时路径
	fs 				= require('fs'),							//fs
	seq 			= require('run-sequence'),					//顺序处理任务
	sourcemaps 		= require('gulp-sourcemaps'),				//sourcemaps
	uglify 			= require('gulp-uglify'),     				//js压缩
	war				= require('gulp-war'),						//打包web项目
	zip				= require('gulp-zip'),						//压缩成zip文件
	htmlmin         = require('gulp-htmlmin'),                  //压缩html
	stripDebug      = require('gulp-strip-debug'),              //去掉console.log
	rev             = require('gulp-rev'),                      //静态资源MD5版本控制
	revCollector    = require('gulp-rev-collector'),            //动态绑定版本
    spritesmith     = require('gulp.spritesmith'),              //制作雪碧图
    browserSync     = require('browser-sync').create();         //同步浏览器

/*==================================================================================
=         抛出异常信息              =
===================================================================================*/
gulp.on('error', function(e) {
	throw (e);
});

/*==================================================================================
=        清除dist文件夹内容   =
===================================================================================*/
gulp.task('clean:dist',function(){
	return gulp.src('dist',{read: false})
		.pipe(clean());
});
gulp.task('clean:css',function(){
	return gulp.src('src/css',{read: false})
		.pipe(clean());
});
gulp.task('clean',function(done){
	seq('clean:css','clean:dist',done);
});

/*==================================================================================
=             web服务地址端口                  =
===================================================================================*/


/*=================================================================================
 * 			   复制view、html          =
 *===============================================================================*/
gulp.task('copy:img',function(){
	return gulp.src(config.GLOBS.copyImg)
		.pipe(gulp.dest(path.join('dist/app', 'img')));
});
gulp.task('copy:html',function(){
	return gulp.src(config.GLOBS.copyHtml)
		.pipe(gulp.dest(path.join('dist', 'app')));
});

/*==================================================================================
=            复制 fonts、css、js            =
===================================================================================*/
gulp.task('copy:fonts', function() {
    return gulp.src(config.GLOBS.copyFonts)
        .pipe(gulp.dest(path.join('dist/app', 'fonts')));
});
gulp.task('copy:js', function() {
	return gulp.src(config.GLOBS.copyJs)
        .pipe(gulp.dest(config.GLOBS.cssTempDir_JS));
});

gulp.task('copyRequire', function(done){
	seq('copy:fonts','copy:js','copy:img','copy:html',done);
});

/*================================================================================
=            编译less、合并css、复制压缩css                            =
=================================================================================*/
gulp.task('css:less', function() {
	return gulp.src([
			'src/less/app.less'
		])
		.pipe(less({
			paths: config.GLOBS.vendorLess
		}))
		.pipe(mobilizer('app.css', {
			'moor.css': {
				hover: 'exclude',
				screens: ['0px']
			},
			'moor-hover.css': {
		      hover: 'only',
		      screens: ['0px']
		    }
		}))
		.pipe(concat('moor.temp.min.css'))
		.pipe(minifyCss({debug: true}, function(c) {
            console.log(c.name + ': ' + c.stats.originalSize + " ~ " + c.stats.minifiedSize);
        }))
		.pipe(gulp.dest(config.GLOBS.cssTempDir));
});
gulp.task('css:concat', function() {
	return gulp.src(config.GLOBS.cssConcat)
		.pipe(concat('moor.css'))
		.pipe(sourcemaps.init())
        .pipe(csso())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.GLOBS.cssTempDir));
});

gulp.task('css',function(done){
	seq('css:less','css:concat', done);
});

/*==============================================================================
=            编译压缩js生成source maps            =
===============================================================================*/
var compileJs = function(dest, src) {
	return gulp.src(src)
	    // .pipe(stripDebug())
        .pipe(sourcemaps.init())
		.pipe(concat(dest))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.GLOBS.cssTempDir_JS));
};
var concatJs = function(dest, src) {
	return gulp.src(src)
	    // .pipe(stripDebug())
		.pipe(sourcemaps.init())
		.pipe(concat(dest))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.GLOBS.cssTempDir_JS));
};
gulp.task('angularJs', function() {
	return concatJs('moor.mobile.js', config.GLOBS.copyAngularJs);
});
gulp.task('moorJs', function() {
	return compileJs('moor.js', config.GLOBS.moorJs);
});

gulp.task('compileJs',function(){
    return compileJs('MOORs.js',config.GLOBS.compileJs)
});

gulp.task('js',function(done){
	seq('angularJs','moorJs','compileJs',done);
});

/*============================================================================
=            监听代码改变，并重新建构            =
=============================================================================*/
gulp.task('watchCss',function(done){
    seq('css','copyTempCss',done);
});
gulp.task('watchJs',function(done){
    seq('moorJs','compileJs','copyTempJs',done);
});
gulp.task('watchJsCopy',function(done){
    seq('copy:js','copyTempJs',done);
});

gulp.task('watch', function() {
	gulp.watch(config.GLOBS.watch_less, ['watchCss']);
	gulp.watch(config.GLOBS.moorJs, ['watchJs']);
	gulp.watch(config.GLOBS.copyJs,['watchJsCopy']);
	gulp.watch(config.GLOBS.copyImg, ['copy:img']);
	gulp.watch(config.GLOBS.copyHtml, ['copy:html']);
	gulp.watch(config.GLOBS.fonts, ['fonts']);
});

/*===========================================================================
=            Build 一序列任务            ='war',
===========================================================================*/
gulp.task('build',['clean'],function(done) {
    /**
     * 生产环境打包
     */
    //seq('copyRequire','css','js','rev','war', done);
    /**
     * 开发环境打包
     */
    seq('copyRequire','css','js','copyTempDir', done);
});

/*===========================================================================
 =            开发环境下静态资源的拷贝            =
 ===========================================================================*/
gulp.task('copyTempCss',function(){
    return gulp.src([
            path.join(config.GLOBS.cssTempDir, "*.css")
        ])
        .pipe(gulp.dest(path.join('dist/app','css')));
});
gulp.task('copyTempJs',function(){
    return gulp.src([
            path.join(config.GLOBS.cssTempDir_JS, "*.js")
        ])
        .pipe(gulp.dest(path.join('dist/app','js')));
});
gulp.task("copyTempDir",function(done){
    seq('copyTempCss','copyTempJs',done);
});

/*===========================================================================
=            war 打包web项目            =
===========================================================================*/
gulp.task('war', function () {
    gulp.src(["dist/app/**"])
        .pipe(war({
            welcome: 'main.html',
            displayName: 'app'
        }))
        .pipe(zip('moor.war'))
        .pipe(gulp.dest("./dist"));
});

/*==========================================================================
=            默认任务 Task            =
===========================================================================*/
gulp.task('default',function(done) {
	var tasks = [];
	tasks.push('watch');
	seq('build',tasks, done);
});


/*============================================================================
 =            静态资源版本控制MD5摘要信息            =
 =============================================================================*/

revStatic('rev:css',config.GLOBS.cssTempDir,'*.css','css','rev/css');
revStatic('rev:js',config.GLOBS.cssTempDir_JS,'*.js','js','rev/js');

function revStatic(taskName,src,match,dest,revDest){
    gulp.task(taskName,function(){
        return gulp.src([path.join(src, match)])
            .pipe(rev())
            .pipe(gulp.dest(path.join('dist/app',dest)))
            .pipe(rev.manifest({merge: true}))
            .pipe(gulp.dest(path.join('dist/app', revDest)));
    })
}
gulp.task('rev',function(done){
    seq('rev:css','rev:js','rev-html','rev-view',done);
});

/*=========================================
 =            html引入含文件摘要编码的资源
 =========================================*/
revHtml('rev-html','src/*.html','');
revHtml('rev-view','src/view/**/**','view');

function revHtml(taskName,srcPath,desPath){
    gulp.task(taskName,function(){
        return gulp.src(['dist/app/rev/**/**.json',srcPath])
            .pipe(revCollector({
                replaceReved: true,
                dirReplacements: {
                    'css': 'css',
                    'js': 'js'
                }
            }))
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe( gulp.dest(path.join('dist/app',desPath)));
    });

}

/*=========================================================================
=            js检查            =
==========================================================================*/
gulp.task('jshint', function() {
	var jshintrc = JSON.parse(fs.readFileSync('.jshintrc').toString());
	jshintrc.lookup = false;
	jshintrc.nocomma = false;
	return gulp.src(['src/js/**/*.js'])
		.pipe(jshint(jshintrc))
		.pipe(jshint.reporter('default'))
		.on('error', function(e) {
			throw e;
		});
});

/*=========================================================================
=            测试                         =
==========================================================================*/
gulp.paths = {
    demo : 'dist/app'
};
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir : gulp.paths.demo,
            index : 'index.html',
            routes: {
                "/bower_components": "bower_components"
            }
        },
        startPath: '/',
        files : gulp.paths.demo + '/*.*',
        port : 9002
    });
    gulp.watch( gulp.paths.demo + "/*.*").on('change', browserSync.reload);
});
gulp.task('serve' , function(done){
	seq('build','browser-sync',done);
});

/*=========================================================================
=            释放	            =
==========================================================================*/
releaseTasks(gulp);