import mutations from './mutations'
import getActions from './actions'
class ApiModule {
  constructor ({link, additional, requestParams}) {
    this.namespaced = true
    this.state = {
      items: [],
      item: null
    }
    this.mutations = mutations
    this.getters = {
      items: state => state.items,
      item: state => state.item
    }
    this.actions = getActions({link, additional, requestParams})()
  }
}

export default ApiModule
