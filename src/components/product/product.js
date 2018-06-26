
import {catalog as catalogRoutes} from '@/router/routerNames'
import {mapGetters} from 'vuex'
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
    ...mapGetters({userData: 'userData',
      breadcrumbs: 'breadcrumbs/items',
      breadcrumbsType: 'breadcrumbs/type'}),
    categoryTail () {
      return _.last(this.breadcrumbs)
    }
  },
  methods: {
    goBack (id) {
      if (id !== this.categoryTail.id) {
        this.$store.commit('breadcrumbs/delete', id)
        this.$router.push({name: 'catalogs'})
      }
    }},
  created () {
  },
  mounted () {
  },
  beforeRouteLeave (to, from, next) {
    if (this.categoryTail.id.indexOf('product-') !== -1) {
      this.$store.commit('breadcrumbs/delete', this.breadcrumbs[this.breadcrumbs.length - 2].id)
    }
    if (catalogRoutes.indexOf(to.name) === -1) {
      this.$store.commit('breadcrumbs/type', '')
      this.$store.commit('breadcrumbs/items', [])
    }
    next()
  }
}
