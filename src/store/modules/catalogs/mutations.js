import types from '../../mutation-types'

const mutations = {
  [types.UPDATE_CATALOGS] (state, payload) {
    state.catalogs = payload
  },

  [types.ADD_CATALOG] (state, payload) {
    state.catalogs.push(payload)
  },

  [types.UPDATE_CATALOG] (state, {catalog, index}) {
    state.catalogs[index] = catalog
  },

  [types.UPDATE_CATALOG_SCHEMAS] (state, payload) {
    state.catalogSchemas = payload
  },

  [types.UPDATE_CATALOG_SCHEMA] (state, payload) {
    state.catalogSchema = payload
  },

  [types.DELETE_CATALOG] (state, index) {
    state.catalogs.splice(index, 1)
  },

  [types.UPDATE_UPDATE_CATALOG] (state, payload) {
    state.updateCatalog = payload
  },

  [types.CURRENT_CATALOG] (state, payload) {
    state.currentCatalog = payload
  }
}

export default mutations
