import types from '../../mutation-types'
import http from '../../../httpClient/index'

export const login = ({ commit, getters }, {login, password, rememberMe}) => {
  return new Promise((resolve, reject) => {
    commit(types.showSpinner, true)
    http.post('login',
      {login, password},
      {timeout: 30000})
      .then(response => {
        commit(types.showSpinner, false)
        let responseData = response.data
        if (responseData.user_data.lock_state) {
          commit('showSnackbar', {text: 'Пользователь заблокирован. Обратитесь к администратору', snackbar: true, context: 'warning'})
          reject(new Error())
        } else {
          let savedUser = responseData.user_data
          savedUser.login_data = {}
          savedUser.login_data.login = responseData.login
          savedUser.login_data.password = responseData.password
          if (rememberMe) {
            commit(types.R_USER_DATA, savedUser)
          } else {
            commit(types.USER_DATA, savedUser)
          }
          resolve()
        }
      })
      .catch(e => {
        let text = 'Авторизация не удалась. Превышено время ожидания'
        if (e.response) {
          text = e.response.status === 403 ? 'Пользователь не найден. Введите верный логин и пароль' : 'Ошибка авторизации, обратитесь к администратору.'
        }
        commit('showSnackbar', {text, snackbar: true, context: 'error'})
        commit(types.showSpinner, false)
        reject(new Error())
      })
  })
}

export const logout = ({ commit }) => {
  commit(types.R_USER_DATA, null)
}
