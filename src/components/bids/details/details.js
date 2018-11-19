import {mapGetters} from 'vuex'
import questionDialog from '@/components/questionDialog/QuestionDialog.vue'
import updateModal from './updateModal/UpdateModal.vue'
import productModal from './productModal/productModal.vue'

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
      productDialog: false,
      productDialogComponent: productModal,
      item: {},
      productInfo: {},
      userDetails: {}
    }
  },
  computed: {
    ...mapGetters({items: 'orderPositions/items',
      usersInfo: 'userInfo/items',
      clientAddresses: 'clientAddresses/items'}),
    compItem () {
      let result = _.get(this.$store.getters, 'orders/item')
      if (!this.item.id) {
        this.item = _.cloneDeep(result)
      }
      return result
    },
    compUserDetails () {
      let result = _.get(this.$store.getters, 'crudUsers/item')
      if (!this.userDetails.id || this.userDetails.id === result.id) {
        this.userDetails = _.cloneDeep(result)
      }
      return result
    },
    userInfoPhoneNumber () {
      return _.get(this.$store.getters, 'crudUsers/item.user_info_data.phone_number')
    },
    userInfoEmail () {
      return _.get(this.$store.getters, 'crudUsers/item.user_info_data.email')
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
        { text: 'Акция', align: 'left', value: 'product_data.is_stock_product' },
        { text: 'Примечание', align: 'left', value: 'description' },
        { text: 'Партнер', align: 'left', value: 'product_data.partner_name' },
        { text: 'Накладная', align: 'left', value: 'need_invoice' }
      ]
      if (this.compItem.order_state_id === 2) {
        result = result.concat([
          {sortable: false},
          {sortable: false},
          {sortable: false}])
      }
      if (this.compItem.order_state_id === 3) {
        result = result.concat([{sortable: false}, {sortable: false}])
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
    async dialogClose (confirmed, item, isUpdate) {
      if (confirmed) {
        item.order_position_state_id = 3
        item.amount_per_item_discount = item.count ? item.product_data.discount_amount : 0
        item.alt_amount_per_item_discount = item.alt_count ? item.product_data.alt_discount_amount : 0
        let {totalSum, totalAltDiscount, totalDiscount} = this.countProductAmounts(item)

        item.total_amount = totalSum - totalAltDiscount - totalDiscount
        await this.$store.dispatch('orderPositions/updateItem', {item, isUpdate})
        this.item.amount = 0
        this.item.discount_amount = 0
        this.item.total_amount = 0

        this.items.forEach(element => {
          let {totalSum, totalAltDiscount, totalDiscount} = this.countProductAmounts(element)
          this.item.amount += totalSum
          this.item.discount_amount += totalAltDiscount + totalDiscount
          this.item.total_amount += totalSum - totalAltDiscount - totalDiscount
        })

        this.$store.dispatch('orders/updateItem', {item: this.item, isUpdate: true})
      }
      this.dialog = false
    },
    countProductAmounts (item) {
      let totalDiscount = item.count * item.product_data.discount_amount
      let totalAltDiscount = item.alt_count * item.product_data.alt_discount_amount
      let totalSum = item.alt_count * item.product_data.alt_amount +
        item.count * item.product_data.amount
      return {totalSum, totalAltDiscount, totalDiscount}
    },

    qDialogClose (confirmed, data) {
      if (confirmed) {
        let item = _.cloneDeep(_.find(this.items, {'id': data}))
        item.order_position_state_id = 2
        this.$store.dispatch('orderPositions/updateItem', {item, isUpdate: true})
      }
      this.qDialog = false
    },
    openProductDialog: async function (item) {
      this.productInfo = await this.$store.dispatch('products/getItem', {id: item.product_data.id})
      this.productInfo = _.get(this.$store, 'getters.products/item', {})
      this.dialogData = {
        title: item.product_data.name,
        isClosable: true
      }
      this.productDialog = true
    },
    productDialogClose () {
      this.productDialog = false
    },
    acceptBid () {
      if (_.get(this.compItem, 'client_address_data.confirmed')) {
        this.item.order_state_id = 2
        this.item.executor_id = this.userData.id
        this.item.processed_date = this.$moment().utc().format()
        this.$store.dispatch('orders/updateItem', {item: this.item, isUpdate: true})
      } else {
        this.$store.commit('showSnackbar', {text: 'Адрес заявки не был подтвержден, поэтому невозможно принять заявку в работу. Подтвердите адрес и повторите', snackbar: true, context: 'error'})
      }
    },
    closeBid () {
      this.item.order_state_id = 3
      this.item.execute_date = this.$moment.utc().format()
      this.$store.dispatch('orders/updateItem', {item: this.item, isUpdate: true})
    },
    cancelBid () {
      this.item.order_state_id = 4
      this.$store.dispatch('orders/updateItem', {item: this.item, isUpdate: true})
    },
    updateAddress () {
      this.$store.dispatch('orders/updateItem', {item: this.item, isUpdate: true})
    }
  },
  created () {
    this.$store.dispatch('orderPositions/orderPositionsByOrders', {user_id: this.userData.id, order_id: this.compItem.id})
    this.$store.dispatch('clientAddresses/clientAddressesByClient', {user_id: this.userData.id, client_id: _.get(this.compItem, 'order_user_data.client_id')})
    this.$store.dispatch('crudUsers/userDetails', {user_id: this.userData.id, request_user_id: _.get(this.item, 'order_user_data.id')})
  },
  mounted () {
    this.$refs.dataTable.defaultPagination.descending = true
  },
  beforeDestroy () {
    this.$store.commit('orderPositions/items', [])
    this.$store.commit('clientAddresses/items', [])
    this.$store.commit('crudUsers/item', {})
  }
}
