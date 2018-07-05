export default {
  name: 'userAgreement',
  data () {
    return { settings: {} }
  },
  methods: {
    updateItem () {
      this.$store.dispatch('adminSettings/updateItem', {item: this.settings, isUpdate: true})
    }
  },
  computed: {
    compItem () {
      let result = this.$store.getters['adminSettings/item']
      this.settings = result ? _.cloneDeep(result) : {}
      return result
    }
  },
  created () {
    this.$store.dispatch('adminSettings/routeAdminGeneral', {'user_id': this.userData.id})
  },
  mounted () {
  },
  beforeDestroy () {
    this.$store.commit('adminSettings/item', {})
  }
}
