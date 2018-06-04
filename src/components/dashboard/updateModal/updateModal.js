import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'dialogHeader',
  props: ['data'],
  data () {
    return {
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
      ]
    }
  },
  computed: {
    updateUser () {
      return this.data.item.id ? this.data.item : null
    }
  },
  methods: {
    submit: function () {
      if (this.$refs.form.validate()) {
        this.updateUser.login_data.password = this.newPassword
        ModalService.submit(this.updateUser) // resolve .open() promise
      }
    },
    cancel: function () {
      ModalService.cancel(this.updateUser) // reject .open() promise
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
    }
  }
}
