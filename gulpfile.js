// npm install --save-dev gulp gulp-util gulp-plumber gulp-sass gulp-sourcemaps gulp-autoprefixer gulp-livereload tiny-lr

var gulp         = require('gulp')
var plumber      = require('gulp-plumber')
var sass         = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var livereload   = require('gulp-livereload')
var sourcemaps   = require('gulp-sourcemaps')

gulp.task('sass', function() {
 return gulp.src('sass/style.sass' )
   .pipe(plumber())
   .pipe(sourcemaps.init())
   .pipe(sass({
     outputStyle: 'compressed',
     indentedSyntax: true,
     errLogToConsole: true
   }))
   .pipe(autoprefixer('last 3 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
   .pipe(sourcemaps.write('./'))
   .pipe(gulp.dest( 'css/' ))
});

gulp.task('watch', function() {

  livereload.listen()

  gulp.watch('sass/**/*.sass', ['sass'])
  gulp.watch('css/*.css', livereload.changed)
  // gulp.watch('js/*.css', livereload.changed)
  // gulp.watch('**/*.html', livereload.changed)

});