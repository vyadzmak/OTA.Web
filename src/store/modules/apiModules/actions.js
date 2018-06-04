import http from '../../../httpClient/index'

export default function getActions (link) {
  const getItems = ({ commit, getters }, {id}) => {
    commit('showSpinner', true)
    http.get(link)
      .then(response => {
        if (response.status === 200) {
          commit('items', response.data)
          commit('showSpinner', false)
        } else {
          throw new Error('status != 200')
        }
      })
      .catch(e => {
        commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'})
        commit('showSpinner', false)
      })
  }

  const getItem = ({commit}, {id}) => {
    commit('showSpinner', true)
    http.get(link)
      .then(response => {
        if (response.status === 200) {
          commit('item', response.data)
          commit('showSpinner', false)
        } else {
          throw new Error('status != 200')
        }
      })
      .catch(e => {
        commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'})
        commit('showSpinner', false)
      })
  }

  const updateItem = ({ commit, getters }, {isUpdate, item}) => {
    commit('showSpinner', true)
    http({method: isUpdate ? 'put' : 'post',
      url: isUpdate ? link + '/' + item.id : link,
      data: item,
      config: { contentType: 'application/json' }
    })
      .then(response => {
        if (response.status === 201) {
          commit('update', response.data)
          commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' данных прошло успешно', snackbar: true, context: 'success'})
          commit('showSpinner', false)
        } else {
          throw new Error('status != 201')
        }
      })
      .catch(e => {
        commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' данных не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
        commit('showSpinner', false)
      })
  }
  const deleteItem = ({ commit, getters }, {id}) => {
    commit('showSpinner', true)
    http.delete(link + '/' + id)
      .then(response => {
        if (response.status === 204) {
          commit('delete', id)
          commit('showSnackbar', {text: 'Удаление данных прошло успешно', snackbar: true, context: 'success'})
        } else {
          throw new Error('status != 204')
        }
        commit('showSpinner', false)
      })
      .catch(e => {
        commit('showSpinner', false)
        commit('showSnackbar', {text: 'Удаление конструктора не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
      })
  }
  return {getItems, getItem, updateItem, deleteItem}
}
