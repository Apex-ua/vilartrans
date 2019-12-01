const {src, dest, series, parallel, watch} = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const ghPages = require('gulp-gh-pages');
// const babel= require('gulp-babel');

const origin = 'src';
const destination = 'build';

sass.compiler = require('node-sass');

async function clean(cb) {
  await del(destination);
  cb();
}

function cname(cb){
  src(`${origin}/CNAME`).pipe(dest(destination));
  cb();
}

function html(cb) {
  src(`${origin}/**/*.html`).pipe(dest(destination));
  cb();
}

function css(cb) {
  // src([`${origin}/css/animate.css`]).pipe(dest(`${destination}/css`));

  src(`${origin}/css/scss/**/*.scss`)
  // .pipe(concat('styles.scss'))
  .pipe(sass({
    // outputStyle: 'compressed'
  }))
  
  .pipe(dest(`${destination}/css`));

  cb();
}

function images(cb){
  src(`${origin}/images/**/*.*`)
  .pipe(imagemin())
  .pipe(dest(`${destination}/images`));
  cb();
}


// function js(cb) {
//   src(`${origin}/js/lib/**/*.js`).pipe(dest(`${destination}/js/lib`));

//   src(`${origin}/js/script.js`)
//   .pipe(babel({
//     presets: ['@babel/env']
//   }))  
//   .pipe(dest(`${destination}/js`));
//   cb();
// }

function watcher(cb) {
  watch(`${origin}/**/*.html`).on('change', series(html, browserSync.reload))
  watch(`${origin}/**/*.scss`).on('change', series(css, browserSync.reload))
  watch(`${origin}/images/**/*`).on('change', series(images, browserSync.reload))
  // watch(`${origin}/**/*.js`).on('change', series(js, browserSync.reload))
  cb();
}

function server(cb) {
  browserSync.init({
    notify: false,
    open: false,
    server: {
      baseDir: destination
    }   
  })
  cb();
}

function deploy(cb){
  src(`./${destination}/**/*.*`)
  .pipe(ghPages());
  cb();
}
 

// exports.default = series(clean, parallel(html, css, js), server, watcher);
exports.deploy = deploy;
exports.default = series(clean, images, parallel(html, css, cname), server, watcher);