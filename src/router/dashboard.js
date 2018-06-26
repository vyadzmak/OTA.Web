import Dashboard from '@/components/dashboard/Dashboard.vue'
import Bids from '@/components/bids/Bids.vue'
import DataSettings from '@/components/dataSettings/DataSettings.vue'
import Catalogs from '@/components/catalogs/Catalogs.vue'
import Product from '@/components/product/Product.vue'
import Administration from '@/components/administration/Administration.vue'

import Categories from '@/components/dataSettings/categories/Categories.vue'
import Category from '@/components/dataSettings/categories/category/Category.vue'
import Brands from '@/components/dataSettings/brands/Brands.vue'
import Brand from '@/components/dataSettings/brands/brand/Brand.vue'
import Partners from '@/components/dataSettings/partners/Partners.vue'
import Partner from '@/components/dataSettings/partners/partner/Partner.vue'
import UserAgreement from '@/components/dataSettings/userAgreement/UserAgreement.vue'
import Currencies from '@/components/dataSettings/currencies/Currencies.vue'
import Units from '@/components/dataSettings/units/Units.vue'
import Display from '@/components/dataSettings/display/Display.vue'
import Areas from '@/components/dataSettings/areas/Areas.vue'
import Area from '@/components/dataSettings/areas/area/Area.vue'

import adminChildren from './adminChildren'
import categoryChildren from './categoryChildren'
import productChildren from './productChildren'
import brandChildren from './brandChildren'
import partnerChildren from './partnerChildren'
import bidsChildren from './bidsChildren'

import store from '@/store/index'

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
    path: 'category',
    name: 'category',
    component: Category,
    redirect: to => {
      return {name: 'category.general'}
    },
    beforeEnter (to, from, next) {
      if (_.get(store, 'getters.productCategories/item.id')) {
        next()
      } else {
        next({name: 'categories'})
      }
    },
    children: categoryChildren
  },
  {
    path: 'brands',
    name: 'brands',
    component: Brands
  },
  {
    path: 'brand',
    name: 'brand',
    component: Brand,
    redirect: to => {
      return {name: 'brand.general'}
    },
    beforeEnter (to, from, next) {
      if (_.get(store, 'getters.brandsCatalog/item.id')) {
        next()
      } else {
        next({name: 'brands'})
      }
    },
    children: brandChildren
  },
  {
    path: 'partners',
    name: 'partners',
    component: Partners
  },
  {
    path: 'partner',
    name: 'partner',
    component: Partner,
    redirect: to => {
      return {name: 'partner.general'}
    },
    beforeEnter (to, from, next) {
      if (_.get(store, 'getters.partnersCatalog/item.id')) {
        next()
      } else {
        next({name: 'partners'})
      }
    },
    children: partnerChildren
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
    path: 'areas',
    name: 'areas',
    component: Areas
  },
  {
    path: 'area',
    name: 'area',
    component: Area
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
    beforeEnter (to, from, next) {
      if (_.get(store, 'getters.products/item.id')) {
        next()
      } else {
        next({name: 'catalogs'})
      }
    },
    children: productChildren
  },
  {
    path: 'administration',
    name: 'administration',
    component: Administration,
    redirect: to => {
      return {name: 'administration.users'}
    },
    children: adminChildren
  }]
}

export default dashboard
