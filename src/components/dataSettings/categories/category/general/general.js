import {mapGetters} from 'vuex'
export default {
  name: 'generalBrand',
  data () {
    return {
      item: {},
      sNameRules: [
        (v) => !!v || 'Наименование должно быть заполнено',
        (v) => (v && v.length <= 270) || 'Не более 270 символов'
      ],
      sDescRules: [(v) => (v.length <= 600) || 'Не более 600 символов'],
      descRules: [(v) => (v.length <= 1000) || 'Не более 1000 символов']
    }
  },
  computed: {
    ...mapGetters({userData: 'userData'}),
    compItem () {
      let result = _.get(this.$store, 'getters.productCategories/item', {})
      this.item = result ? _.cloneDeep(result) : {}
      return result
    }
  },
  methods: {
    updateItem () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('productCategories/updateItem', {item: this.item, isUpdate: true})
      }
    }
  },
  created () {
    this.$store.dispatch('productCategories/getItem', {id: _.get(this.$store, 'getters.productCategories/item.id')})
  },
  mounted () {
  }
}
