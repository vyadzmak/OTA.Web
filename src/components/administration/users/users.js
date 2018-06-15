import {mapGetters} from 'vuex'
import questionDialog from '@/components/questionDialog/QuestionDialog.vue'
import updateModal from './updateModal/UpdateModal.vue'

export default {
  name: 'users',
  data () {
    return {
      search: '',
      headers: [
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Логин', align: 'left', value: 'user_login.login' },
        { text: 'Имя', align: 'left', value: 'name' },
        { text: 'Роль', align: 'left', value: 'user_role_data.title' },
        { text: 'Клиент', align: 'left', value: 'client_data.name' },
        {sortable: false},
        {sortable: false}
      ],
      tableRowsShown: [10, 20, 50, 100, {text: 'Все', value: -1}],
      rowsPerPageText: 'Строк на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов',
      dialogData: null,
      dialog: false,
      dialogComponent: updateModal,
      qDialog: false,
      qDialogComponent: questionDialog
    }
  },
  computed: {
    ...mapGetters({items: 'users/items', userData: 'userData', user: 'users/item'})
  },
  methods: {
    openQDialog (itemId) {
      this.dialogData = {
        message: 'Вы действительно хотите удалить пользователя?',
        title: 'Удаление',
        isClosable: true,
        data: itemId
      }
      this.qDialog = true
    },
    openDialog: async function (item) {
      let isUpdate = true
      if (!item) {
        isUpdate = false
        item = {
          name: '',
          lock_state: false,
          client_id: null,
          user_role_id: null,
          user_role_data: null,
          user_login: {
            login: '',
            password: ''
          },
          client_data: null
        }
      } else {
        item.user_login.password = ''
      }
      await this.$store.dispatch('clients/getItems')
      await this.$store.dispatch('userRoles/getItems')
      this.dialogData = {
        title: (isUpdate ? 'Обновление' : 'Добавление') + ' пользователя',
        isClosable: true,
        item: isUpdate ? _.cloneDeep(item) : item,
        isUpdate
      }
      this.dialog = true
    },
    dialogClose: async function (confirmed, item, isUpdate) {
      if (confirmed) {
        item.user_role_id = item.user_role_data.id
        item.client_id = item.client_data.id
        let loginData = item.user_login
        item.user_login = undefined
        item.user_role_data = undefined
        item.client_data = undefined
        let res = await this.$store.dispatch('users/updateItem', {item, isUpdate})
        if (!loginData.id) {
          loginData.registration_date = new Date()
          loginData.user_id = this.user.id
        } else {
          if (!loginData.password) {
            loginData.password = undefined
          }
        }
        res = await this.$store.dispatch('userLogins/updateItem', {item: loginData, isUpdate})
        this.$store.dispatch('users/routeAdminUsers', {user_id: this.userData.id})
        console.log(res)
      }
      this.dialog = false
    },
    qDialogClose (confirmed, data) {
      if (confirmed) {
        this.$store.dispatch('users/deleteItem', data)
      }
      this.qDialog = false
    }
  },
  created () {
    this.$store.dispatch('users/routeAdminUsers', {user_id: this.userData.id})
  },
  mounted () {
    this.$refs.dataTable.defaultPagination.descending = true
  }
}
