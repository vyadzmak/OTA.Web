import {baseUrl} from '@/httpClient/index'
import {mapGetters} from 'vuex'
import questionDialog from '@/components/questionDialog/QuestionDialog.vue'
import addDialogComponent from './addDialog/addDialog.vue'

export default {
  name: 'brandsCatalog',
  data () {
    return {
      baseUrl: baseUrl.slice(0, -1),
      dialog: false,
      dialogComponent: addDialogComponent,
      dialogData: null,
      qDialog: false,
      qDialogComponent: questionDialog
    }
  },
  methods: {
    openQDialog: function (itemId) {
      this.dialogData = {
        message: 'Вы действительно хотите удалить бренд?',
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
          description: ''
        }
      }
      this.dialogData = {
        title: (isUpdate ? 'Обновление' : 'Добавление') + ' бренда',
        isClosable: true,
        item: isUpdate ? _.cloneDeep(item) : item,
        isUpdate
      }
      this.dialog = true
    },
    dialogClose (confirmed, item, isUpdate) {
      if (confirmed) {
        this.$store.dispatch('brandsCatalog/updateItem', {item, isUpdate})
      }
      this.dialog = false
    },
    qDialogClose (confirmed, data) {
      if (confirmed) {
        this.$store.dispatch('brandsCatalog/deleteItem', data)
      }
      this.qDialog = false
    },
    goTo (item) {
      this.$store.commit('brandsCatalog/item', item)
      this.$router.push({name: 'brand'})
    }
  },
  computed: {
    ...mapGetters({items: 'brandsCatalog/items'})
  },
  created () {
    this.$store.dispatch('brandsCatalog/getItems')
  },
  mounted () {
  }
}
