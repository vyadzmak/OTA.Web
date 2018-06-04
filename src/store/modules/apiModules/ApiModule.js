import mutations from './mutations'
import getActions from './actions'
class ApiModule {
  constructor (link) {
    this.namespaced = true
    this.state = {
      items: [],
      item: {'hello': 'hello'}
    }
    this.mutations = mutations
    this.getters = {
      items: state => state.items,
      item: state => state.item
    }
    this.actions = getActions(link)
  }
}

export default ApiModule
