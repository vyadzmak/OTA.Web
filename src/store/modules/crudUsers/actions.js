import http from '@/httpClient/index'

export const routeAdminUsers = ({ commit, getters }, payload) => {
  return new Promise((resolve, reject) => {
    commit('showSpinner', true, {root: true})
    let params = {user_id: payload.user_id}
    http.get('routeAdminUsers', {params})
      .then(response => {
        if (response.status === 200) {
          commit('items', response.data)
          commit('showSpinner', false, {root: true})
        } else {
          throw new Error('status != 200')
        }
        resolve()
      })
      .catch(e => {
        commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'}, {root: true})
        commit('showSpinner', false, {root: true})
        reject(new Error())
      })
  })
}

export const usersByClient = ({ commit, getters }, payload) => {
  return new Promise((resolve, reject) => {
    commit('showSpinner', true, {root: true})
    let params = {user_id: payload.user_id, client_id: payload.client_id}
    http.get('usersByClient', {params})
      .then(response => {
        if (response.status === 200) {
          commit('items', response.data)
          commit('showSpinner', false, {root: true})
        } else {
          throw new Error('status != 200')
        }
        resolve()
      })
      .catch(e => {
        commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'}, {root: true})
        commit('showSpinner', false, {root: true})
        reject(new Error())
      })
  })
}

export const userDetails = ({ commit, getters }, payload) => {
  return new Promise((resolve, reject) => {
    commit('showSpinner', true, {root: true})
    let params = {user_id: payload.user_id, request_user_id: payload.request_user_id}
    http.get('userDetails', {params})
      .then(response => {
        if (response.status === 200) {
          commit('item', response.data)
          commit('showSpinner', false, {root: true})
        } else {
          throw new Error('status != 200')
        }
        resolve()
      })
      .catch(e => {
        commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'}, {root: true})
        commit('showSpinner', false, {root: true})
        reject(new Error())
      })
  })
}

export const updateItem = ({ commit, getters }, {item, isUpdate}) => {
  return new Promise((resolve, reject) => {
    _(item).keys().forEach(key => {
      if (key.slice(-3) === '_id' && item[key] === 0) {
        item[key] = null
      } else if (typeof item[key] === 'object') {
        _(item[key]).keys().forEach(inKey => {
          if (inKey.slice(-3) === '_id' && item[key][inKey] === 0) {
            item[key][inKey] = null
          }
        })
      }
    })
    item.user_login.password = item.user_login.password || undefined
    let updateItem = {
      user_data: {
        id: item.id,
        name: item.name,
        lock_state: item.lock_state
      },
      user_login: item.user_login,
      client_data: item.client_data,
      user_role_data: item.user_role_data,
      user_info_data: item.user_info_data
    }
    commit('showSpinner', true, {root: true})
    http({method: isUpdate ? 'put' : 'post',
      url: isUpdate ? 'manageUsers/' + item.id : 'manageUsers',
      data: updateItem,
      config: { contentType: 'application/json' }
    })
      .then(response => {
        if (response.status === 201) {
          commit('item', response.data)
          commit('update', response.data)
          commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' данных прошло успешно', snackbar: true, context: 'success'}, { root: true })
          commit('showSpinner', false, {root: true})
        } else {
          throw new Error('status != 201')
        }
        resolve()
      })
      .catch(e => {
        commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'}, {root: true})
        commit('showSpinner', false, {root: true})
        reject(new Error())
      })
  })
}

export const deleteItem = ({ commit, getters }, id) => {
  return new Promise((resolve, reject) => {
    commit('showSpinner', true, {root: true})
    http.delete('manageUsers/' + id)
      .then(response => {
        if (response.status === 204) {
          commit('delete', id)
          commit('showSnackbar', {text: 'Удаление данных прошло успешно', snackbar: true, context: 'success'}, {root: true})
        } else {
          throw new Error('status != 204')
        }
        commit('showSpinner', false, {root: true})
        resolve()
      })
      .catch(e => {
        commit('showSpinner', false, {root: true})
        commit('showSnackbar', {text: 'Удаление данных не удалось. Обратитесь к администратору', snackbar: true, context: 'error'}, {root: true})
        reject(new Error())
      })
  })
}
