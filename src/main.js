// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueLodash from 'vue-lodash'
import VueTransmit from 'vue-transmit'
import Vue2Filters from 'vue2-filters'
import VueMoment from 'vue-moment'
import VeeValidate, { Validator } from 'vee-validate'
import ruVeeValidate from 'vee-validate/dist/locale/ru'

import 'vuetify/dist/vuetify.min.css'
import './assets/styles/scss/main.scss'
import 'vue-form-generator/dist/vfg.css'

import App from './App'
import router from './router'
import store from './store/index'
import http from './httpClient/index'
import { VueModalDialog } from 'vue-modal-dialog'

Validator.localize('ru', ruVeeValidate)
const config = {
  errorBagName: 'veeErrors',
  fieldsBagName: 'veeFields',
  locale: 'ru',
  inject: false
}
Vue.use(VeeValidate, config)

// create vue plugins to use them in our components without import
Vue.use(Vuetify, {theme: {
  primary: '#40739e',
  secondary: '#4d5468',
  accent: '#82B1FF',
  error: '#c23616',
  info: '#10ac84',
  success: '#44bd32',
  warning: '#ff793f'
}})
Vue.use(VueLodash, { name: 'ldsh' })
Vue.use(VueModalDialog)
Vue.use(VueTransmit)
Vue.use(Vue2Filters)
Vue.use(VueMoment)
Vue.use(Object.defineProperty(Vue.prototype, '$http', { value: http }))
Vue.config.productionTip = false

/* eslint-disable no-new */
window.App = new Vue({
  el: '#app',
  // define our plugins as shorthand objects
  router,
  store,
  http,
  components: { App },
  template: '<App/>'
})
