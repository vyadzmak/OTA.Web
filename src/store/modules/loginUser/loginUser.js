import mutations from './mutations'
import * as actions from './actions'

// initial state
const state = {
  userData: null
}

// getters
const getters = {
  userData: state => state.userData
}
export default {
  state,
  getters,
  actions,
  mutations
}
