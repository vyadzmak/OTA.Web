import {mapGetters} from 'vuex'
import productModal from './productModal/productModal.vue'

export default {
  name: 'productRecommendation',
  data () {
    return {
      search: '',
      headers: [
        {sortable: false},
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Наименование', align: 'left', value: 'name' },
        { text: 'Артикул', align: 'left', value: 'product_code' },
        {sortable: false}
      ],
      tableRowsShown: [10, 20, 50, 100],
      rowsPerPageText: 'Строк на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов',
      item: {},
      selectedItems: [],
      dialogData: null,
      productDialog: false,
      productDialogComponent: productModal
    }
  },
  computed: {
    ...mapGetters({items: 'routeCatalogProductsRecommendations/items', userData: 'userData'}),
    product () {
      let result = _.get(this.$store, 'getters.products/item', {})
      this.item = _.cloneDeep(result)
      this.selectedItems = _.map(_.get(this.item, 'product_recomendations', []), v => { return {id: v} })
      return result
    }
  },
  methods: {
    updateItem () {
      this.item.product_recomendations = _.map(this.selectedItems, v => { return v.id })
      this.$store.dispatch('products/updateItem', {item: this.item, isUpdate: true})
    },
    openProductDialog: async function (item) {
      let productInfo = await this.$http.get('products/' + item.id)
      if (productInfo.status === 200) {
        productInfo = productInfo.data
      } else {
        return
      }
      this.dialogData = {
        title: item.name,
        isClosable: true,
        item: productInfo
      }
      this.productDialog = true
    },
    productDialogClose () {
      this.productDialog = false
    }
  },
  created () {
    this.$store.dispatch('routeCatalogProductsRecommendations/getItems', {user_id: this.userData.id, product_id: this.product.id})
  },
  mounted () {
    this.$refs.dataTable.defaultPagination.descending = true
  }
}
