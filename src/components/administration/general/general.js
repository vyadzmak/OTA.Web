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
    item () {
      let result = this.$store.getters['adminSettings/item']
      this.settings = result ? _.cloneDeep(result) : {}
      return result
    }
  },
  methods: {
    updateItem () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('adminSettings/updateItem', {item: this.settings, isUpdate: true})
      }
    }
  },
  created () {
    this.$store.dispatch('adminSettings/routeAdminGeneral', {'user_id': this.userData.id})
  },
  mounted () {
  },
  beforeDestroy () {
    this.$store.commit('adminSettings/items', [])
    this.$store.commit('adminSettings/item', {})
  }
}
