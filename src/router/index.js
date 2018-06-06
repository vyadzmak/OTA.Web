import Vue from 'vue'
import Router from 'vue-router'

import dashboard from './dashboard'

import Login from '@/components/login/Login.vue'

import store from '../store/index'

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

router.requireAuth = function (to, userRoleId) {
  let found = false
  let userRoutes = []
  switch (userRoleId) {
    case 1: userRoutes = [
      'dashboard',
      'bids', 'bids.inbox', 'bids.active', 'bids.history', 'bids.details',
      'administration', 'administration.log', 'administration.clients',
      'administration.users', 'administration.settings', 'administration.general',
      'dataSettings',
      'categories', 'brands', 'partners', 'userAgreement', 'currencies', 'units', 'display',
      'catalogs',
      'product', 'product.general', 'product.gallery', 'product.recommendation', 'product.reviews']
      break
    case 2:userRoutes = ['dashboard', 'dataSettings', 'catalogs']
      break
    default: break
  }
  found = _.includes(userRoutes, to.name)
  return found
}

router.beforeEach((to, from, next) => {
  let userRoleId = _.get(store, 'state.loginUser.userData.user_role_id')
  if (userRoleId) {
    if (router.requireAuth(to, userRoleId)) {
      next()
    } else {
      next({path: '/'})
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
