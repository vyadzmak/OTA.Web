import {mapGetters} from 'vuex'
export default {
  name: 'general',
  data () {
    return {
      settings: {},
      rules: [
        (v) => !!v || 'Имя параметра должно быть заполнено',
        (v) => (v && v % 1 === 0) || 'Только целочисленные значения'
      ]
    }
  },
  computed: {
    ...mapGetters({userData: 'userData'}),
    items: {get () {
      let result = this.$store.getters['adminSettings/items']
      this.settings = _.cloneDeep(_.get(result, '[0]', {}))
      return result
    }}
  },
  methods: {
    updateItem () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('adminSettings/updateItem', {item: this.settings, isUpdate: true})
      }
    }
  },
  created () {
    this.$store.dispatch('adminSettings/getItems')
  },
  mounted () {
  },
  beforeDestroy () {
    this.$store.commit('adminSettings/items', [])
  }
}
