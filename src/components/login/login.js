export default {
  name: 'login',
  data () {
    return {
      msg: 'Авторизация',
      fixed: true,
      loginData: {Login: '', Password: ''},
      valid: false,
      rememberMe: false,
      controlsDisabled: false,
      passwordRules: [
        (v) => !!v || 'Введите пароль',
        (v) => v.length > 3 || 'Пароль должен быть больше 3-х символов',
        (v) => v.length <= 10 || 'Пароль должен быть не более 10-и символов'
      ],
      emailRules: [
        (v) => !!v || 'Введите логин',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Введите валидный е-mail'
      ],
      errors: []
    }
  },
  computed: {
  },
  methods: {
    loginUser: function () {
      if (this.valid) {
        this.controlsDisabled = true
        this.$store.dispatch('login', {login: this.loginData.Login, password: this.loginData.Password, rememberMe: this.rememberMe})
          .then(() => {
            this.$router.push({ path: '/' })
          })
          .catch(() => {
            this.controlsDisabled = false
          })
      }
    }
  }
}
