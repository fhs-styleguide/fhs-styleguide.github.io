var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var stylelint = require('stylelint');
var sass = require('gulp-sass');
var reporter = require('postcss-reporter');
var watch = require ('gulp-watch');

gulp.task('sass', function() {
    var processorsPreSass = [
        stylelint({
            configFile:".stylintrc.json"
        }),
        reporter({
            clearMessages: true,
            throwError: true
        })
    ];

    var processorsPostSass = [
        autoprefixer({browsers: ['last 2 versions', '> 1%']}) // see https://github.com/ai/browserslist#queries
    ];

    return gulp.src('./src/*.scss')
        .pipe(postcss(processorsPreSass))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processorsPostSass))
        .pipe(gulp.dest('./dest'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./src/*.scss', ['sass']);
})
