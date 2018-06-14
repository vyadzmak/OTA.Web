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
      },
      dialogData: null,
      qDialog: false,
      qDialogComponent: questionDialog
    }
  },
  computed: {
    ...mapGetters({userData: 'userData', item: 'partnersCatalog/item', items: 'attachments/items'})
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
    qDialogClose: async function (confirmed, data) {
      if (confirmed) {
        let updateItem = _.cloneDeep(this.item)
        updateItem.images.splice(updateItem.images.indexOf(data), 1)
        if (updateItem.default_image_id === data) {
          updateItem.default_image_id = _.get(updateItem.images, '[0]', 0)
        }
        await this.$store.dispatch('partnersCatalog/updateItem', {item: updateItem, isUpdate: true})
        await this.$store.dispatch('attachments/deleteItem', data)
      }
      this.qDialog = false
    },
    updateImage (itemId) {
      let updateItem = _.cloneDeep(this.item)
      updateItem.default_image_id = itemId
      this.$store.dispatch('partnersCatalog/updateItem', {item: updateItem, isUpdate: true})
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
    completeSend: async function (files) {
      this.showProgress = false
      this.$refs.uploader.removeAllFiles()
      this.filesCount = 0
      let text = 'Загрузка файлов успешно завершена'
      let context = 'success'
      if (files && files.length > 0 && files[0].xhr.status === 200) {
        let updateItem = _.cloneDeep(this.item)
        let imagesArray = JSON.parse(files[0].xhr.response)
        if (updateItem.default_image_id === 0) {
          updateItem.default_image_id = imagesArray[0]
        }
        updateItem.images = updateItem.images ? updateItem.images.concat(imagesArray) : imagesArray
        await this.$store.dispatch('partnersCatalog/updateItem', {item: updateItem, isUpdate: true})
        await this.$store.dispatch('attachments/attachmentsInfo', {attachments_ids: updateItem.images.join()})
      } else {
        text = 'Загрузка файлов не удалась. Обратитесь к администратору'
        context = 'error'
      }
      this.$store.commit('showSnackbar', {text, snackbar: true, context})
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
  },
  beforeDestroy () {
    this.$store.commit('attachments/items', [])
  }
}
