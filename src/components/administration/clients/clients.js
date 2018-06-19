import {mapGetters} from 'vuex'
import questionDialog from '@/components/questionDialog/QuestionDialog.vue'
import updateModal from './updateModal/UpdateModal.vue'

export default {
  name: 'currencies',
  data () {
    return {
      search: '',
      headers: [
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Имя', align: 'left', value: 'name' },
        { text: 'Адрес', align: 'left', value: 'client_addresses_data[0].address' },
        { text: 'Email', align: 'left', value: 'client_info_data[0].email' },
        { text: 'Телефон', align: 'left', value: 'client_info_data[0].phone_number' },
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
    ...mapGetters({items: 'clients/items', userData: 'userData'})
  },
  methods: {
    openQDialog: function (itemId) {
      this.dialogData = {
        message: 'Вы действительно хотите удалить клиента?',
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
          client_type_id: null,
          lock_state: false,
          registration_number: ''
        }
      }
      this.dialogData = await this.$store.dispatch('clientTypes/getItems')
      this.dialogData = {
        title: (isUpdate ? 'Обновление' : 'Добавление') + ' клиента',
        isClosable: true,
        item: isUpdate ? _.cloneDeep(item) : item,
        isUpdate
      }
      this.dialog = true
    },
    dialogClose (confirmed, item, isUpdate) {
      if (confirmed) {
        if (!isUpdate) {
          item.registration_date = new Date()
        }
        this.$store.dispatch('clients/updateItem', {item, isUpdate})
      }
      this.dialog = false
    },
    qDialogClose (confirmed, data) {
      if (confirmed) {
        this.$store.dispatch('clients/deleteItem', data)
      }
      this.qDialog = false
    },
    goTo (item) {
      this.$store.commit('clients/item', item)
      this.$router.push({name: 'administration.client'})
    }
  },
  created () {
    this.$store.dispatch('clients/routeAdminClients', {'user_id': this.userData.id})
  },
  mounted () {
    this.$refs.dataTable.defaultPagination.descending = true
  }
}
