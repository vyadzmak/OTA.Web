import {baseUrl} from '@/httpClient/index'
import {mapGetters} from 'vuex'
import questionDialog from '@/components/questionDialog/QuestionDialog.vue'
import addDialogComponent from './addDialog/addDialog.vue'
import positionsDialog from './positionsDialog.vue'
import ProductSearch from './ProductSearch'
import {catalog as catalogRoutes} from '@/router/routerNames'

export default {
  name: 'catalogs',
  components: {'product-search': ProductSearch},
  data () {
    return {
      search: '',
      rowsPerPageItems: [12, 18, 24, 36, 72, {text: 'Все', value: -1}],
      pagination: { rowsPerPage: 12 },
      rowsPerPageText: 'Элементов на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов',
      baseUrl: baseUrl.slice(0, -1),
      msg: 'Каталоги',
      productsShown: false,
      dialog: false,
      dialogComponent: addDialogComponent,
      dialogData: null,
      qDialog: false,
      qDialogComponent: questionDialog,
      pDialog: false,
      pDialogComponent: positionsDialog
    }
  },
  methods: {
    getNext (item) {
      if (this.categoryTail.id === item.id) {
        return
      }
      this.$store.commit('breadcrumbs/add', {id: item.id, name: item.name, showProducts: !item.internal_categories_count})
      if (item.internal_categories_count > 0) {
        this.getCategories(item.id)
      } else if (item.internal_products_count > 0) {
        this.productsShown = true
        this.getProducts(item.id)
      } else {
        this.productsShown = true
        this.$store.commit('products/items', [])
      }
    },
    goTo (item) {
      this.$store.commit('breadcrumbs/add', {id: 'product-' + item.id, name: item.name})
      this.$store.commit('catalogBack', false)
      this.$store.commit('products/item', item)
      this.$router.push({name: 'product'})
    },
    goToNewWindow (item) {
      this.$store.commit('products/item', item)
      let route = this.$router.resolve({name: 'product'})
      window.open(route.href, '_blank')
    },
    goBack (id) {
      if (id !== this.categoryTail.id) {
        this.$store.commit('breadcrumbs/delete', id)
        if (this.productsShown) {
          this.productsShown = false
          this.$store.commit('products/items', [])
        }
        this.getCategories(this.categoryTail.id)
      }
    },
    async getCategories (categoryId) {
      await this.$store.dispatch('productCategories/productsCategoriesByProductCategory', {user_id: this.userData.id, category_id: categoryId})
      this.pagination.page = 1
    },
    async getProducts (categoryId) {
      await this.$store.dispatch('products/productsByProductCategory', {user_id: this.userData.id, category_id: categoryId})
      this.pagination.page = 1
    },
    openQDialog: function (itemId) {
      this.dialogData = {
        message: 'Вы действительно хотите удалить продукт?',
        title: 'Удаление',
        isClosable: true,
        data: itemId
      }
      this.qDialog = true
    },
    openDialog: async function (item) {
      let isUpdate = true
      if (!item) {
        isUpdate = false
        item = {
          name: '',
          short_description: '',
          full_description: '',
          user_creator_id: this.userData.id,
          category_id: this.categoryTail.id,
          amount: 0,
          currency_id: null
        }
      }
      await this.$store.dispatch('currencyCatalog/getItems')
      this.dialogData = {
        title: (isUpdate ? 'Обновление' : 'Добавление') + ' продукта',
        isClosable: true,
        item: isUpdate ? _.cloneDeep(item) : item,
        isUpdate
      }
      this.dialog = true
    },
    async openPDialog () {
      await this.$store.dispatch(this.productsShown
        ? 'productsPositions/productsPositionsByCategory'
        : 'productCategoryPositions/productCategoryPositionsByCategory',
      {user_id: this.userData.id, category_id: this.categoryTail.id})
      this.dialogData = {
        title: 'Изменение порядка отображения ' + (this.productsShown ? 'товаров' : 'категорий'),
        isClosable: true,
        productsShown: this.productsShown,
        items: (this.productsShown ? this.products : this.items).map(v => { return {id: v.id, name: v.name} })
      }
      this.pDialog = true
    },
    dialogClose (confirmed, item, isUpdate) {
      if (confirmed) {
        this.$store.dispatch('products/updateItem', {item, isUpdate})
      }
      this.dialog = false
    },
    async pDialogClose (confirmed, item) {
      if (confirmed) {
        item.id = item.id ? item.id : undefined
        await this.$store.dispatch(
          (this.productsShown ? 'productsPositions' : 'productCategoryPositions') + '/updateItem',
          {item, isUpdate: !!item.id})
        if (this.productsShown) {
          this.getProducts(this.categoryTail.id)
        } else {
          this.getCategories(this.categoryTail.id)
        }
      }
      this.pDialog = false
    },
    qDialogClose (confirmed, data) {
      if (confirmed) {
        this.$store.dispatch('products/deleteItem', data)
      }
      this.qDialog = false
    }
  },
  computed: {
    ...mapGetters({
      items: 'productCategories/items',
      products: 'products/items',
      units: 'unitCatalog/items',
      currencies: 'currencyCatalog/items',
      catalogBack: 'catalogBack',
      categoryIds: 'breadcrumbs/items',
      breadcrumbsType: 'breadcrumbs/type'}),
    categoryTail () {
      return _.last(this.categoryIds)
    }
  },
  created () {
    this.$store.commit('catalogBack', true)
    if (this.breadcrumbsType !== 'catalogs') {
      this.$store.commit('breadcrumbs/type', 'catalogs')
      this.$store.commit('breadcrumbs/items', [{id: -1, name: 'Каталог'}])
    }
    this.$store.commit('products/items', [])
    if (this.categoryTail.showProducts) {
      this.productsShown = true
      this.getProducts(this.categoryTail.id)
    } else {
      this.getCategories(this.categoryTail.id)
    }
    this.$store.dispatch('unitCatalog/getItems')
    this.$store.dispatch('currencyCatalog/getItems')
  },
  mounted () {
  },
  beforeDestroy () {
    this.$store.commit('products/items', [])
    this.$store.commit('productCategories/items', [])
  },
  beforeRouteLeave (to, from, next) {
    if (this.catalogBack) {
      if (!this.categoryTail || this.categoryTail.id < 0) {
        if (catalogRoutes.indexOf(to.name) === -1) {
          this.$store.commit('breadcrumbs/type', '')
          this.$store.commit('breadcrumbs/items', [])
        }
        next()
      } else {
        this.$store.commit('breadcrumbs/delete', this.categoryIds[this.categoryIds.length - 2].id)
        if (this.productsShown) {
          this.productsShown = false
          this.$store.commit('products/items', [])
        }
        this.getCategories(this.categoryTail.id)
        next(false)
      }
    } else {
      if (catalogRoutes.indexOf(to.name) === -1) {
        this.$store.commit('breadcrumbs/type', '')
        this.$store.commit('breadcrumbs/items', [])
      }
      next()
    }
  }
}
