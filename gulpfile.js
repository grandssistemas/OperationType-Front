/**
 * Created by rafael on 08/11/16.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var ngTemplates = require('gulp-ng-templates');

gulp.task('js', ['templates'], function () {
    gulp.src([
            'templates.min.js',
            'app/**/services/*/**/*.js',
            'app/**/services/module.js',
            'app/**/directives/*/**/module.js',
            'app/**/directives/module.js',
            'app/**/directives/*/**/*.js',
            'app/**/module.js',
            'app/**/*.js',
            'app/app.js'
        ])
        .pipe(concat('operationtype.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('.'))
});

gulp.task('templates', function () {
    return gulp.src([
            './app/**/*.html'
        ])
        .pipe(ngTemplates('operationtype.templates'))
        .pipe(gulp.dest('.'));
});

gulp.task('build', ['templates', 'js']);

