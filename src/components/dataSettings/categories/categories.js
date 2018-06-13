import {mapGetters} from 'vuex'
import questionDialog from '@/components/questionDialog/QuestionDialog.vue'
import addDialogComponent from './addDialog/addDialog.vue'

export default {
  name: 'categories',
  data () {
    return {
      msg: 'Настройка каталогов',
      categoryIds: [-1],
      dialog: false,
      dialogComponent: addDialogComponent,
      dialogData: null,
      qDialog: false,
      qDialogComponent: questionDialog
    }
  },
  methods: {
    getNext (item) {
      if (item.internal_categories_count > 0) {
        this.categoryIds.push(item.id)
        this.getCategories(item.id)
      } else if (!item.internal_products_count) {
        this.categoryIds.push(item.id)
        this.$store.commit('productCategories/items', [])
      }
    },
    goTo (item) {
      this.$store.commit('categoryBack', false)
      this.$store.commit('productCategories/item', item)
      this.$router.push({name: 'category'})
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
          parent_category_id: this.categoryTail
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
    ...mapGetters({userData: 'userData', items: 'productCategories/items', categoryBack: 'categoryBack'}),
    categoryTail () {
      return _.last(this.categoryIds)
    }
  },
  created () {
    this.$store.commit('categoryBack', true)
    this.getCategories(-1)
  },
  mounted () {
  },
  beforeRouteLeave (to, from, next) {
    if (this.categoryBack) {
      if (!this.categoryTail || this.categoryTail < 0) {
        next()
      } else {
        this.categoryIds.splice(this.categoryIds.length - 1, 1)
        this.getCategories(this.categoryTail)
        next(false)
      }
    } else {
      next()
    }
  }
}
