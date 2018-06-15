import {mapGetters} from 'vuex'
import questionDialog from '@/components/questionDialog/QuestionDialog.vue'
import updateModal from './updateModal/UpdateModal.vue'

export default {
  name: 'bidDetails',
  data () {
    return {
      search: '',
      tableRowsShown: [10, 20, 50, 100, {text: 'Все', value: -1}],
      rowsPerPageText: 'Строк на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов',
      dialogData: null,
      dialog: false,
      dialogComponent: updateModal,
      qDialog: false,
      qDialogComponent: questionDialog,
      item: {}
    }
  },
  computed: {
    ...mapGetters({items: 'orderPositions/items',
      userData: 'userData',
      usersInfo: 'userInfo/items',
      clientAddresses: 'clientAddresses/items'}),
    userInfo () {
      return _.find(this.usersInfo, {user_id: this.userData.id})
    },
    compItem () {
      let result = _.get(this.$store.getters, 'orders/item')
      this.item = _.cloneDeep(result)
      return result
    },
    headers () {
      let result = [
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Наименование', align: 'left', value: 'product_data.name' },
        { text: 'Артикул', align: 'left', value: 'product_data.product_code' },
        { text: 'Кол-во', align: 'left', value: 'count' },
        { text: 'Сумма за ед.', align: 'left', value: 'amount_per_item' },
        { text: 'Скидка', align: 'left', value: 'amount_per_item_discount' },
        { text: 'Итого', align: 'left', value: 'total_amount' },
        { text: 'Примечание', align: 'left', value: 'description' }
      ]
      if (this.compItem.order_state_id === 2) {
        result = result.concat([
          {sortable: false},
          {sortable: false},
          {sortable: false}])
      }
      return result
    }
  },
  methods: {
    openQDialog: function (itemId) {
      this.dialogData = {
        message: 'Вы действительно хотите удалить позицию заказа?',
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
        return
      }
      this.dialogData = {
        title: (isUpdate ? 'Обновление' : 'Добавление') + ' позиции заказа',
        isClosable: true,
        item: isUpdate ? _.cloneDeep(item) : item,
        isUpdate
      }
      this.dialog = true
    },
    dialogClose (confirmed, item, isUpdate) {
      if (confirmed) {
        item.order_position_state_id = 3
        this.$store.dispatch('orderPositions/updateItem', {item, isUpdate})
      }
      this.dialog = false
    },
    qDialogClose (confirmed, data) {
      if (confirmed) {
        let item = _.cloneDeep(_.find(this.items, {'id': data}))
        item.order_position_state_id = 2
        this.$store.dispatch('orderPositions/updateItem', {item, isUpdate: true})
      }
      this.qDialog = false
    },
    acceptBid () {
      this.item.order_state_id = 2
      this.item.executor_id = this.userData.id
      this.$store.dispatch('orders/updateItem', {item: this.item, isUpdate: true})
    },
    closeBid () {
      this.item.order_state_id = 3
      this.$store.dispatch('orders/updateItem', {item: this.item, isUpdate: true})
    },
    updateAddress () {
      this.$store.dispatch('orders/updateItem', {item: this.item, isUpdate: true})
    }
  },
  created () {
    this.$store.dispatch('orderPositions/getItems')
    this.$store.dispatch('clientAddresses/clientAddressesByClient', {user_id: this.userData.id, client_id: _.get(this.compItem, 'order_user_data.client_id')})
    this.$store.dispatch('userInfo/getItems')
  },
  mounted () {
    this.$refs.dataTable.defaultPagination.descending = true
  }
}
