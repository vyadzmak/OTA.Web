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
    ...mapGetters({items: 'crudUsers/items',
      userData: 'userData',
      user: 'crudUsers/item',
      client: 'clients/item'})
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
          user_role_data: null,
          user_login: {
            login: '',
            password: ''
          },
          client_data: {id: this.client.id},
          user_info_data: {
            email: '',
            phone_number: '',
            birthday: null,
            avatar_id: null
          }
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
    dialogClose (confirmed, item, isUpdate) {
      if (confirmed) {
        this.$store.dispatch('crudUsers/updateItem', {item, isUpdate})
      }
      this.dialog = false
    },
    qDialogClose (confirmed, data) {
      if (confirmed) {
        this.$store.dispatch('crudUsers/deleteItem', data)
      }
      this.qDialog = false
    }
  },
  created () {
    this.$store.dispatch('crudUsers/usersByClient', {user_id: this.userData.id, client_id: this.client.id})
  },
  mounted () {
    this.$refs.dataTable.defaultPagination.descending = true
  },
  beforeDestroy () {
    this.$store.commit('crudUsers/items', [])
    this.$store.commit('crudUsers/item', {})
  }
}
