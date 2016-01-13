var gulp = require('gulp');
var sass = require('gulp-sass');
var wiredep = require('wiredep').stream;

gulp.task('wiredep', function () {
    gulp.src('index.html')
        .pipe(wiredep({}))
        .pipe(gulp.dest('.'));
});