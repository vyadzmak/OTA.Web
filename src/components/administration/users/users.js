import questionDialog from '../../questionDialog/QuestionDialog.vue'
import updateModal from './updateModal/UpdateModal.vue'
import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'users',
  data () {
    return {
      msg: 'Пользователи',
      search: '',
      users: [],
      errors: [],
      headers: [
        { text: 'ID', align: 'left', value: 'id' },
        { text: 'Фамилия', align: 'left', value: 'last_name' },
        { text: 'Имя', align: 'left', value: 'first_name' },
        { text: 'Email', align: 'left', value: 'login_data[0].login' },
        { text: 'Дата регистрации', align: 'left', value: 'login_data[0].registration_date' },
        { text: 'Последняя авторизация', align: 'left', value: 'login_data[0].lastLogin_date' },
        {sortable: false},
        {sortable: false}
      ],
      tableRowsShown: [10, 20, 50, 100, {text: 'Все', value: -1}],
      rowsPerPageText: 'Строк на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов'
    }
  },
  computed: {
    userData: function () {
      return this.$store.getters.userData
    }
  },
  methods: {
    showDeleteModal: function (itemId) {
      let modalConfig = {
        size: 'md',
        data: {
          message: 'Вы действительно хотите удалить пользователя?',
          title: 'Удаление пользователя',
          isClosable: true
        }
      }
      ModalService.open(questionDialog, modalConfig).then(
        modalSubmit => { this.deleteItem(itemId) },
        modalCancel => {}
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    showUpdateModal: function (item) {
      let isUpdate = false
      if (item.id) {
        item = _.cloneDeep(item)
        item.login_data[0].password = ''
        isUpdate = true
      } else {
        item.client_id = this.$route.params.id
        item.first_name = ''
        item.last_name = ''
        item.lock_state = false
        item.login_data = [{
          login: '',
          password: ''
        }]
        item.user_role_id = ''
      }
      this.getUserRoles().then(() => {
        let modalConfig = {
          size: 'lg',
          data: {
            title: (isUpdate ? 'Обновление' : 'Добавление') + ' пользователя',
            isClosable: true,
            item: item
          }
        }
        ModalService.open(updateModal, modalConfig).then(
          modalSubmit => {
            this.updateItem(modalSubmit, isUpdate)
          },
          modalCancel => { console.log(modalCancel) }
        ).catch(err => { console.log(err) })
      }).catch(err => {
        console.log(err)
        this.$store.commit('showSnackbar', {text: 'Не удалось загрузить нового пользователя', snackbar: true, context: 'error'})
      })
    },
    deleteItem: function (itemId) {
      this.$store.commit('showSpinner', true)
      this.$http.delete('users', {params: {id: itemId}})
        .then(response => {
          if (response.status === 200) {
            this.users.splice(_.findIndex(this.users, {id: itemId}), 1)
            this.$store.commit('showSnackbar', {text: 'Удаление пользователя прошло успешно', snackbar: true, context: 'success'})
          } else {
            this.$store.commit('showSnackbar', {text: 'Удаление пользователя не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
          }
          this.$store.commit('showSpinner', false)
        })
        .catch(e => {
          this.errors.push(e)
          this.$store.commit('showSpinner', false)
          this.$store.commit('showSnackbar', {text: 'Удаление пользователя не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
        })
    },
    updateItem: function (item, isUpdate) {
      this.$store.commit('showSpinner', true)
      this.$http({method: isUpdate ? 'put' : 'post',
        url: isUpdate ? 'user/' + item.id : 'users',
        data: item,
        config: { contentType: 'application/json' }
      })
        .then(response => {
          let responseData = response.data && response.data !== 'Error' ? response.data : null
          if (responseData) {
            if (isUpdate) {
              this.users.splice(_.findIndex(this.users, {id: item.id}), 1)
            }
            this.users.push(responseData)
            this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' пользователя прошло успешно', snackbar: true, context: 'success'})
          } else {
            this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' пользователя не удалось', snackbar: true, context: 'error'})
          }
          this.$store.commit('showSpinner', false)
        })
        .catch(e => {
          this.errors.push(e)
          this.$store.commit('showSpinner', false)
          this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' пользователя не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
        })
    },
    getUserRoles (isUpdate) {
      this.$store.commit('showSpinner', true)
      return new Promise((resolve, reject) => {
        this.$http.get('userRoles')
          .then(response => {
            if (response.data && response.data !== 'Error') {
              this.$store.commit('setUpdateProperty', response.data)
            }
            this.$store.commit('showSpinner', false)
            resolve()
          })
          .catch(e => {
            this.$store.commit('showSpinner', false)
            this.errors.push(e)
            reject(e)
          })
      })
    }
  },
  created () {
    this.$store.commit('showSpinner', true)
    this.$http.get(`clientUsers/` + (this.$route.params.id ? this.$route.params.id : this.userData.client_id))
      .then(response => {
        this.$store.commit('showSpinner', false)
        this.users = response.data
      })
      .catch(e => {
        this.errors.push(e)
        this.$store.commit('showSpinner', false)
      })
  },
  mounted () {
    this.$refs.usersDataTable.defaultPagination.descending = true
  }
}
