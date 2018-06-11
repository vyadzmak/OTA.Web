import {mapGetters} from 'vuex'
import questionDialog from '@/components/questionDialog/QuestionDialog.vue'
import updateModal from './updateModal/UpdateModal.vue'

export default {
  name: 'settings',
  data () {
    return {
      msg: 'Настройки',
      search: '',
      headers: [
        { text: 'ID', align: 'left', value: 'id' },
        { text: 'Наименование', align: 'left', value: 'name' },
        { text: 'Значение', align: 'left', value: 'value' },
        {sortable: false},
        {sortable: false}
      ],
      tableRowsShown: [10, 20, 50, 100, {text: 'Все', value: -1}],
      rowsPerPageText: 'Строк на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов',
      dialog: false,
      dialogComponent: updateModal,
      dialogData: null,
      qDialog: false,
      qDialogComponent: questionDialog
    }
  },
  computed: {
    ...mapGetters({userData: 'userData', items: 'settings/items'})
  },
  methods: {
    openQDialog: function (itemId) {
      this.dialogData = {
        message: 'Вы действительно хотите удалить настройку?',
        title: 'Удаление',
        isClosable: true,
        data: itemId
      }
      this.qDialog = true
    },
    openDialog (item) {
      let isUpdate = true
      if (!item) {
        isUpdate = false
        item = {
          system_name: '',
          name: '',
          display_value: '',
          is_default: false
        }
      }
      this.dialogData = {
        title: (isUpdate ? 'Обновление' : 'Добавление') + ' настройки',
        isClosable: true,
        item: isUpdate ? _.cloneDeep(item) : item,
        isUpdate
      }
      this.dialog = true
    },
    dialogClose (confirmed, item, isUpdate) {
      if (confirmed) {
        this.$store.dispatch('settings/updateItem', {item, isUpdate})
      }
      this.dialog = false
    },
    qDialogClose (confirmed, data) {
      if (confirmed) {
        this.$store.dispatch('settings/deleteItem', data)
      }
      this.qDialog = false
    }
  },
  created () {
    this.$store.dispatch('settings/routeAdminSettings', {user_id: this.userData.id})
  },
  mounted () {
    this.$refs.dataTable.defaultPagination.descending = true
  }
}
