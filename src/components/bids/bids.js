import {mapGetters} from 'vuex'

export default {
  name: 'bids',
  data () {
    return {
      items: [
        {id: 1, icon: 'mdi-inbox-arrow-down', name: 'Входящие', route: '/bids/inbox'},
        {id: 2, icon: 'fas fa-dolly', name: 'Активные', route: '/bids/active'},
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
    this.$store.dispatch('adminSettings/routeAdminGeneral', {'user_id': this.userData.id})
    this.$store.commit('updateByPath', {path: 'loginUser.userData.orders_count', value: 0})
  },
  mounted () {
  }
}
