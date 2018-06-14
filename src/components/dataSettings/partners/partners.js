import {baseUrl} from '@/httpClient/index'
import {mapGetters} from 'vuex'
import questionDialog from '@/components/questionDialog/QuestionDialog.vue'
import updateModal from './updateModal/updateModal.vue'

export default {
  name: 'partners',
  data () {
    return {
      baseUrl: baseUrl.slice(0, -1),
      dialog: false,
      dialogComponent: updateModal,
      dialogData: null,
      qDialog: false,
      qDialogComponent: questionDialog
    }
  },
  methods: {
    openQDialog: function (itemId) {
      this.dialogData = {
        message: 'Вы действительно хотите удалить партнера?',
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
        title: (isUpdate ? 'Обновление' : 'Добавление') + ' партнера',
        isClosable: true,
        item: isUpdate ? _.cloneDeep(item) : item,
        isUpdate
      }
      this.dialog = true
    },
    dialogClose (confirmed, item, isUpdate) {
      if (confirmed) {
        this.$store.dispatch('partnersCatalog/updateItem', {item, isUpdate})
      }
      this.dialog = false
    },
    qDialogClose (confirmed, data) {
      if (confirmed) {
        this.$store.dispatch('partnersCatalog/deleteItem', data)
      }
      this.qDialog = false
    },
    goTo (item) {
      this.$store.commit('partnersCatalog/item', item)
      this.$router.push({name: 'partner'})
    }
  },
  computed: {
    ...mapGetters({userData: 'userData', items: 'partnersCatalog/items'})
  },
  created () {
    this.$store.dispatch('partnersCatalog/getItems')
  },
  mounted () {
  }
}
