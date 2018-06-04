import mutations from './mutations'
import * as actions from './actions'

// initial state
const state = {
  factories: [],
  currentFactory: {}
}

// getters
const getters = {
  factories: state => state.factories,
  currentFactory: state => state.currentFactory
}
export default {
  state,
  getters,
  actions,
  mutations
}
