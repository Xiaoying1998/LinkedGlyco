import Vue from 'vue'
import Router from 'vue-router'

import Result from '../components/Result'
import Home from '../components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/show-result',
      name: 'Result',
      component: Result
    }

  ],
  mode: 'history'
})