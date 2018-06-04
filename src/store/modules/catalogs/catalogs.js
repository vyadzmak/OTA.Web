import mutations from './mutations'
import * as actions from './actions'

// initial state
const state = {
  catalogs: {},
  currentCatalog: {},
  catalogSchemas: [],
  catalogSchema: {},
  updateCatalog: {}
}

// getters
const getters = {
  catalogs: state => state.catalogs,
  catalogSchemas: state => state.catalogSchemas,
  catalogSchema: state => state.catalogSchema,
  currentCatalog: state => state.currentCatalog,
  updateCatalog: state => state.updateCatalog
}
export default {
  state,
  getters,
  actions,
  mutations
}
