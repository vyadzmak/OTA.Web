import {mapGetters} from 'vuex'

export default {
  name: 'productGeneral',
  data () {
    return {
      item: {},
      sNameRules: [
        (v) => !!v || 'Наименование должно быть заполнено',
        (v) => (v && v.length <= 250) || 'Не более 250 символов'
      ],
      sDescRules: [(v) => (!v || v.length <= 250) || 'Не более 250 символов'],
      descRules: [(v) => (!v || v.length <= 1500) || 'Не более 1500 символов'],
      numRules: [
        (v) => !!v || 'Стоимость должна быть заполнена',
        (v) => (!isNaN(parseFloat(v)) && isFinite(v)) || 'Введите число'
      ],
      selectCategories: []
    }
  },
  computed: {
    ...mapGetters({
      currencyTypes: 'currencyCatalog/items',
      unitTypes: 'unitCatalog/items',
      brandTypes: 'brandsCatalog/items',
      partnerTypes: 'partnersCatalog/items'}),
    compItem () {
      let result = _.get(this.$store, 'getters.products/item', {})
      this.item = _.cloneDeep(result)
      return result
    }
  },
  methods: {
    updateItem () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('products/updateItem', {item: this.item, isUpdate: true})
      }
    }
  },
  async created () {
    if (this.compItem.id) {
      this.$store.dispatch('products/routeCatalogProductsGeneral', {user_id: this.userData.id, product_id: this.compItem.id})
      this.$store.dispatch('brandsCatalog/getItems')
      this.$store.dispatch('partnersCatalog/getItems')
      this.$store.dispatch('currencyCatalog/getItems')
      this.$store.dispatch('unitCatalog/getItems')
      let selectCategories = await this.$http.get('categoryListWithoutChildCategories', {params: {id: this.userData.id}})
      if (selectCategories.status === 200) {
        selectCategories = selectCategories.data
        this.selectCategories = [{id: -1, name: 'Нет'}, ...selectCategories]
      } else {
        this.selectCategories = []
      }
    }
  },
  mounted () {
  }
}
