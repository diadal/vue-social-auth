/*
Nuxt.js module for vue-social-auth
Usage:
  - Install vue-social-auth package
  - Add this into your nuxt.config.js file:
  {
    modules: [
      // Simple usage
      'vue-social-auth/nuxt'
      // Optionally passing options in module configuration
      ['vue-social-auth/nuxt', { property: '$social', ...anotherOptions }]
    ],
    // Optionally passing options in module top level configuration
    vueSocialAuth: { property: '$social', ...anotherOptions }
  }
*/

const { resolve } = require('path')

module.exports = function nuxtVueWaitModule (moduleOptions) {
  const options = Object.assign({}, this.options.vueSocialAuth, moduleOptions)

  if (this.options.build.ssr) {
    this.options.build.transpile.push(/^vue-social-auth/)
  }
  // Register plugin
  this.addPlugin({
    ssr: false,
    src: resolve(__dirname, 'plugin.template.js'),
    fileName: 'vue-social-auth.js',
    options: options
  })
}

// required by nuxt
module.exports.meta = require('../package.json')
