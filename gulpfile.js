var gulp = require('gulp');
var pug = require('gulp-pug');
var browserify = require('gulp-browserify');
var  autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');


gulp.task('sass', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
});

// gulp.task('views', function buildHTML() {
//     return gulp.src('src/views/*.pug')
//         .pipe(pug({
//             pretty: true
//         })).pipe(gulp.dest('./public'));
// });

gulp.task('scripts', function() {

    gulp.src('src/js/main.js')
        .pipe(browserify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('copyimg', function () {
    return gulp
        .src('src/img/*')
        .pipe(gulp.dest('./public/img'));
});

gulp.task('server',['sass','scripts'], function () {
    browserSync.init({
        port: 4000,
        server: {
            baseDir: './'
        }
    });

    gulp.watch("src/sass/**/*.scss", ['sass']);
    gulp.watch("src/js/**/*.js", ['scripts']);
    gulp.watch("index.html").on('change', browserSync.reload);

});

gulp.task('default', ['server','copyimg']);