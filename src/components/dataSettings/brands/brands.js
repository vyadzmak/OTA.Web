import questionDialog from '../../questionDialog/QuestionDialog.vue'
import addDialogComponent from './addDialog/addDialog.vue'

export default {
  name: 'brands',
  data () {
    return {
      dialog: false,
      dialogComponent: addDialogComponent,
      dialogData: null,
      qDialog: false,
      qDialogComponent: questionDialog,
      items: [1, 2, 3, 4, 5, 6],
      level: 0
    }
  },
  methods: {
    openDialog () {
      this.dialogData = {
        isClosable: true,
        title: 'Добавление бренда'
      }
      this.dialog = true
    },
    dialogClose (confirmed, data) {
      this.dialog = false
      if (confirmed) {
        this.items.push(this.items.length + 1)
      }
    },
    openQDialog (itemId) {
      this.dialogData = {
        message: 'Вы действительно хотите удалить бренд?',
        title: 'Удаление',
        isClosable: true,
        data: itemId
      }
      this.qDialog = true
    },
    qDialogClose (confirmed, data) {
      this.qDialog = false
    }
  },
  computed: {
    userData () {
      return this.$store.getters.userData
    }
  },
  created () {
  },
  mounted () {
  }
}
