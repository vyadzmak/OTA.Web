import Dashboard from '@/components/dashboard/Dashboard.vue'
import Bids from '@/components/bids/Bids.vue'
import DataSettings from '@/components/dataSettings/DataSettings.vue'
import Catalogs from '@/components/catalogs/Catalogs.vue'
import Product from '@/components/product/Product.vue'
import Administration from '@/components/administration/Administration.vue'

import Categories from '@/components/dataSettings/categories/Categories.vue'
import Brands from '@/components/dataSettings/brands/Brands.vue'
import Partners from '@/components/dataSettings/partners/Partners.vue'
import UserAgreement from '@/components/dataSettings/userAgreement/UserAgreement.vue'
import Currencies from '@/components/dataSettings/currencies/Currencies.vue'
import Units from '@/components/dataSettings/units/Units.vue'
import Display from '@/components/dataSettings/display/Display.vue'

import adminChildren from './adminChildren'
import productChildren from './productChildren'
import bidsChildren from './bidsChildren'

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
    component: Bids,
    redirect: to => {
      return {name: 'bids.inbox'}
    },
    children: bidsChildren
  },
  {
    path: 'dataSettings',
    name: 'dataSettings',
    component: DataSettings
  },
  {
    path: 'categories',
    name: 'categories',
    component: Categories
  },
  {
    path: 'brands',
    name: 'brands',
    component: Brands
  },
  {
    path: 'partners',
    name: 'partners',
    component: Partners
  },
  {
    path: 'userAgreement',
    name: 'userAgreement',
    component: UserAgreement
  },
  {
    path: 'units',
    name: 'units',
    component: Units
  },
  {
    path: 'currencies',
    name: 'currencies',
    component: Currencies
  },
  {
    path: 'catalogs',
    name: 'catalogs',
    component: Catalogs
  },
  {
    path: 'display',
    name: 'display',
    component: Display
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
