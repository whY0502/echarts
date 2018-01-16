/**
 * 定义项目资源打包的配置项
 */
'use strict';

let path = require('path');
let os = require('os');

let tmp_css = path.join(os.tmpdir(), 'moor', 'css');
let tmp_js = path.join(os.tmpdir(), 'moor', 'js');

let config = {
    GLOBS: {
        moorJs: [
            'src/js/ms.config.js',
            'src/js/ms.run.js',
            'src/js/ms.scrollable.js',
            'src/js/ms.directive.js',
            'src/js/ms.filter.js',
            'src/js/ms.interceptor.js',
            'src/js/ms.modal.side.js',
            'src/js/ms.modal.js',
            'src/js/ms.sweetalert.js',
            'src/js/ms.service.js',
            'src/js/ms.commonService.js',
            'src/js/ms.controller.js',
            'src/js/ms.demo.controller.js',
            'src/js/ms.app.js'
        ],
        copyHtml: ['src/**/**/*.html'],
        copyImg: ['src/img/**/**/*'],
        copyAngularJs: [
            'bower_components/sweetalert/dist/sweetalert.min.js',
            'bower_components/angular-auto-validate/dist/jcs-auto-validate.js',
            'bower_components/angular-touch/angular-touch.min.js',
            'bower_components/angular-loading-bar/build/loading-bar.min.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-resource/angular-resource.min.js',
            'bower_components/angular-sanitize/angular-sanitize.min.js',
            'bower_components/v-modal/dist/v-modal.min.js',
            'bower_components/angularjs-datepicker/dist/angular-datepicker.min.js',
            'bower_components/angular-i18n/angular-locale_zh-cn.js',
            'bower_components/echarts/dist/echarts.min.js',
            'bower_components/angular-echarts/dist/angular-echarts.js'
        ],
        copyJs: [
            'bower_components/angular/angular.min.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/angular-sanitize/angular-sanitize.min.js'
        ],
        copyFonts: [
            'bower_components/font-awesome/fonts/*.*',
            'bower_components/Ionicons/fonts/*.*'
        ],
        vendorLess: [path.resolve(__dirname, 'src/less')],
        cssTempDir: tmp_css,
        cssTempDir_JS: tmp_js,
        cssConcat: [
            path.join('bower_components/bootstrap/dist/css', 'bootstrap.min.css'),
            path.join('bower_components/Ionicons/css', 'ionicons.min.css'),
            path.join('bower_components/font-awesome/css', 'font-awesome.min.css'),
            path.join(tmp_css, 'moor.temp.min.css'),
            path.join('src/less', 'angular-datepicker.css'),
            path.join('src/less', 'sweetalert.css'),
            path.join('src/less', 'v-modal.css'),
            path.join('src/less', 'loading-bar.css')
        ],
        compileJs: [
            path.join(tmp_js, 'angular.min.js'),
            path.join(tmp_js, 'angular-ui-router.min.js'),
            path.join(tmp_js, 'moor.mobile.min.js'),
            path.join(tmp_js, 'moor.plug-in.min.js'),
            path.join(tmp_js, 'moor.min.js')
        ],
        watch_less:['src/less/**/*.less']
    }
};

module.exports = config;