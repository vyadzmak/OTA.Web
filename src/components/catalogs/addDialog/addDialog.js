import {mapGetters} from 'vuex'

export default {
  name: 'dialogHeader',
  props: ['data'],
  data () {
    return {
      valid: false,
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
    currencyTypes () {
      let result = _.get(this.$store, 'getters.currencyCatalog/items')
      if (!this.data.item.currency_id && result.length > 0) {
        this.data.item.currency_id = _(result).filter({is_default: true}).get('[0].id', result[0].id)
      }
      return result
    }
  },
  methods: {
    submit: function () {
      if (this.$refs.form.validate()) {
        this.$emit('dialog-close', true, this.data.item, this.data.isUpdate)
      }
    },
    cancel: function () {
      this.$emit('dialog-close', false)
    },
    clear: function () {
      this.$refs.form.reset()
    }
  }
}
