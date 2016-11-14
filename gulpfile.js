var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var replace = require('replace');
var sourcemaps = require('gulp-sourcemaps');

var replaceFiles = ['./www/app/ui/_bootstrap/module.js'];

var paths = {
  sass: ['./scss/**/*.scss'],
  scripts: ['./www/app/media/**/module.js', './www/app/media/**/*.js', './www/app/ui/**/module.js', './www/app/ui/**/*.js']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('scripts', function(done){
  gulp.src(paths.scripts)
          .pipe(sourcemaps.init())
          .pipe(concat('app.bundle.js'))
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest('./www/'))
          .on('end', done);
});

gulp.task('watch', ['build'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('build', ['sass', 'scripts']);

gulp.task('release', ['remove-proxy', 'build']);

gulp.task('serve:before', ['add-proxy', 'watch']);

gulp.task('upload:before', ['release']);
gulp.task('build:before', ['release']);
gulp.task('run:before', ['release']);
//gulp.task('run:before', ['add-proxy', 'watch']);
gulp.task('emulate:before', ['release']);
gulp.task('package:before', ['release']);


gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('add-proxy', function() {
  return replace({
    regex: "http://www.sikhsangeet.com/api/api.php",
    replacement: "http://localhost:8100/api",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
})

gulp.task('remove-proxy', function() {
  return replace({
    regex: "http://localhost:8100/api",
    replacement: "http://www.sikhsangeet.com/api/api.php",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
})
