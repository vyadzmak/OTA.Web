import {mapGetters} from 'vuex'

export default {
  name: 'category',
  data () {
    return {
      items: [
        {id: 1, icon: 'mdi-file-chart', name: 'Общее', route: '/category/general'},
        {id: 2, icon: 'fas fa-images', name: 'Галерея', route: '/category/gallery/'}
      ],
      categoriesRoutes: ['categories', 'category', 'category.general', 'category.gallery']
    }
  },
  computed: {
    ...mapGetters({userData: 'userData',
      item: 'productCategories/item',
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
        this.$router.push({name: 'categories'})
      }
    }},
  created () {
  },
  mounted () {
  },
  beforeRouteLeave (to, from, next) {
    if (this.categoryTail.id === this.item.id) {
      this.$store.commit('breadcrumbs/delete', this.breadcrumbs[this.breadcrumbs.length - 2].id)
    }
    if (this.categoriesRoutes.indexOf(to.name) === -1) {
      this.$store.commit('breadcrumbs/type', '')
      this.$store.commit('breadcrumbs/items', [])
    }
    next()
  }
}
