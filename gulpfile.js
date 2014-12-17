var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var minifyCSS = require('gulp-minify-css');
var nodemon = require('gulp-nodemon');

gulp.task('default', [
  'build',
  'serve',
  'watch'
]);

gulp.task('build', function() {
  return gulp.src('client/less/style.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('client/css'))
    .pipe(livereload());
});

gulp.task('serve', function() {
  nodemon({ script: 'server/server.js' });
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./client/less/*.less', ['build']);
});
