import types from '../../mutation-types'
import http from '../../../httpClient/index'

export const getAllFactories = ({ commit, getters }, {id}) => {
  commit('showSpinner', true)
  http.get(`fullSchemaClients/` + id)
    .then(response => {
      let factories = response.data
      if (factories.length && factories.length > 0) {
        commit(types.UPDATE_FACTORIES, factories)
      }
      commit('showSpinner', false)
    })
    .catch(e => {
      commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'})
      commit('showSpinner', false)
    })
}

export const updateFactory = ({ commit, getters }, {isUpdate, item}) => {
  return new Promise((resolve, reject) => {
    commit('showSpinner', true)
    http({method: isUpdate ? 'put' : 'post',
      url: isUpdate ? 'schema/' + item.id : 'schemas',
      data: item,
      config: { contentType: 'application/json' }
    })
      .then(response => {
        let responseData = response.data && response.data !== 'Error' ? response.data : null
        if (responseData) {
          if (isUpdate) {
            commit('UPDATE_FACTORY', _.cloneDeep(responseData))
            commit('CURRENT_FACTORY', _.cloneDeep(responseData))
          } else {
            commit('ADD_FACTORY', responseData)
          }
          commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' конструктора прошло успешно', snackbar: true, context: 'success'})
        } else {
          commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' конструктора не удалось', snackbar: true, context: 'error'})
        }
        commit('showSpinner', false)
        resolve(responseData)
      })
      .catch(e => {
        commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' конструктора не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
        commit('showSpinner', false)
        reject(e)
      })
  })
}

export const deleteFactory = ({ commit, getters }, {id}) => {
  commit('showSpinner', true)
  http.delete('schema/' + id)
    .then(response => {
      if (response.status === 204) {
        commit('DELETE_FACTORY', id)
        commit('showSnackbar', {text: 'Удаление конструктора прошло успешно', snackbar: true, context: 'success'})
      } else {
        commit('showSnackbar', {text: 'Удаление конструктора не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
      }
      commit('showSpinner', false)
    })
    .catch(e => {
      commit('showSpinner', false)
      commit('showSnackbar', {text: 'Удаление конструктора не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
    })
}

export const getSchemaUpdateProperty = ({ commit, getters }, {link, id}) => {
  return new Promise((resolve, reject) => {
    commit('showSpinner', true)
    http.get(link + (id ? '/' + id : ''))
      .then(response => {
        commit(types.setUpdateProperty, response.data)
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
