// gulpfile.js
const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');

gulp.task('styles', () => {
    return gulp.src('./dev/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./public/styles'))
});

gulp.task('js', () => {
    browserify('dev/scripts/main.js', {debug: true})
        .transform('babelify', {
            sourceMaps: true,
            presets: ['es2015']
        })
        .bundle()
        .on('error',notify.onError({
            message: "Error: <%= error.message %>",
            title: 'Error in JS 💀'
        }))
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest('public/scripts'))
        .pipe(reload({stream:true}));
});

gulp.task('bs', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('default', ['js','bs', 'styles'], () => {
    gulp.watch('dev/**/*.js',['js']);
    gulp.watch('dev/**/*.scss',['styles']);
    gulp.watch('*.html', reload);
    gulp.watch('./public/styles/styles.css',reload);
});