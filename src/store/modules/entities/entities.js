import mutations from './mutations'
import * as actions from './actions'

// initial state
const state = {
  entities: [],
  currentEntity: {},
  entitySchemas: [],
  entitySchema: {},
  updateEntity: {}
}

// getters
const getters = {
  entities: state => state.entities,
  entitySchemas: state => state.entitySchemas,
  entitySchema: state => state.entitySchema,
  currentEntity: state => state.currentEntity,
  updateEntity: state => state.updateEntity
}
export default {
  state,
  getters,
  actions,
  mutations
}
