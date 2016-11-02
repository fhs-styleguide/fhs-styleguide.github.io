var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var stylelint = require('stylelint');
var sass = require('gulp-sass');
var reporter = require('postcss-reporter');
var watch = require ('gulp-watch');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    var processorsPreSass = [
        stylelint({
            configFile:".stylintrc.json"
        }),
        reporter({
            clearMessages: true,
            throwError: false
        })
    ];

    var processorsPostSass = [
        autoprefixer({browsers: ['last 2 versions', '> 1%']}) // see https://github.com/ai/browserslist#queries
    ];

    return gulp.src('./src/*.scss')
        .pipe(postcss(processorsPreSass))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processorsPostSass))
        .pipe(gulp.dest('./dest'))
        .pipe(browserSync.stream());
});

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('./src/*.scss', ['sass']);
    gulp.watch('./dest/*.html').on('change', function() {
        browserSync.reload()
    });
})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dest/"
        }
    })
});