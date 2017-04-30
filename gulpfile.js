var gulp = require('gulp');
var webserver = require('gulp-webserver');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');


gulp.task('sass', function () {
    return gulp.src(['./app/components/*/scss/*.scss', './app/components/scss/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: ['./']
    });
    gulp.watch(['./app/components/*/scss/*.scss', './app/components/scss/*.scss'], ['sass', browserSync.reload]);
    gulp.watch('app/*.html').on('change', browserSync.reload);
});
