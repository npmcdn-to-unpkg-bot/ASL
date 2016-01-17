var gulp = require('gulp');
var inject = require('gulp-inject');
var serve = require('gulp-serve');
var nodemon = require('gulp-nodemon');


var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('client/style/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./client/style'))
});

gulp.task('start', ['serve:client', 'serve:server'], function () {
    gulp.watch('client/style/*.scss', ['sass']);
});

gulp.task('serve:client', serve({
    root: ['.'],
    port: 8000
}));

gulp.task('serve:server', function () {
    nodemon({
        script: 'server/app.js',
        ext: 'js html',
        debug: true
    })
});