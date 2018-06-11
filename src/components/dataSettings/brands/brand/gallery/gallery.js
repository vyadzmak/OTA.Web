import {mapGetters} from 'vuex'
import questionDialog from '@/components/questionDialog/QuestionDialog.vue'
import {baseUrl} from '@/httpClient/index'

export default {
  name: 'gallery',
  data () {
    return {
      valid: false,
      menu: false,
      totalProgress: 0,
      filesCount: 0,
      showProgress: false,
      options: {
        acceptedFileTypes: ['.jpg', '.jpeg', '.png'],
        url: baseUrl + 'uploadFiles',
        clickable: false,
        autoProcessQueue: false,
        maxConcurrentUploads: 300,
        uploadMultiple: true,
        maxFiles: 300
      },
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      }
    }
  },
  computed: {
    ...mapGetters({userData: 'userData', item: 'brandsCatalog/item', items: 'attachments/items'})
  },
  methods: {
    openQDialog: function (itemId) {
      this.dialogData = {
        message: 'Вы действительно хотите удалить изображение?',
        title: 'Удаление',
        isClosable: true,
        data: itemId
      }
      this.qDialog = true
    },
    qDialogClose (confirmed, data) {
      if (confirmed) {
        this.$store.dispatch('attachments/deleteItem', data)
      }
      this.qDialog = false
    },
    uploadFiles (file) {
      this.$refs.uploader.processQueue()
    },
    triggerBrowse () {
      this.$refs.uploader.triggerBrowseFiles()
    },
    removeFile (file) {
      this.$refs.uploader.removeFile(file)
    },
    beforeSend (files, xhrRequest, formData) {
      xhrRequest.setRequestHeader('Access-Control-Allow-Origin', '*')
      xhrRequest.setRequestHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Key, Access-Control-Allow-Origin')
      this.filesCount = 0
      this.showProgress = true
      this.$store.commit('showSpinner', true)
      formData.append('user_id', this.userData.id)
    },
    completeSend (files) {
      let text = 'Загрузка файлов успешно завершена'
      let context = 'success'
      if (files && files.length > 0 && files[0].xhr.status === 200) {
        let updateItem = _.cloneDeep(this.item)
        updateItem.images = updateItem.images.concat(JSON.parse(files[0].xhr.response))
        this.$store.commit('brandsCatalog/item', updateItem)
        this.$store.dispatch('brandsCatalog/updateItem', {item: updateItem, isUpdate: true})
        this.$store.dispatch('attachments/attachmentsInfo', {attachments_ids: this.item.images.join()})
      } else {
        text = 'Загрузка файлов не удалась. Обратитесь к администратору'
        context = 'error'
      }
      this.$store.commit('showSnackbar', {text, snackbar: true, context})
      this.data.isClosable = true
      this.showProgress = false
    },
    totalProgressChanged (file) {
      this.totalProgress = file.totalProgress
    },
    filesAcceptedFunction (file) {
      this.filesCount += 1
    },
    fileRemovedFunction (file) {
      if (file.accepted) {
        this.filesCount -= 1
      }
    }
  },
  created () {
    if (this.item.images.length > 0) {
      this.$store.dispatch('attachments/attachmentsInfo', {attachments_ids: this.item.images.join()})
    }
  },
  mounted () {
  }
}
