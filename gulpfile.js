var gulp    = require('gulp');
var inject  = require('gulp-inject');
var sass    = require('gulp-sass');



gulp.task('sass', function () {
    gulp.src('client/style/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./client/style'))
});

gulp.task('watch', function () {
    gulp.watch('client/style/*.scss', ['sass']);
});

