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
        savedUser.user_role_data = responseData.user_data.user_role_data
        savedUser.client_data = responseData.user_data.client_data
        savedUser.user_role_data.user_role_route_access = getRoutes(savedUser.user_role_data.user_role_route_access.length > 0 ? savedUser.user_role_data.user_role_route_access[0] : {})
        savedUser.login_data = {
          login: responseData.login,
          password: responseData.password
        }
        savedUser.user_info_data = {}
        savedUser.no_image_url = responseData.no_image_url
        savedUser.no_avatar_url = responseData.no_avatar_url
        savedUser.bid = responseData.orders_count
        savedUser.events = responseData.events_count
        savedUser.thumbs_avatar_path = responseData.thumbs_avatar_path
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
