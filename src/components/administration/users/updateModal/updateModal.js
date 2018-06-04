import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'dialogHeader',
  props: ['data'],
  data () {
    return {
      isUpdate: !this.data.item.first_name,
      valid: false,
      fNameRules: [
        (v) => !!v || 'Имя должно быть заполнено',
        (v) => (v && v.length <= 270) || 'Не более 270 символов'
      ],
      lNameRules: [
        (v) => !!v || 'Фамилия должна быть заполнена',
        (v) => (v && v.length <= 270) || 'Не более 270 символов'
      ],
      passwordRules: [
        (v) => (!!v || !this.isUpdate) || 'Введите пароль',
        (v) => (v.length > 3 || (!this.isUpdate && !v)) || 'Пароль должен быть больше 3-х символов',
        (v) => v.length <= 15 || 'Пароль должен быть не более 15-и символов'
      ],
      emailRules: [
        (v) => !!v || 'Введите e-mail адрес',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Введите правильный e-mail адрес'
      ]
    }
  },
  computed: {
    userRoles () {
      return this.$store.state.updateProperty
    }
  },
  methods: {
    submit: function () {
      if (this.$refs.form.validate()) {
        ModalService.submit(this.data.item) // resolve .open() promise
      }
    },
    cancel: function () {
      ModalService.cancel(this.data.item) // reject .open() promise
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
      this.data.item.login_data[0].password = passwd
    }
  }
}
