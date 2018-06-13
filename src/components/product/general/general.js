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
      sDescRules: [(v) => (v.length <= 250) || 'Не более 250 символов'],
      descRules: [(v) => (v.length <= 1500) || 'Не более 1500 символов'],
      numRules: [
        (v) => !!v || 'Стоимость должна быть заполнена',
        (v) => (!isNaN(parseFloat(v)) && isFinite(v)) || 'Введите число'
      ]
    }
  },
  computed: {
    ...mapGetters({userData: 'userData',
      currencyTypes: 'currencyCatalog/items',
      brandTypes: 'brandsCatalog/items',
      partnerTypes: 'partnersCatalog/items',
      unitTypes: 'unitCatalog/items'}),
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
  created () {
    this.$store.dispatch('products/routeCatalogProductsGeneral', {user_id: this.userData.id, product_id: this.compItem.id})
    this.$store.dispatch('brandsCatalog/getItems')
    this.$store.dispatch('partnersCatalog/getItems')
    this.$store.dispatch('currencyCatalog/getItems')
    this.$store.dispatch('unitCatalog/getItems')
  },
  mounted () {
  }
}
