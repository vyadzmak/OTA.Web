import {baseUrl} from '@/httpClient/index'
import {mapGetters} from 'vuex'
import questionDialog from '@/components/questionDialog/QuestionDialog.vue'
import addDialogComponent from './addDialog/addDialog.vue'

export default {
  name: 'categories',
  data () {
    return {
      search: '',
      rowsPerPageItems: [12, 18, 24, 36, 72, {text: 'Все', value: -1}],
      pagination: { rowsPerPage: 12 },
      rowsPerPageText: 'Элементов на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов',
      baseUrl: baseUrl.slice(0, -1),
      msg: 'Настройка каталогов',
      dialog: false,
      dialogComponent: addDialogComponent,
      dialogData: null,
      qDialog: false,
      qDialogComponent: questionDialog,
      categoriesRoutes: ['categories', 'category', 'category.general', 'category.gallery']
    }
  },
  methods: {
    getNext (item) {
      if (item.internal_categories_count > 0) {
        this.$store.commit('breadcrumbs/add', {id: item.id, name: item.name})
        this.getCategories(item.id)
      } else if (!item.internal_products_count) {
        this.$store.commit('breadcrumbs/add', {id: item.id, name: item.name})
        this.$store.commit('productCategories/items', [])
      }
    },
    goTo (item) {
      this.$store.commit('breadcrumbs/add', {id: item.id, name: item.name})
      this.$store.commit('categoryBack', false)
      this.$store.commit('productCategories/item', item)
      this.$router.push({name: 'category'})
    },
    goBack (id) {
      if (id !== this.categoryTail.id) {
        this.$store.commit('breadcrumbs/delete', id)
        this.getCategories(this.categoryTail.id)
      }
    },
    getCategories (categoryId) {
      this.$store.dispatch('productCategories/productsCategoriesByProductCategory', {user_id: this.userData.id, category_id: categoryId})
    },
    openQDialog: function (itemId) {
      this.dialogData = {
        message: 'Вы действительно хотите удалить категорию?',
        title: 'Удаление',
        isClosable: true,
        data: itemId
      }
      this.qDialog = true
    },
    openDialog (item) {
      let isUpdate = true
      if (!item) {
        isUpdate = false
        item = {
          name: '',
          short_description: '',
          full_description: '',
          user_creator_id: this.userData.id,
          is_lock: false,
          parent_category_id: this.categoryTail.id
        }
      }
      this.dialogData = {
        title: (isUpdate ? 'Обновление' : 'Добавление') + ' категории',
        isClosable: true,
        item: isUpdate ? _.cloneDeep(item) : item,
        isUpdate
      }
      this.dialog = true
    },
    dialogClose (confirmed, item, isUpdate) {
      if (confirmed) {
        this.$store.dispatch('productCategories/updateItem', {item, isUpdate})
      }
      this.dialog = false
    },
    qDialogClose (confirmed, data) {
      if (confirmed) {
        this.$store.dispatch('productCategories/deleteItem', data)
      }
      this.qDialog = false
    }
  },
  computed: {
    ...mapGetters({userData: 'userData',
      items: 'productCategories/items',
      categoryIds: 'breadcrumbs/items',
      breadcrumbsType: 'breadcrumbs/type',
      categoryBack: 'categoryBack'}),
    categoryTail () {
      return _.last(this.categoryIds)
    }
  },
  created () {
    this.$store.commit('categoryBack', true)
    if (this.breadcrumbsType !== 'categories') {
      this.$store.commit('breadcrumbs/type', 'categories')
      this.$store.commit('breadcrumbs/items', [{id: -1, name: 'Настройка каталога'}])
    }
    this.getCategories(this.categoryTail.id)
  },
  mounted () {
  },
  beforeDestroy () {
    this.$store.commit('productCategories/items', [])
  },
  beforeRouteLeave (to, from, next) {
    if (this.categoryBack) {
      if (!this.categoryTail || this.categoryTail.id < 0) {
        if (this.categoriesRoutes.indexOf(to.name) === -1) {
          this.$store.commit('breadcrumbs/type', '')
          this.$store.commit('breadcrumbs/items', [])
        }
        next()
      } else {
        this.$store.commit('breadcrumbs/delete', this.categoryIds[this.categoryIds.length - 2].id)
        this.getCategories(this.categoryTail.id)
        next(false)
      }
    } else {
      if (this.categoriesRoutes.indexOf(to.name) === -1) {
        this.$store.commit('breadcrumbs/type', '')
        this.$store.commit('breadcrumbs/items', [])
      }
      next()
    }
  }
}
