'use strict';
var gulp = require('gulp'),
    del = require('del'),
    fileinclude = require('gulp-file-include'),
    browserSync = require('browser-sync').create();

// 清除 dist 文件夹
gulp.task('clean', function () {
    return del.sync('./app/dist');
});

// html 整合
gulp.task('html', function () {
    return gulp.src('./app/src/template/*.html')
    .pipe(fileinclude())
    .pipe(gulp.dest('./app/dist'));
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