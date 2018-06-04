
export default {
  name: 'product',
  data () {
    return {
      items: [
        {id: 1, icon: 'mdi-file-chart', name: 'Общее', route: '/product/general'},
        {id: 2, icon: 'mdi-account-multiple', name: 'Галерея', route: '/product/gallery/'},
        {id: 3, icon: 'mdi-domain', name: 'Рекомендации', route: '/product/recommendation'},
        {id: 4, icon: 'fas fa-comment', name: 'Отзыв', route: '/product/feedback'}
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
