
export default {
  name: 'dataSettings',
  data () {
    return {
      msg: 'Настройки данных',
      items: [{id: 1, name: 'Настройка категорий товаров', path: 'categories'},
        {id: 2, name: 'Настройка брендов', path: 'brands'},
        {id: 3, name: 'Настройка партнеров', path: 'partners'},
        {id: 6, name: 'Пользовательское соглашение', path: 'userAgreement'},
        {id: 7, name: 'Настройка валют', path: 'currencies'},
        {id: 8, name: 'Настройка единиц измерения', path: 'units'},
        {id: 9, name: 'Настройка отображения', path: 'display'}]
    }
  },
  computed: {
    userData: function () {
      return this.$store.getters.userData
    }
  },
  methods: {
    goToSetting (path) {
      if (path) {
        this.$router.push({name: path})
      }
    }
  },
  created () {
  },
  mounted () {
  }
}
