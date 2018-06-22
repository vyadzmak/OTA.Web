import {mapGetters} from 'vuex'
import productModal from './productModal/productModal.vue'

export default {
  name: 'displayRecommendation',
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
      tableRowsShown: [10, 20, 50, 100, {text: 'Все', value: -1}],
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
    ...mapGetters({items: 'products/items', userData: 'userData'}),
    compItem () {
      let result = this.$store.getters['viewSettings/item']
      this.item = result ? _.cloneDeep(result) : {}
      this.selectedItems = _.map(_.get(this.item, 'recomendation_elements', []), v => { return {id: v} })
      return result
    }
  },
  methods: {
    updateItem () {
      this.item.recomendation_elements = _.map(this.selectedItems, v => { return v.id })
      this.$store.dispatch('viewSettings/updateItem', {item: this.item, isUpdate: true})
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
    this.$store.dispatch('products/getItems')
  },
  mounted () {
  }
}
