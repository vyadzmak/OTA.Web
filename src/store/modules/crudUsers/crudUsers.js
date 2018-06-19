import mutations from './mutations'
import * as actions from './actions'

// initial state
const state = {
  items: [],
  item: {}
}

// getters
const getters = {
  items: state => state.items,
  item: state => state.item
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
