
export default {
  name: 'product',
  data () {
    return {
      items: [
        {id: 1, icon: 'mdi-file-chart', name: 'Общее', route: '/product/general'},
        {id: 2, icon: 'fas fa-images', name: 'Галерея', route: '/product/gallery/'},
        {id: 3, icon: 'fas fa-comments', name: 'Рекомендации', route: '/product/recommendation'},
        {id: 4, icon: 'fas fa-comment', name: 'Отзыв', route: '/product/reviews'}
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
