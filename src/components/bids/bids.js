import {mapGetters} from 'vuex'

export default {
  name: 'bids',
  data () {
    return {
      items: [
        {id: 1, icon: 'mdi-inbox-arrow-down', name: 'Входящие', route: '/bids/inbox'},
        {id: 2, icon: 'fas fa-dolly', name: 'Мои заявки', route: '/bids/active'},
        {id: 3, icon: 'fas fa-history', name: 'История', route: '/bids/history'}
      ]
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters(['userData']),
    entities: function () {
      return this.$store.getters.entities && this.$store.getters.entities.headers ? this.$store.getters.entities : {headers: [], items: []}
    }
  },
  created () {
  },
  mounted () {
  }
}
