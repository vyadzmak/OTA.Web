import http from '../../../httpClient/index'

export default function getActions (link) {
  return function () {
    const getItems = ({ commit, getters }, payload) => {
      commit('showSpinner', true, { root: true })
      http.get(link)
        .then(response => {
          if (response.status === 200) {
            commit('items', response.data)
            commit('showSpinner', false, { root: true })
          } else {
            throw new Error('status != 200')
          }
        })
        .catch(e => {
          commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'}, { root: true })
          commit('showSpinner', false, { root: true })
        })
    }

    const getItem = ({commit}, {id}) => {
      commit('showSpinner', true, { root: true })
      http.get(link)
        .then(response => {
          if (response.status === 200) {
            commit('item', response.data)
            commit('showSpinner', false, { root: true })
          } else {
            throw new Error('status != 200')
          }
        })
        .catch(e => {
          commit('showSnackbar', {text: 'Не удалось загрузить данные. Обратитесь к администратору', snackbar: true, context: 'error'}, { root: true })
          commit('showSpinner', false, { root: true })
        })
    }

    const updateItem = ({ commit, getters }, {item, isUpdate}) => {
      commit('showSpinner', true, { root: true })
      http({method: isUpdate ? 'put' : 'post',
        url: isUpdate ? link + '/' + item.id : link,
        data: item,
        config: { contentType: 'application/json' }
      })
        .then(response => {
          if (response.status === 201) {
            commit('update', response.data)
            commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' данных прошло успешно', snackbar: true, context: 'success'}, { root: true })
            commit('showSpinner', false, { root: true })
          } else {
            throw new Error('status != 201')
          }
        })
        .catch(e => {
          commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' данных не удалось. Обратитесь к администратору', snackbar: true, context: 'error'}, { root: true })
          commit('showSpinner', false, { root: true })
        })
    }
    const deleteItem = ({ commit, getters }, id) => {
      commit('showSpinner', true, { root: true })
      http.delete(link + '/' + id)
        .then(response => {
          if (response.status === 204) {
            commit('delete', id)
            commit('showSnackbar', {text: 'Удаление данных прошло успешно', snackbar: true, context: 'success'}, { root: true })
          } else {
            throw new Error('status != 204')
          }
          commit('showSpinner', false, { root: true })
        })
        .catch(e => {
          commit('showSpinner', false, { root: true })
          commit('showSnackbar', {text: 'Удаление конструктора не удалось. Обратитесь к администратору', snackbar: true, context: 'error'}, { root: true })
        })
    }
    return {getItems, getItem, updateItem, deleteItem}
  }
}
