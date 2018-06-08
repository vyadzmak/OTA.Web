
export default {
  name: 'brand',
  data () {
    return {
      items: [
        {id: 1, icon: 'mdi-file-chart', name: 'Общее', route: '/brand/general'},
        {id: 2, icon: 'fas fa-images', name: 'Галерея', route: '/brand/gallery/'}
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
