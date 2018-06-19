import Address from '@/components/administration/clients/client/address/Address.vue'
import General from '@/components/administration/clients/client/general/General.vue'
import Info from '@/components/administration/clients/client/info/Info.vue'
import Users from '@/components/administration/clients/client/users/Users.vue'

const children = [
  {
    path: 'address',
    name: 'administration.client.address',
    component: Address
  },
  {
    path: 'general',
    name: 'administration.client.general',
    component: General
  },
  {
    path: 'info',
    name: 'administration.client.info',
    component: Info
  },
  {
    path: 'users',
    name: 'administration.client.users',
    component: Users
  }
]

export default children
