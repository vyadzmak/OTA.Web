import types from '../../mutation-types'

const mutations = {
  [types.USER_DATA] (state, payload) {
    state.userData = payload
  },
  [types.R_USER_DATA] (state, payload) {
    state.userData = payload
  }
}

export default mutations
