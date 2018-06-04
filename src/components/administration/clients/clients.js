import questionDialog from '../../questionDialog/QuestionDialog.vue'
import updateModal from './updateModal/UpdateModal.vue'
import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'companies',
  data () {
    return {
      companies: [],
      errors: [],
      search: '',
      headers: [
        { text: 'ID', align: 'left', value: 'id' },
        { text: 'Наименование', align: 'left', value: 'name' },
        { text: 'Регистрационный номер', align: 'left', value: 'registration_number' },
        { text: 'Дата регистрации', align: 'left', value: 'registration_date' },
        { text: 'Тип компании', align: 'left', value: 'client_type.name' },
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
    goToUsers: function (userId) {
      this.$router.push({name: 'Users', params: {id: userId}})
    },
    showDeleteModal: function (itemId) {
      let modalConfig = {
        size: 'md',
        data: {
          message: 'Вы действительно хотите удалить компанию?',
          title: 'Удаление компании',
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
      let isUpdate = true
      this.getClientTypes()
      if (!item.id) {
        isUpdate = false
        item = {name: '',
          registration_number: '',
          lock_state: false,
          client_type_id: null,
          employees: [],
          bdate: null
        }
      }
      let modalConfig = {
        size: 'lg',
        data: {
          title: (isUpdate ? 'Обновление' : 'Добавление') + ' компании',
          isClosable: true,
          item: isUpdate ? Object.assign({}, item) : item
        }
      }
      ModalService.open(updateModal, modalConfig).then(
        modalSubmit => {
          this.updateItem(modalSubmit, isUpdate)
        },
        modalCancel => { console.log(modalCancel) }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    deleteItem: function (itemId) {
      this.$store.commit('showSpinner', true)
      this.$http.delete('client', {params: {id: itemId}})
        .then(response => {
        // if (response.data && response.data !== 'Error') {
          this.companies.splice(this.companies.findIndex((element, index, array) => {
            if (element.id === itemId) {
              return true
            }
          }), 1)
          this.$store.commit('showSnackbar', {text: 'Удаление клиента прошло успешно', snackbar: true, context: 'success'})
          // } else {
          //   this.$store.commit('showSnackbar', {text: 'Удаление клиентов компании не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
          // }
          this.$store.commit('showSpinner', false)
        })
        .catch(e => {
          this.errors.push(e)
          this.$store.commit('showSpinner', false)
          this.$store.commit('showSnackbar', {text: 'Удаление клиентов компании не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
        })
    },
    updateItem: function (item, isUpdate) {
      this.$store.commit('showSpinner', true)
      this.$http({method: isUpdate ? 'put' : 'post',
        url: isUpdate ? 'client/' + item.id : 'clients',
        data: item,
        config: { contentType: 'application/json' }
      })
        .then(response => {
          let responseData = response.data ? (response.data !== 'Error' ? response.data : null) : null
          if (responseData) {
            if (isUpdate) {
              this.companies.splice(this.companies.findIndex((element, index, array) => {
                if (element.id === item.id) {
                  return true
                }
              }), 1)
            }
            this.companies.push(responseData)
            this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' компании прошло успешно', snackbar: true, context: 'success'})
          } else {
            this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' компании не удалось', snackbar: true, context: 'error'})
          }
          this.$store.commit('showSpinner', false)
        })
        .catch(e => {
          this.errors.push(e)
          this.$store.commit('showSpinner', false)
          this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' компании не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
        })
    },
    getClientTypes () {
      this.$store.commit('showSpinner', true)
      this.$http.get('clientTypes')
        .then(response => {
          if (response.data && response.data !== 'Error') {
            this.$store.commit('showSpinner', false)
            this.$store.commit('setUpdateProperty', response.data)
          } else {
            this.$store.commit('showSnackbar', {text: 'Не удалось загрузить типы клиента', snackbar: true, context: 'error'})
          }
          return []
        })
        .catch(e => {
          this.errors.push(e)
          this.$store.commit('showSpinner', false)
          this.$store.commit('showSnackbar', {text: 'Не удалось загрузить типы клиента', snackbar: true, context: 'error'})
          return []
        })
    }
  },
  created () {
    this.$store.commit('showSpinner', true)
    this.$http.get('clients')
      .then(response => {
        this.$store.commit('showSpinner', false)
        if (response.data) {
          this.companies = response.data
        } else {
          this.$store.commit('showSnackbar', {text: 'Загрузка клиентов компании не удалась. Обратитесь к администратору', snackbar: true, context: 'error'})
        }
      })
      .catch(e => {
        this.errors.push(e)
        this.$store.commit('showSpinner', false)
        this.$store.commit('showSnackbar', {text: 'Загрузка клиентов компании не удалась. Обратитесь к администратору', snackbar: true, context: 'error'})
      })
  },
  mounted () {
    this.$refs.companiesDataTable.defaultPagination.descending = true
  }
}
