var gulp = require('gulp');
var webpack = require('webpack-stream');
gulp.task('js', function(){
    return gulp.src('client/index.js')
    .pipe(webpack(require('./webpack.config.js') ))
    .pipe(gulp.dest('client/dist/'));
})

gulp.task('watch', function() {
    gulp.watch( ['js']);  // If a file changes, re-run 'sass'
  });