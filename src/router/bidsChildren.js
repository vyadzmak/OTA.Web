import Bid from '@/components/bids/bid/Bid.vue'
import Details from '@/components/bids/details/Details.vue'

import store from '@/store/index'

const adminChildren = [
  {
    path: 'inbox',
    name: 'bids.inbox',
    component: Bid
  },
  {
    path: 'active',
    name: 'bids.active',
    component: Bid
  },
  {
    path: 'history',
    name: 'bids.history',
    component: Bid
  },
  {
    path: 'details',
    name: 'bids.details',
    component: Details,
    beforeEnter (to, from, next) {
      if (_.get(store, 'getters.bids/item.id')) {
        next()
      } else {
        let routeName = from && from.name && from.name.indexOf('bids') !== -1 ? from.name : 'bids.inbox'
        next({name: routeName})
      }
    }
  }
]

export default adminChildren
