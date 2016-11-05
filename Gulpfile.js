'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./src/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*', ['sass', 'copyhtml', 'copyjs', 'watch'], function() {
  	//browserSync.reload;
  });
});
gulp.task('copyhtml', function() {
   gulp.src('./src/**/*.html')
   .pipe(gulp.dest('./dist'));
});


gulp.task('copyjs', function() {
   gulp.src('./src/js/*.js')
   .pipe(gulp.dest('./dist/js'));
});

gulp.task('copyimg', function() {
   console.log("images here");
   // gulp.src('./src/images/*.*')
   // .pipe(gulp.dest('./dist/images'));
});



gulp.task('webserver', function() {
	 browserSync.init({
	        server: "./dist"
	    });
});


gulp.task('default', ['sass', 'copyhtml', 'copyjs', 'copyimg', 'webserver', 'watch']);
gulp.task('build', ['sass', 'copyhtml', 'copyjs', 'copyimg']);