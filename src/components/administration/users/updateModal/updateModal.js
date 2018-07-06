import {mapGetters} from 'vuex'
import {baseUrl} from '@/httpClient/index'
export default {
  name: 'dialogHeader',
  props: ['data'],
  data () {
    return {
      valid: false,
      datePicker: false,
      options: {
        acceptedFileTypes: ['.jpg', '.jpeg', '.png'],
        url: baseUrl + 'uploadFiles',
        autoProcessQueue: true,
        uploadMultiple: false
      },
      imgSrc: null,
      sNameRules: [
        (v) => !!v || 'Имя параметра должно быть заполнено',
        (v) => (v && v.length <= 50) || 'Не более 50 символов'
      ],
      nameRules: [
        (v) => !!v || 'Имя параметра должно быть заполнено',
        (v) => (v && v.length <= 100) || 'Не более 100 символов'
      ]
    }
  },
  computed: {
    ...mapGetters({clients: 'clients/items', userData: 'userData'}),
    userRoles () {
      return _.filter(this.$store.getters['userRoles/items'], v => { return v.id < 4 })
    },
    imgUrl () {
      if (this.imgSrc) {
        return this.imgSrc
      } else if (this.data.item.user_info_data.avatar_id) {
        return baseUrl.slice(0, -1) + this.data.item.user_info_data.avatar_data.thumb_file_path
      } else {
        return baseUrl.slice(0, -1) + this.userData.no_avatar_url
      }
    }
  },
  methods: {
    submit: function () {
      if (this.$refs.form.validate()) {
        this.$emit('dialog-close', true, this.data.item, this.data.isUpdate)
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
      this.data.item.user_login.password = passwd
    },
    beforeSend (files, xhrRequest, formData) {
      xhrRequest.setRequestHeader('Access-Control-Allow-Origin', '*')
      xhrRequest.setRequestHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Key, Access-Control-Allow-Origin')
      this.$store.commit('showSpinner', true)
      formData.append('user_id', this.userData.id)
    },
    completeSend (e) {
      this.$store.commit('showSpinner', false)
      let xhrObj = _.get(e, 'xhr', {})
      if (xhrObj.status === 200) {
        this.imgSrc = e._dataUrl
        this.data.item.user_info_data.avatar_id = JSON.parse(xhrObj.response)[0]
      } else {
        this.$store.commit('showSnackbar', {text: 'Загрузка файла не удалась. Обратитесь к администратору', snackbar: true, context: 'error'})
      }
    }
  }
}
