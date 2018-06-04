import Users from '@/components/administration/users/Users.vue'
import Clients from '@/components/administration/clients/Clients.vue'
import Settings from '@/components/administration/settings/Settings.vue'
import Log from '@/components/administration/log/Log.vue'
import General from '@/components/administration/general/General.vue'

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
