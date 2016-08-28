var concat = require('gulp-concat'),
    githubPages = require('gulp-gh-pages'),
    gulp = require('gulp'),
    http = require('node-static'),
    jade = require('gulp-jade'),
    livereload = require('gulp-livereload'),
    minifyImg = require('gulp-imagemin'),
    minifyJS = require('gulp-uglify'),
    rimraf = require('rimraf'),
    sass = require('gulp-ruby-sass'),
    util = require('gulp-util'),
    when = require('when'),
    markdown = require('gulp-markdown')

/**** Compiler tasks ****/
var compiler = {}

// Clean /out directory
compiler.clean = function(done) {
  rimraf('./out/**/*', function(){
    done()
  });
}

// Compile Jade -> HTML
compiler.jade = function() {
  console.log("Compiling Jade -> HTML...")
  var deferred = when.defer()
  gulp.src('./jade/[!_]*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./out'))
    .pipe(livereload())
    .on('end', deferred.resolve)
  return deferred.promise
}

// Compile SCSS -> CSS
compiler.scss = function() {
  console.log("Compiling SCSS -> CSS...")
  var deferred = when.defer()
  sass('./scss/*.scss', {style: 'compressed'})
    .on('error', util.log)
    .pipe(gulp.dest('./out/css'))
    .pipe(livereload())
    .on('end', deferred.resolve)
  return deferred.promise
}

// Compile Coffeescript -> JS
compiler.js = function() {
  var deferred = when.defer();
  console.log("Compiling JS...")
  gulp.src(['./js/__*.js', './js/_*.js', './js/main.js'])
    .pipe(concat('main.js'))
    .pipe(minifyJS())
    .pipe(gulp.dest('./out/js'))
    .pipe(livereload())
    .on('end', deferred.resolve)
  return deferred.promise;
}

compiler.images = function(){
  console.log("Compiling images...")
  var deferred = when.defer()
  gulp.src('./img/**/*')
    .pipe(minifyImg())
    .pipe(gulp.dest('./out/img'))
    .on('end', deferred.resolve)
  return deferred.promise
}

// Compile static resources
compiler.static = function(){
  console.log("Compiling static assets...")
  var deferred = when.defer()
  gulp.src('./static/**')
    .pipe(gulp.dest('./out'))
    .on('end', deferred.resolve)
  return deferred.promise
}

// Compile markdown
compiler.md = function(){
  console.log("Compiling markdown assets...")
  var deferred = when.defer()
  gulp.src('./jade/markdown/*.md')
    .pipe(markdown())
    .pipe(gulp.dest('./jade/markdown_out'))
    .pipe(livereload())
    .on('end', deferred.resolve)
  return deferred.promise
}

// Clear directory and compile all
compiler.all = function(done){
  when.all([
    compiler.md(),
    compiler.jade(),
    compiler.scss(),
    compiler.js(),
    compiler.images(),
    compiler.static()
  ]).then(function(){
    done()
  });
}

// Deploy to gh-pages branch
var deploy = function(){
  return gulp.src('./out/**/*')
    .pipe( githubPages() )
}

// Start a HTTP server on --port (defaults to 8000) and watch for changes
var watch = function() {
  livereload.listen()

  port = (process.argv.length > 4 && process.argv[3] == '--port') ? parseInt(process.argv[4]) : 8000
  require('http').createServer(function (request, response) {
    request.addListener('end', function () {
      new http.Server('./out').serve(request, response)
    }).resume()
  }).listen(port)

  gulp.watch('./jade/**/*', ['jade'])
  gulp.watch('./scss/**/*', ['scss'])
  gulp.watch('./js/**/*', ['js'])
  gulp.watch('./img/**/*', ['images'])
  gulp.watch('./static/**', ['static'])

  console.log('Server listening on port %s', port)
}

// Build gulp tasks
gulp.task('clean', compiler.clean)
gulp.task('jade', compiler.jade)
gulp.task('scss', compiler.scss)
gulp.task('js', compiler.js)
gulp.task('img', compiler.img)
gulp.task('static', compiler.static)
gulp.task('compile', ['clean'], compiler.all)
gulp.task('deploy', ['compile'], deploy)
gulp.task('watch', ['compile'], watch)
gulp.task('default', ['compile'])