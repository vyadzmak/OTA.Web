import types from '../../mutation-types'
import http from '../../../httpClient/index'

export const getAllEntities = ({ commit, getters }, {id}) => {
  commit('showSpinner', true)
  http.get('schemaObjects' + '/' + id)
    .then(response => {
      let entities = JSON.parse(response.data)
      commit(types.UPDATE_ENTITIES, entities)
      commit('showSpinner', false)
    })
    .catch(e => {
      commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'})
      commit('showSpinner', false)
    })
}

export const getEntitySchemas = ({ commit, getters }, {id}) => {
  commit('showSpinner', true)
  http.get(`schemaClients` + '/' + id)
    .then(response => {
      let objArr = []
      _.forEach(response.data, function (value, key) {
        if (value.schema_type_id !== 3) {
          objArr.push(value)
        }
      })
      commit(types.UPDATE_ENTITY_SCHEMAS, objArr)
      commit('showSpinner', false)
    })
    .catch(e => {
      commit(types.UPDATE_ENTITY_SCHEMAS, [])
      commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'})
      commit('showSpinner', false)
    })
}

export const getCurrentEntity = ({ commit, getters }, {id}) => {
  commit('showSpinner', true)
  http.get(`entityDetails` + '/' + id)
    .then(response => {
      let responseData = JSON.parse(response.data)
      responseData.general_section.data = JSON.parse(responseData.general_section.data)
      commit(types.CURRENT_ENTITY, responseData)
      commit('showSpinner', false)
    })
    .catch(e => {
      commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'})
      commit('showSpinner', false)
    })
}

export const getEntitySchema = ({ commit, getters }, {id}) => {
  return new Promise((resolve, reject) => {
    commit('showSpinner', true)
    http.get(`schemas` + '/' + id)
      .then(response => {
        commit(types.UPDATE_ENTITY_SCHEMA, response.data)
        commit('showSpinner', false)
        resolve()
      })
      .catch(e => {
        commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'})
        commit('showSpinner', false)
        reject(e)
      })
  })
}

export const getUpdateEntity = ({ commit, getters }, {id}) => {
  return new Promise((resolve, reject) => {
    commit('showSpinner', true)
    http.get(`objects` + '/' + id)
      .then(response => {
        let responseData = response.data
        responseData.data = JSON.parse(responseData.data)
        commit(types.UPDATE_UPDATE_ENTITY, responseData)
        commit('showSpinner', false)
        resolve()
      })
      .catch(e => {
        commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'})
        commit('showSpinner', false)
        reject(e)
      })
  })
}

export const updateEntity = ({ commit, getters }, {isUpdate, item}) => {
  return new Promise((resolve, reject) => {
    console.log(JSON.stringify(item))
    commit('showSpinner', true)
    http({method: isUpdate ? 'put' : 'post',
      url: isUpdate ? 'object/' + item.id : 'objects',
      data: item,
      config: { contentType: 'application/json' }
    })
      .then(response => {
        let responseData = response.data && response.data !== 'Error' ? response.data : null
        commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' объекта прошло успешно', snackbar: true, context: 'success'})
        commit('showSpinner', false)
        resolve(responseData)
      })
      .catch(e => {
        commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' объекта не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
        commit('showSpinner', false)
        reject(e)
      })
  })
}

export const getEntityTable = ({ commit, getters }, {item}) => {
  return new Promise((resolve, reject) => {
    http({method: 'post',
      url: 'entityObjects',
      data: item,
      config: { contentType: 'application/json' }
    })
      .then(response => {
        if (response.data) {
          resolve(JSON.parse(response.data))
        } else { reject(new Error()) }
      })
      .catch(e => {
        commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'})
        reject(e)
      })
  })
}
