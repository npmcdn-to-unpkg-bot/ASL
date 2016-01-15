var gulp    = require('gulp');
var inject  = require('gulp-inject');
var serve = require('gulp-serve');



var sass    = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('client/style/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./client/style'))
});



gulp.task('serve:web', serve({
    root: ['.'],
    port: 8000
}));



gulp.task('start', ['serve:web'], function () {
    gulp.watch('client/style/*.scss', ['sass']);
});

gulp.task('serve:api', function (cb) {
    apiServer.listen(3000);
    cb();
});