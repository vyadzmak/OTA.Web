import {mapGetters} from 'vuex'

export default {
  name: 'dialogHeader',
  props: ['data'],
  data () {
    return {
      valid: false,
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
    ...mapGetters({clients: 'clients/items', userRoles: 'userRoles/items', userData: 'userData'})
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
    }
  }
}
