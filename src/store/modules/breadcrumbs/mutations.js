const mutations = {
  items (state, payload) {
    state.items = payload
  },
  add (state, payload) {
    state.items.push(payload)
  },
  delete (state, payload) {
    state.items.splice(_.findIndex(state.items, {id: payload}) + 1)
  },
  type (state, payload) {
    state.type = payload
  }
}

export default mutations
