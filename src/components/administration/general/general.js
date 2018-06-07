import {mapGetters} from 'vuex'
export default {
  name: 'general',
  data () {
    return {
      settings: {}
    }
  },
  computed: {
    ...mapGetters({userData: 'userData'}),
    items: {get () {
      let result = this.$store.getters['adminSettings/items']
      this.settings = _.cloneDeep(_(result).get('[0]', {}))
      return result
    }}
  },
  methods: {
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
