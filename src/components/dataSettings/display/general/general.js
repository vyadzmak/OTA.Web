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
    item () {
      let result = this.$store.getters['viewSettings/item']
      this.settings = result ? _.cloneDeep(result) : {}
      return result
    }
  },
  methods: {
    updateItem () {
      this.$store.dispatch('viewSettings/updateItem', {item: this.settings, isUpdate: true})
    }
  },
  created () {
  },
  mounted () {
  },
  beforeDestroy () {
  }
}
