var fs = require('fs');
var rollup = require('rollup');
var uglify = require('uglify-js');
var buble = require('rollup-plugin-buble');
var package = require('../package.json');
var banner =
    "/*!\n" +
    " * vue-social-auth v" + package.version + "\n" +
    " * https://github.com/diadal/vue-social-auth\n" +
    " * Released under the MIT License.\n" +
    " */\n";

rollup.rollup({
  entry: 'src/index.js',
  plugins: [buble()]
})
.then(function (bundle) {
  return write('dist/vue-social-auth.js', bundle.generate({
    format: 'umd',
    banner: banner,
    moduleName: 'VueSocialauth'
  }).code, bundle);
})
.then(function (bundle) {
  return write('dist/vue-social-auth.min.js',
    banner + '\n' + uglify.minify('dist/vue-social-auth.js').code,
  bundle);
})
.then(function (bundle) {
  return write('dist/vue-social-auth.es2017.js', bundle.generate({
    format: 'es',
    banner: banner,
    footer: 'export { VueSocialauth };'
  }).code, bundle);
})
.then(function (bundle) {
  return write('dist/vue-social-auth.common.js', bundle.generate({
    format: 'cjs',
    banner: banner
  }).code, bundle);
})
.catch(logError);

function write(dest, code, bundle) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err);
      console.log(blue(dest) + ' ' + getSize(code));
      resolve(bundle);
    });
  });
}

function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb';
}

function logError(e) {
  console.log(e);
}

function blue(str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}