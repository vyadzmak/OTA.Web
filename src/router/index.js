import Vue from 'vue'
import Router from 'vue-router'

import dashboard from './dashboard'

import Login from '@/components/login/Login.vue'

import store from '@/store/index'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    redirect: {path: '/'}
  }]
routes.push(dashboard)
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: routes
})

router.beforeEach((to, from, next) => {
  let routes = _.get(store, 'state.loginUser.userData.user_role_data.user_role_route_access', null)
  if (routes && routes.length > 0) {
    if (_.includes(routes, to.name)) {
      next()
    } else {
      next({name: routes[0]})
    }
  } else {
    if (to.name === 'Login') {
      next()
    } else {
      next({ name: 'Login' })
    }
  }
})

export default router
