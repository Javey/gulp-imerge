/**
 * @fileoverview gulpfile example
 * @author javey
 * @date 14-12-22
 */

var gulp = require('gulp'),
    imerge = require('../src/index.js'),
    header = require('gulp-header');

gulp.task('default', function() {
    return gulp.src('./web/**/*.css')
        .pipe(imerge({
            spriteTo: './build/sprite',
            sourceContext: './web',
            outputContext: './build'
        }))
        .pipe(header('/*test*/'))
        .pipe(gulp.dest('./build'));
});