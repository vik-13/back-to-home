const config = require('./gulp.config')();

const { series, parallel, src, dest, watch } = require('gulp');
const del = require('del');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const zip = require('gulp-zip');
const size = require('gulp-size');
const browserSync = require('browser-sync').create();

function clean() {
  return del(config.release.index);
}

function compile() {
  return parallel(compileIndex, compileScripts);
}

function compileIndex() {
  return src(config.sources.index).pipe(dest(config.release.index));
}

function compileScripts() {
  return src(config.sources.scripts)
    .pipe(concat('app.js'))
    .pipe(terser({
      compress: {
        booleans_as_integers: true
      },
      toplevel: true
    }))
    .pipe(dest(config.release.scripts));
}

function compileZip() {
  return src(config.release.index + '/**/*')
    .pipe(zip('back-to-home.zip'))
    .pipe(dest('./'))
    .pipe(size({pretty: false}));
}

function reload(done) {
  browserSync.reload();
  done();
}

function serve() {
  browserSync.init({
    server: {
      baseDir: config.release.index,
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  });

  watch([
    config.sources.index,
    config.sources.scripts
  ], series(compile(), compileZip, reload));

}

exports.clean = clean;
exports.compile = compile();
exports.compileIndex = compileIndex;
exports.compileScripts = compileScripts;
exports.build = series(clean, compile(), compileZip);
exports.zip = compileZip;
exports.serve = series(clean, compile(), compileZip, serve);
exports.default = series(clean, compile(), compileZip);
