import Vue from 'vue'
import VueSocialAuth from 'vue-social-auth'

export default (obj, inject) => {
  // aviable only in client side
  if (!process.client) {
    return
  }

  //initialize plugin with options
  const pluginOptions = [<%= serialize(options) %>][0] || {}
  Vue.use(VueSocialAuth, pluginOptions)
}
