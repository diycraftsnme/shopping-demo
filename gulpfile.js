var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('sass', function () {
    return gulp.src('./src/scss/app.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./src/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('minifyjs', function() {
    gulp.src(['src/script/app.js','src/script/app-router.js'])
        .pipe(concat('app.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('src/'));
});



gulp.task('start',['browserSync','sass','minifyjs'], function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/script/*.js', ['minifyjs']);
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
});