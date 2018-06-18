import {baseUrl} from '@/httpClient/index'
import {mapGetters} from 'vuex'
import questionDialog from '@/components/questionDialog/QuestionDialog.vue'
import addDialogComponent from './addDialog/addDialog.vue'

export default {
  name: 'catalogs',
  data () {
    return {
      baseUrl: baseUrl.slice(0, -1),
      msg: 'Каталоги',
      categoryIds: [-1],
      productsShown: false,
      dialog: false,
      dialogComponent: addDialogComponent,
      dialogData: null,
      qDialog: false,
      qDialogComponent: questionDialog
    }
  },
  methods: {
    getNext (item) {
      this.categoryIds.push(item.id)
      if (item.internal_categories_count > 0) {
        this.getCategories(item.id)
      } else if (item.internal_products_count > 0) {
        this.productsShown = true
        this.$store.dispatch('products/productsByProductCategory', {user_id: this.userData.id, category_id: item.id})
      }
    },
    goTo (item) {
      this.$store.commit('catalogBack', false)
      this.$store.commit('products/item', item)
      this.$router.push({name: 'product'})
    },
    getCategories (categoryId) {
      this.$store.dispatch('productCategories/productsCategoriesByProductCategory', {user_id: this.userData.id, category_id: categoryId})
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
          category_id: this.categoryTail,
          amount: 0,
          currency_id: null
        }
      }
      let serverDialogData = await this.$store.dispatch('currencyCatalog/getItems')
      this.dialogData = {
        title: (isUpdate ? 'Обновление' : 'Добавление') + ' продукта',
        isClosable: true,
        item: isUpdate ? _.cloneDeep(item) : item,
        isUpdate
      }
      this.dialog = true
    },
    dialogClose (confirmed, item, isUpdate) {
      if (confirmed) {
        this.$store.dispatch('products/updateItem', {item, isUpdate})
      }
      this.dialog = false
    },
    qDialogClose (confirmed, data) {
      if (confirmed) {
        this.$store.dispatch('products/deleteItem', data)
      }
      this.qDialog = false
    }
  },
  computed: {
    ...mapGetters({userData: 'userData',
      items: 'productCategories/items',
      products: 'products/items',
      catalogBack: 'catalogBack'}),
    categoryTail () {
      return _.last(this.categoryIds)
    }
  },
  created () {
    this.$store.commit('catalogBack', true)
    this.$store.commit('products/items', [])
    this.getCategories(-1)
  },
  mounted () {
  },
  beforeDestroy () {
    this.$store.commit('products/items', [])
    this.$store.commit('productCategories/items', [])
  },
  beforeRouteLeave (to, from, next) {
    if (this.catalogBack) {
      if (!this.categoryTail || this.categoryTail < 0) {
        next()
      } else {
        this.categoryIds.splice(this.categoryIds.length - 1, 1)
        if (this.productsShown) {
          this.productsShown = false
          this.$store.commit('products/items', [])
        } else {
          this.getCategories(this.categoryTail)
        }
        next(false)
      }
    } else {
      next()
    }
  }
}
