
export default {
  name: 'dataSettings',
  data () {
    return {
      msg: 'Настройки данных',
      items: [{id: 1, icon: 'mdi-source-merge', name: 'Настройка категорий товаров'},
        {id: 2, icon: 'mdi-format-list-numbers', name: 'Настройка брендов'},
        {id: 5, icon: 'mdi-format-list-numbers', name: 'Настройка скидок'},
        {id: 6, icon: 'mdi-format-list-numbers', name: 'Пользовательское соглашение'},
        {id: 7, icon: 'mdi-format-list-numbers', name: 'Настройка валют'},
        {id: 8, icon: 'mdi-format-list-numbers', name: 'Настройка единиц измерения'},
        {id: 9, icon: 'mdi-format-list-numbers', name: 'Настройка отображения'}]
    }
  },
  computed: {
    userData: function () {
      return this.$store.getters.userData
    }
  },
  methods: {
    goToSetting (n) {
      switch (n) {
        case 1:
          this.$router.push({name: 'Factories'})
          break
        case 2:
          this.$router.push({name: 'Catalogs'})
          break
        default: this.$store.commit('showSnackbar', {text: 'На данный момент функция недоступна, появится в ближайшее время', snackbar: true, context: 'success'})
          break
      }
    }
  },
  created () {
  },
  mounted () {
  }
}
