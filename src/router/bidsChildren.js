import Bid from '@/components/bids/bid/Bid.vue'
import Details from '@/components/bids/details/Details.vue'

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
    component: Details
  }
]

export default adminChildren
