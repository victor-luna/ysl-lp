const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const include = require('gulp-include');
const uglify = require('gulp-uglify');
// const sourcemaps = require("gulp-sourcemaps");

function sassCompilation() {
  return gulp
    .src('styles/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      }),
    )
    .pipe(gulp.dest('./'));
}

function gulpJs() {
  return (
    gulp
      .src('scripts/*.js')
      .pipe(include())
      // .pipe(sourcemaps.init())
      .pipe(uglify())
      // .pipe(sourcemaps.write())
      .pipe(gulp.dest('./'))
  );
}

function gulpWatch() {
  gulp.watch('styles/**/*.scss', sassCompilation);
  gulp.watch('scripts/*.js', gulpJs);
}

exports.sassCompilation = sassCompilation;
exports.gulpJs = gulpJs;
exports.gulpWatch = gulpWatch;

exports.dev = gulp.parallel(gulpWatch, sassCompilation, gulpJs);
exports.build = gulp.parallel(sassCompilation, gulpJs);
