
export default {
  name: 'category',
  data () {
    return {
      items: [
        {id: 1, icon: 'mdi-file-chart', name: 'Общее', route: '/category/general'},
        {id: 2, icon: 'fas fa-images', name: 'Галерея', route: '/category/gallery/'}
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
