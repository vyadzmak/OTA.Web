import {baseUrl} from '@/httpClient/index'
import {mapGetters} from 'vuex'

export default {
  name: 'dialogHeader',
  props: ['data'],
  data () {
    return {
      baseUrl: baseUrl.slice(0, -1)
    }
  },
  computed: {
    ...mapGetters({
      item: 'products/item',
      units: 'unitCatalog/items',
      currencies: 'currencyCatalog/items'})
  },
  methods: {
    cancel: function () {
      this.$emit('dialog-close', false)
    }
  },
  created () {
    if (!this.units || this.units.length === 0) {
      this.$store.dispatch('unitCatalog/getItems')
    }
    if (!this.currencies || this.currencies.length === 0) {
      this.$store.dispatch('currencyCatalog/getItems')
    }
  }
}
