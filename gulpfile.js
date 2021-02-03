let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;


gulp.task('minify-css', () => {
  return gulp.src('css/styles.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./css/'));
  });

gulp.task('sass', function () {
	return gulp.src('./scss/styles.scss')
		.pipe(sass())
		.pipe(rename('styles.css'))
		.pipe(gulp.dest('./css/'));
  });

gulp.task ( 'minify-sass', gulp.series( 'sass', 'minify-css' ) ); 

gulp.task ( 'watch', function () {
  return gulp.watch('scss/**/*.scss',
  gulp.task('minify-sass'));
});

gulp.task('concat-js', function() {
  return gulp.src('js/*.js')
    .pipe(concat('combined.js'))
    .pipe(gulp.dest('js/'));
});

gulp.task("uglify", function () {
  return gulp.src("js/combined.js")
      .pipe(rename("combined.min.js"))
      .pipe(uglify(/* options */))
      .pipe(gulp.dest("js/"));
});

gulp.task ('concat-min', gulp.series('concat-js', 'uglify'));

// gulp.task ( 'watch-js', function () {
//   return gulp.watch(['js/bootstrap.js', 'js/jquery-3.3.1.slim.js', 'popper.js'],
//   gulp.task('concat-min'));
// });