'use strict';
var gulp = require('gulp'),
    del = require('del'),
    gulpLoadPlugins  =  require('gulp-load-plugins'),
    del= require('del'),
    stream = require('wiredep'),
    fileinclude = require('gulp-file-include'),
    browserSync = require('browser-sync').create();

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const styles = {
    'in': 'assets/stylesheets/**/*.scss',
    'tmp': '.tmp/css'
};
const scripts = {
    'in': 'assets/javascripts/**/*.js',
    'tmp': '.tmp/js',
    'out': 'dist/js'
};
const lint = {
    'in': 'assets/javascripts/**/*.js'
};
const html = {
    'in': 'assets/*.html',
    'out': 'dist'
};
const images = {
    'in': 'assets/images/**/*',
    'out': 'dist/images'
};
const fonts = {
    'in': ['assets/fonts/bootstrap/*'],
    'tmp': '.tmp/fonts',
    'out': 'dist/fonts'
};
const extras = {
    'in': [
        'assets/*.*',
        '!assets/*.html'
    ],
    'out': 'dist'
};
const serve = {
    'baseDir': ['.tmp', 'assets'],
    'baseDirDist': ['dist'],
    'routes': {
        '/bower_components': 'bower_components'
    },
    'port': 9000
};
const build = {
    'in': 'dist/**/*'
};
const wire = {
    'in': 'assets/*.html',
    'out': 'dist'
};

// 清除 dist 文件夹
gulp.task('clean', function () {
    return del.sync('./app/dist');
});

// html 整合
gulp.task('html', function () {
    return gulp.src('./app/src/template/*.html')
    .pipe(fileinclude())
    .pipe(gulp.dest('./app/dist'))
    .pipe(reload({stream: true}));;
});

// 配置服务器
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './app/dist'
        },
        port: 8000
    });
    // 监听 html
    gulp.watch('./app/src/template/**/*.html', ['html']).on('change', browserSync.reload);
});

gulp.task('default', ['clean', 'html', 'serve']);