import Users from '@/components/administration/users/Users.vue'
import Clients from '@/components/administration/clients/Clients.vue'
import Client from '@/components/administration/clients/client/Client.vue'
import Settings from '@/components/administration/settings/Settings.vue'
import Log from '@/components/administration/log/Log.vue'
import General from '@/components/administration/general/General.vue'

import clientChildren from './clientChildren.js'

import store from '@/store/index'

const adminChildren = [
  {
    path: 'log',
    name: 'administration.log',
    component: Log
  },
  {
    path: 'clients',
    name: 'administration.clients',
    component: Clients
  },
  {
    path: 'client',
    name: 'administration.client',
    component: Client,
    redirect: to => {
      return {name: 'administration.client.general'}
    },
    beforeEnter (to, from, next) {
      if (_.get(store, 'getters.clients/item.id')) {
        next()
      } else {
        next({name: 'administration.clients'})
      }
    },
    children: clientChildren
  },
  {
    path: 'users',
    name: 'administration.users',
    component: Users
  },
  {
    path: 'settings',
    name: 'administration.settings',
    component: Settings
  },
  {
    path: 'general',
    name: 'administration.general',
    component: General
  }
]

export default adminChildren
