import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistedState from 'vuex-persistedstate'
import * as mutations from './mutations'
import loginUser from './modules/loginUser/loginUser'
import apiModules from './modules/apiModules/apiModules'
import ApiModule from './modules/apiModules/ApiModule'

const importedModules = {}

apiModules.forEach(element => {
  importedModules[element.link] = new ApiModule(element.link, element.additional)
})

importedModules.loginUser = loginUser

Vue.use(Vuex)

const sessionStorage = VuexPersistedState({
  storage: window.sessionStorage
})

const localStorageMutations = ['addRUserData', 'deleteUserData']

const localStorage = VuexPersistedState({
  storage: window.localStorage,
  reducer: state => ({
    userData: state.userData
  }),
  filter: mutation => (localStorageMutations.indexOf(mutation.type) !== -1)
})

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // check if something updates our model not through mutation
  state: {
    loading: 0,
    snackbarOptions: {snackbar: false},
    updateProperty: null,
    catalogBack: true,
    categoryBack: true
  },
  // getters
  getters: {
    snackbarOptions: state => state.snackbarOptions,
    updateProperty: state => state.updateProperty,
    loading: state => state.loading,
    catalogBack: state => state.catalogBack,
    categoryBack: state => state.categoryBack
  },
  mutations,
  plugins: [localStorage, sessionStorage],
  modules: importedModules
})

export default store
