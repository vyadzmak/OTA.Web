import {mapGetters} from 'vuex'

export default {
  name: 'clientGeneral',
  data () {
    return {
      item: {}
    }
  },
  computed: {
    ...mapGetters({ clientTypes: 'clientTypes/items'}),
    compItem () {
      let result = _.get(this.$store.getters, 'clients/item', {})
      this.item = _.cloneDeep(result)
      return result
    }
  },
  methods: {
    updateItem () {
      this.$store.dispatch('clients/updateItem', {item: this.item, isUpdate: true})
    }
  },
  created () {
    this.$store.dispatch('clientTypes/getItems')
    this.$store.dispatch('clients/getItem', {id: this.compItem.id})
  },
  beforeDestroy () {
    this.$store.commit('clientTypes/items', [])
  }
}
