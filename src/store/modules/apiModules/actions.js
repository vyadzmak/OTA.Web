import http from '@/httpClient/index'

export default function getActions ({link, additional, requestParams}) {
  return function () {
    let actions = {}
    if (requestParams) {
      actions.getItems = ({ commit, getters }, payload) => {
        return new Promise((resolve, reject) => {
          commit('showSpinner', true, { root: true })
          let params = {}
          requestParams.forEach(paramKey => {
            params[paramKey] = payload[paramKey]
          })
          http.get(link, {params})
            .then(response => {
              if (response.status === 200) {
                commit(Array.isArray(response.data) ? 'items' : 'item', response.data)
                commit('showSpinner', false, { root: true })
                resolve()
              } else {
                throw new Error('status != 200')
              }
            })
            .catch(e => {
              commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'}, { root: true })
              commit('showSpinner', false, { root: true })
              reject(e)
            })
        })
      }
    } else {
      actions.getItems = ({ commit, getters }, payload) => {
        return new Promise((resolve, reject) => {
          commit('showSpinner', true, { root: true })
          http.get(link)
            .then(response => {
              if (response.status === 200) {
                commit('items', response.data)
                commit('showSpinner', false, { root: true })
                resolve()
              } else {
                throw new Error('status != 200')
              }
            })
            .catch(e => {
              commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'}, { root: true })
              commit('showSpinner', false, { root: true })
              reject(e)
            })
        })
      }

      actions.getItem = ({commit}, {id}) => {
        return new Promise((resolve, reject) => {
          commit('showSpinner', true, { root: true })
          http.get(link + '/' + id)
            .then(response => {
              if (response.status === 200) {
                commit('item', response.data)
                commit('showSpinner', false, { root: true })
                resolve()
              } else {
                throw new Error('status != 200')
              }
            })
            .catch(e => {
              commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'}, { root: true })
              commit('showSpinner', false, { root: true })
              reject(e)
            })
        })
      }

      actions.updateItem = ({ commit, getters }, {item, isUpdate}) => {
        return new Promise((resolve, reject) => {
          commit('showSpinner', true, { root: true })
          _(item).keys().forEach(key => {
            if (key.slice(-3) === '_id' && item[key] === 0) {
              item[key] = null
            }
          })
          http({method: isUpdate ? 'put' : 'post',
            url: isUpdate ? link + '/' + item.id : link,
            data: item,
            config: { contentType: 'application/json' }
          })
            .then(response => {
              if (response.status === 201) {
                commit('update', response.data)
                commit('item', response.data)
                commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' данных прошло успешно', snackbar: true, context: 'success'}, { root: true })
                commit('showSpinner', false, { root: true })
                resolve()
              } else {
                throw new Error('status != 201')
              }
            })
            .catch(e => {
              commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' данных не удалось. Обратитесь к администратору', snackbar: true, context: 'error'}, { root: true })
              commit('showSpinner', false, { root: true })
              reject(e)
            })
        })
      }
      actions.deleteItem = ({ commit, getters }, id) => {
        return new Promise((resolve, reject) => {
          commit('showSpinner', true, { root: true })
          http.delete(link + '/' + id)
            .then(response => {
              if (response.status === 204) {
                commit('delete', id)
                commit('showSnackbar', {text: 'Удаление данных прошло успешно', snackbar: true, context: 'success'}, { root: true })
                resolve()
              } else {
                throw new Error('status != 204')
              }
              commit('showSpinner', false, { root: true })
            })
            .catch(e => {
              commit('showSpinner', false, { root: true })
              commit('showSnackbar', {text: 'Удаление данных не удалось. Обратитесь к администратору', snackbar: true, context: 'error'}, { root: true })
              reject(e)
            })
        })
      }
    }
    if (additional) {
      additional.forEach(val => {
        actions[val.link] = ({ commit, getters }, payload) => {
          return new Promise((resolve, reject) => {
            commit('showSpinner', true, { root: true })
            let params = {}
            val.requestParams.forEach(paramKey => {
              params[paramKey] = payload[paramKey]
            })
            http.get(val.link, {params})
              .then(response => {
                if (response.status === 200) {
                  commit(Array.isArray(response.data) ? 'items' : 'item', response.data)
                  commit('showSpinner', false, { root: true })
                  resolve()
                } else {
                  throw new Error('status != 200')
                }
              })
              .catch(e => {
                commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'}, { root: true })
                commit('showSpinner', false, { root: true })
                reject(e)
              })
          })
        }
      })
    }

    return actions
  }
}
