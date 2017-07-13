/**
 * Created by rafael on 08/11/16.
 */
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const ngAnnotate = require('gulp-ng-annotate');
const ngTemplates = require('gulp-ng-templates');
const babel = require('gulp-babel');

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
        .pipe(babel({presets: ['es2015']}))
        .pipe(concat('operationtype.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('.'))
});

gulp.task('js-dev', ['templates'], function () {
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
        .pipe(babel({presets: ['es2015']}))
        .pipe(concat('operationtype.min.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('.'))
});

gulp.task('templates', function () {
    return gulp.src([
            './app/**/*.html',
            './base.html'
        ])
        .pipe(ngTemplates('operationtype.templates'))
        .pipe(gulp.dest('.'));
});

gulp.task('build', ['templates', 'js']);
gulp.task('dev', ['templates', 'js-dev']);

