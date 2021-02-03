let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');


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