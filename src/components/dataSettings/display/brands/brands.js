import {mapGetters} from 'vuex'

export default {
  name: 'displayBrands',
  data () {
    return {
      search: '',
      headers: [
        {sortable: false},
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Наименование', align: 'left', value: 'name' },
        { text: 'Краткое описание', align: 'left', value: 'short_description' }
      ],
      tableRowsShown: [10, 20, 50, 100, {text: 'Все', value: -1}],
      rowsPerPageText: 'Строк на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов',
      item: {},
      selectedItems: []
    }
  },
  computed: {
    ...mapGetters({items: 'brandsCatalog/items', userData: 'userData'}),
    compItem () {
      let result = this.$store.getters['viewSettings/item']
      this.item = result ? _.cloneDeep(result) : {}
      this.selectedItems = _.map(_.get(this.item, 'brand_elements', []), v => { return {id: v} })
      return result
    }
  },
  methods: {
    updateItem () {
      this.item.brand_elements = _.map(this.selectedItems, v => { return v.id })
      this.$store.dispatch('viewSettings/updateItem', {item: this.item, isUpdate: true})
    }
  },
  created () {
    this.$store.dispatch('brandsCatalog/getItems')
  },
  mounted () {
  }
}
