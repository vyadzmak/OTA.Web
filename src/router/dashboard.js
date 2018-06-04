import Dashboard from '@/components/dashboard/Dashboard.vue'
import Bids from '@/components/bids/Bids.vue'
import DataSettings from '@/components/dataSettings/DataSettings.vue'
import Catalogs from '@/components/catalogs/Catalogs.vue'
import Product from '@/components/product/Product.vue'
import Administration from '@/components/administration/Administration.vue'

import adminChildren from './adminChildren'
import productChildren from './productChildren'

const dashboard = {
  path: '/',
  name: 'dashboard',
  component: Dashboard,
  exact: true,
  redirect: to => {
    return {name: 'administration'}
  },
  children: [ {
    path: 'bids',
    name: 'bids',
    component: Bids
  },
  {
    path: 'dataSettings',
    name: 'dataSettings',
    component: DataSettings
  },
  {
    path: 'catalogs',
    name: 'catalogs',
    component: Catalogs
  },
  {
    path: 'product',
    name: 'product',
    component: Product,
    redirect: to => {
      return {name: 'product.general'}
    },
    children: productChildren
  },
  {
    path: 'administration',
    name: 'administration',
    component: Administration,
    redirect: to => {
      return {name: 'administration.general'}
    },
    children: adminChildren
  }]
}

export default dashboard
