// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

import vueParticleLine from 'vue-particle-line'
import 'vue-particle-line/dist/vue-particle-line.css'

import AOS from 'aos'
import 'aos/dist/aos.css'


import locale from 'view-design/dist/locale/en-US'
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ViewUI, { locale });
Vue.use(vueParticleLine)


new Vue({
  el: '#app',
  router,
  created () {
    AOS.init()
  },
  render: h => h(App)
})
