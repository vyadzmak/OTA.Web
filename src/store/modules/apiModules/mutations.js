const mutations = {
  items (state, items) {
    state.items = items
  },

  update (state, item) {
    let index = _.findIndex(state.items, {id: item.id})
    switch (index) {
      case -1:
        state.items.push(item)
        break
      default:
        state.items.splice(index, 1, item)
        break
    }
  },

  delete (state, id) {
    let index = _.findIndex(state.items, {id: id})
    if (index > -1) {
      state.items.splice(index)
    }
  },

  item (state, item) {
    state.item = item
  }
}

export default mutations
