import questionDialog from '../../../../questionDialog/QuestionDialog.vue'
import { ModalService } from 'vue-modal-dialog'
import {baseUrl} from '../../../../../httpClient/index'

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
        url: baseUrl + 'upload',
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
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    }
  },
  computed: {
    userData: function () {
      return this.$store.getters.userData
    }
  },
  methods: {
    showDeleteModal: function (id) {
      let modalConfig = {
        size: 'md',
        data: {
          message: 'Вы действительно хотите удалить изображение?',
          title: 'Удаление изображения',
          isClosable: true
        }
      }
      ModalService.open(questionDialog, modalConfig).then(
        modalSubmit => { this.deleteItem(id) },
        modalCancel => {}
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    deleteItem: function (id) {
      // this.$store.commit('showSpinner', true)
      // this.$http.delete('log', {params: {id}})
      //   .then(response => {
      //     if (response.status === 204) {
      //       this.logs.splice(0, this.logs.length)
      //       this.$store.commit('showSnackbar', {text: 'Очистка лога прошла успешно', snackbar: true, context: 'success'})
      //     } else {
      //       this.$store.commit('showSnackbar', {text: 'Очистка лога не удалась. Обратитесь к администратору', snackbar: true, context: 'error'})
      //     }
      //     this.$store.commit('showSpinner', false)
      //   })
      //   .catch(e => {
      //     this.errors.push(e)
      //     this.$store.commit('showSpinner', false)
      //     this.$store.commit('showSnackbar', {text: 'Очистка лога не удалась. Обратитесь к администратору', snackbar: true, context: 'error'})
      //   })
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
      this.data.isClosable = false
      xhrRequest.setRequestHeader('Access-Control-Allow-Origin', '*')
      xhrRequest.setRequestHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Key, Access-Control-Allow-Origin')
      this.filesCount = 0
      this.showProgress = true
      this.$store.commit('showSpinner', true)
      formData.append('user_creator_id', this.userData.id)
    },
    completeSend (files) {
      let x = 0
      files.forEach(function (element) {
        if (element.xhr.status === 200 && element.accepted) {
          x += 1
        }
      }, this)
      let text = x === files.length ? 'Загрузка файлов успешно завершена'
        : x === 0 ? 'Загрузка файлов не удалась. Обратитесь к администратору'
          : 'Загружено ' + x + ' из ' + files.length + '!'
      let context = x === files.length ? 'success'
        : x === 0 ? 'error'
          : 'warning'
      this.$store.commit('showSnackbar', {text, snackbar: true, context})
      this.data.isClosable = true
      this.submit()
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
  },
  mounted () {
  }
}
