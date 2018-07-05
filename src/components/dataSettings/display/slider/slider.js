import {mapGetters} from 'vuex'
import questionDialog from '@/components/questionDialog/QuestionDialog.vue'
import {baseUrl} from '@/httpClient/index'

export default {
  name: 'slider',
  data () {
    return {
      baseUrl: baseUrl.slice(0, -1),
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
      rowsPerPageItems: [6, 12, 18, 24],
      pagination: {
        rowsPerPage: 6
      },
      rowsPerPageText: 'Элементов на странице',
      noDataText: 'Нет данных',
      dialogData: null,
      qDialog: false,
      qDialogComponent: questionDialog
    }
  },
  computed: {
    ...mapGetters({item: 'viewSettings/item', items: 'attachments/items'}),
    sliderImages () {
      return this.item.slider_images || []
    }
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
        updateItem.slider_images.splice(updateItem.slider_images.indexOf(data), 1)
        if (updateItem.default_slider_image === data) {
          updateItem.default_slider_image = _.get(updateItem.slider_images, '[0]', 0)
        }
        this.dialogData = await this.$store.dispatch('viewSettings/updateItem', {item: updateItem, isUpdate: true})
        this.dialogData = await this.$store.dispatch('attachments/deleteItem', data)
      }
      this.qDialog = false
    },
    updateImage (itemId) {
      let updateItem = _.cloneDeep(this.item)
      updateItem.default_slider_image = itemId
      this.$store.dispatch('viewSettings/updateItem', {item: updateItem, isUpdate: true})
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
        if (updateItem.default_slider_image === 0) {
          updateItem.default_slider_image = imagesArray[0]
        }
        updateItem.slider_images = updateItem.slider_images ? updateItem.slider_images.concat(imagesArray) : imagesArray
        this.dialogData = await this.$store.dispatch('viewSettings/updateItem', {item: updateItem, isUpdate: true})
        this.dialogData = await this.$store.dispatch('attachments/attachmentsInfo', {attachments_ids: updateItem.slider_images.join()})
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
  watch: {
    sliderImages: function (val) {
      if ((val && val.length !== this.sliderImages.length) || (val && val.length > 0 && this.items.length === 0)) {
        this.$store.dispatch('attachments/attachmentsInfo', {attachments_ids: val.join()})
      }
    }
  },
  created () {
  },
  mounted () {
  },
  beforeDestroy () {
    this.$store.commit('attachments/items', [])
  }
}
