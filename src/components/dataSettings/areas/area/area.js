import {mapGetters} from 'vuex'
import questionDialog from '@/components/questionDialog/QuestionDialog.vue'
import updateModal from './updateModal/UpdateModal.vue'

export default {
  name: 'units',
  data () {
    return {
      search: '',
      headers: [
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Город/а.е.', align: 'left', value: 'name' },
        { text: 'Область/Регион', align: 'left', value: 'cityCatalog_data.name' },
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
    ...mapGetters({items: 'cityCatalog/items', userData: 'userData', item: 'areaCatalog/item'})
  },
  methods: {
    openQDialog: function (itemId) {
      this.dialogData = {
        message: 'Вы действительно хотите удалить город/а.е.?',
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
          name: '',
          area_id: this.item.id
        }
      }
      this.dialogData = {
        title: (isUpdate ? 'Обновление' : 'Добавление') + ' города/а.е.',
        isClosable: true,
        item: isUpdate ? _.cloneDeep(item) : item,
        isUpdate
      }
      this.dialog = true
    },
    dialogClose (confirmed, item, isUpdate) {
      if (confirmed) {
        this.$store.dispatch('cityCatalog/updateItem', {item, isUpdate})
      }
      this.dialog = false
    },
    qDialogClose (confirmed, data) {
      if (confirmed) {
        this.$store.dispatch('cityCatalog/deleteItem', data)
      }
      this.qDialog = false
    }
  },
  created () {
    this.$store.dispatch('cityCatalog/cityCatalogByArea', {user_id: this.userData.id, area_id: this.item.id})
  },
  mounted () {
    this.$refs.dataTable.defaultPagination.descending = true
  }
}
