import types from '@/store/mutation-types'
import http from '@/httpClient/index'
import {getRoutes} from '@/router/routerNames'

export const login = ({ commit, getters }, {login, password, rememberMe}) => {
  return new Promise((resolve, reject) => {
    commit(types.showSpinner, true)
    http.get('userAuth',
      {params: {login, password},
        timeout: 30000})
      .then(response => {
        commit(types.showSpinner, false)
        let responseData = response.data
        let savedUser = responseData.user_data
        savedUser.user_role_data = responseData.user_role_data
        savedUser.user_role_data.user_role_route_access = getRoutes(savedUser.user_role_data.user_role_route_access.length > 0 ? savedUser.user_role_data.user_role_route_access : {})
        savedUser.login_data = {
          login: responseData.login,
          password: responseData.password,
          orders_count: responseData.orders_count
        }
        if (rememberMe) {
          commit(types.R_USER_DATA, savedUser)
        } else {
          commit(types.USER_DATA, savedUser)
        }
        resolve()
      })
      .catch(e => {
        let text = _.get(e, 'response.data.message', false) || 'Авторизация не удалась. Превышено время ожидания'
        commit('showSnackbar', {text, snackbar: true, context: 'error'})
        commit(types.showSpinner, false)
        reject(new Error())
      })
  })
}

export const logout = ({ commit }) => {
  commit(types.R_USER_DATA, null)
}
