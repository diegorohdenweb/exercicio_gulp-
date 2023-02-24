const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');

function compilaSass() {
  return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'));
}

function minifyJs() {
  return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'));
}

function minifyImages() {
  return gulp.src('./source/imagens/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/imagens'));
}

gulp.task('default', gulp.series(
  compilaSass,
  minifyJs,
  minifyImages,
  function(done) {
    done();
  }
));
