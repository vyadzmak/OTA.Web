import {baseUrl} from '@/httpClient/index'
export default {
  name: 'dialogHeader',
  props: ['data'],
  data () {
    return {
      options: {
        acceptedFileTypes: ['.jpg', '.jpeg', '.png'],
        url: baseUrl + 'uploadFiles',
        autoProcessQueue: true,
        uploadMultiple: false
      },
      valid: false,
      newPassword: '',
      repeatPassword: '',
      passwordRules: [
        (v) => !!v || 'Введите пароль',
        (v) => v.length > 3 || 'Пароль должен быть больше 3-х символов',
        (v) => v.length <= 10 || 'Пароль должен быть не более 10-и символов'
      ],
      passwordRepeatRules: [
        (v) => !!v || 'Введите пароль',
        (v) => v === this.newPassword || 'Пароли не совпадают'
      ],
      fNameRules: [
        (v) => !!v || 'Имя должно быть заполнено',
        (v) => (v && v.length <= 270) || 'Не более 270 символов'
      ],
      lNameRules: [
        (v) => !!v || 'Фамилия должна быть заполнена',
        (v) => (v && v.length <= 270) || 'Не более 270 символов'
      ]
    }
  },
  computed: {
    updateUser () {
      return this.data.item.id ? this.data.item : null
    },
    userData () {
      return this.$store.getters.userData
    }
  },
  methods: {
    submit: function () {
      if (this.$refs.form.validate()) {
        this.updateUser.login_data.password = this.newPassword
        this.$emit('dialog-close', true, this.updateUser)
      }
    },
    cancel: function () {
      this.$emit('dialog-close', false)
    },
    clear: function () {
      this.$refs.form.reset()
    },
    generatePassword: function () {
      let passwd = ''
      let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      for (let i = 0; i < 6; i++) {
        let c = Math.floor(Math.random() * chars.length + 1)
        passwd += chars.charAt(c)
      }
      this.newPassword = passwd
    },
    beforeSend (files, xhrRequest, formData) {
      xhrRequest.setRequestHeader('Access-Control-Allow-Origin', '*')
      xhrRequest.setRequestHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Key, Access-Control-Allow-Origin')
      this.$store.commit('showSpinner', true)
      formData.append('user_id', this.userData.id)
    },
    completeSend: async function (...args) {
      this.$store.commit('showSpinner', false)
      console.log(args)
      // let text = 'Загрузка файлов успешно завершена'
      // let context = 'success'
      // if (files && files.length > 0 && files[0].xhr.status === 200) {
      //   let updateItem = _.cloneDeep(this.item)
      //   let imagesArray = JSON.parse(files[0].xhr.response)
      //   if (updateItem.default_image_id === 0) {
      //     updateItem.default_image_id = imagesArray[0]
      //   }
      //   updateItem.images = updateItem.images ? updateItem.images.concat(imagesArray) : imagesArray
      // } else {
      //   text = 'Загрузка файлов не удалась. Обратитесь к администратору'
      //   context = 'error'
      // }
      // this.$store.commit('showSnackbar', {text, snackbar: true, context})
    }
  }
}
