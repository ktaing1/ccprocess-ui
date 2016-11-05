'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
    return gulp.src('./src/css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*', ['sass', 'autoprefixer', 'copyhtml', 'concatjs', 'watch'], function() {
        //browserSync.reload;
    });
});
gulp.task('copyhtml', function() {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist'));
});


gulp.task('concatjs', function() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('webserver', function() {
    browserSync.init({
        server: "./dist"
    });
});


gulp.task('autoprefixer', () =>
    gulp.src('./dist/css/main.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./dist/css/'))
);

gulp.task('default', ['sass', 'autoprefixer', 'copyhtml', 'concatjs', 'webserver', 'watch']);
gulp.task('build', ['sass', 'autoprefixer', 'copyhtml', 'concatjs']);
