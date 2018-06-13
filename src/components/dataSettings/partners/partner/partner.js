
export default {
  name: 'partner',
  data () {
    return {
      items: [
        {id: 1, icon: 'mdi-file-chart', name: 'Общее', route: '/partner/general'},
        {id: 2, icon: 'fas fa-images', name: 'Галерея', route: '/partner/gallery/'}
      ]
    }
  },
  computed: {
    userData () {
      return this.$store.getters.userData
    }
  },
  methods: {},
  created () {
  },
  mounted () {
  }
}
