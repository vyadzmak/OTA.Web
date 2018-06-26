import mutations from './mutations'
import * as actions from './actions'

// initial state
const state = {
  items: [],
  type: ''
}

// getters
const getters = {
  items: state => state.items,
  type: state => state.type
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
