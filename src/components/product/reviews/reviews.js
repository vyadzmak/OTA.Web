import {mapGetters} from 'vuex'
import questionDialog from '@/components/questionDialog/QuestionDialog.vue'
import updateModal from './updateModal/UpdateModal.vue'

export default {
  name: 'productReviews',
  data () {
    return {
      search: '',
      headers: [
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Автор', align: 'left', value: 'comment_user_data.name' },
        { text: 'Комментарий', align: 'left', value: 'comment_text' },
        { text: 'Дата', align: 'left', value: 'creation_date' },
        { text: 'Оценка', align: 'left', value: 'rate' },
        { text: 'Скрыт', align: 'left', value: 'is_delete' },
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
    ...mapGetters({items: 'productComments/items', userData: 'userData', product: 'products/item'})
  },
  methods: {
    openQDialog: function (itemId) {
      this.dialogData = {
        message: 'Вы действительно хотите удалить отзыв?',
        title: 'Удаление',
        isClosable: true,
        data: itemId
      }
      this.qDialog = true
    },
    openDialog (item) {
      let isUpdate = true
      if (!item) {
        return
      }
      this.dialogData = {
        title: (isUpdate ? 'Обновление' : 'Добавление') + ' отзыва',
        isClosable: true,
        item: isUpdate ? _.cloneDeep(item) : item,
        isUpdate
      }
      this.dialog = true
    },
    dialogClose (confirmed, item, isUpdate) {
      if (confirmed) {
        this.$store.dispatch('productComments/updateItem', {item, isUpdate})
      }
      this.dialog = false
    },
    qDialogClose (confirmed, data) {
      if (confirmed) {
        this.$store.dispatch('productComments/deleteItem', data)
      }
      this.qDialog = false
    }
  },
  created () {
    this.$store.dispatch('productComments/routeCatalogProductsComments', {user_id: this.userData.id, product_id: this.product.id})
  },
  mounted () {
    this.$refs.dataTable.defaultPagination.descending = true
  }
}
