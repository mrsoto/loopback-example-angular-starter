var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var loopbackAngular = require('gulp-loopback-sdk-angular');
var minifyCSS = require('gulp-minify-css');
var nodemon = require('gulp-nodemon');
var rename = require('gulp-rename');

gulp.task('default', [
  'build:lb-services',
  'build:less',
  'serve',
  'watch'
]);

gulp.task('build:lb-services', function() {
  return gulp.src('./server/server.js')
    .pipe(loopbackAngular())
    .pipe(rename('lb-services.js'))
    .pipe(gulp.dest('./client/js/common'));
});

gulp.task('build:less', function() {
  return gulp.src('./client/less/style.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('client/css'))
    .pipe(livereload());
});

gulp.task('serve', function() {
  nodemon({ script: './server/server.js' });
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./client/less/*.less', ['build']);
  gulp.watch('./common/models/**/*', ['build:lb-services']);
});
