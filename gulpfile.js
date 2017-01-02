//1. Make gulpfile
//2. npm i all dependencies
//3. check all folder paths used in gulpfile
//4. Update index.html
//5. Run gulp watch

var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    print = require('gulp-print'),
    babel = require('gulp-babel');
    // Make sure to include babel-preset-es2015 in the npm installs for the build-js function to work properly.


var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

const paths = {
  jsSource: ['./src/components/**/*.js', './src/components/*.js'],
  cssFiles: './src/**/*.css',
  // indexFiles: './src/index.html',
  scssFiles: './src/**/**/*.scss',
  // index: './src/index.html',
  htmlFiles: './src/**/*.html',
  dist: './src/dist',
};

gulp.task('build-css', function () {
  return gulp.src([paths.scssFiles, paths.cssFiles])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cachebust.resources())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('clean', function (cb) {
  return del([
    'src/dist/**'
  ], cb).then(() => {
    gulp.start(['build-css', 'build-js']);
  });
});

// gulp.task('build-html', function () {
//   return gulp.src([paths.htmlFiles, paths.indexFiles])
//     .pipe(gulp.dest(paths.dist))
// });

gulp.task('build-js', function () {
  return gulp.src(paths.jsSource)
    .pipe(sourcemaps.init())
    .pipe(print())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('bundle.js'))
    //   .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['clean', 'build-css', 'build-js']);

gulp.task('watch', function () {
  return gulp.watch([paths.jsSource, paths.cssFiles, paths.scssFiles], ['clean']);
});


gulp.task('default', ['clean', 'watch']);
