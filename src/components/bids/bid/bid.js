export default {
  name: 'settings',
  data () {
    return {
      msg: 'Настройки',
      search: '',
      settings: [],
      errors: [],
      headers: [
        { text: 'ID', align: 'left', value: 'Id' },
        { text: 'Фамилия', align: 'left', value: 'SettingName' },
        { text: 'Имя', align: 'left', value: 'SettingValue' },
        {sortable: false},
        {sortable: false}
      ],
      tableRowsShown: [10, 20, 50, 100, {text: 'Все', value: -1}],
      rowsPerPageText: 'Строк на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов'
    }
  },
  computed: {
    userData: function () {
      return this.$store.getters.userData
    }
  },
  methods: {
    updateItem: function (item, isUpdate) {
      this.$store.commit('showSpinner', true)
      this.$http({method: isUpdate ? 'put' : 'post',
        url: 'settings',
        data: item,
        config: { contentType: 'application/json' }
      })
        .then(response => {
          let responseData = response.data ? (response.data !== 'Error' ? JSON.parse(response.data) : null) : null
          if (responseData) {
            if (isUpdate) {
              this.settings.splice(this.settings.findIndex((element, index, array) => {
                if (element.Id === item.Id) {
                  return true
                }
              }), 1)
            }
            this.settings.push(responseData)
            this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' настройки прошло успешно', snackbar: true, context: 'success'})
          } else {
            this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' настройки не удалось', snackbar: true, context: 'error'})
          }
          this.$store.commit('showSpinner', false)
        })
        .catch(e => {
          this.errors.push(e)
          this.$store.commit('showSpinner', false)
          this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' настройки не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
        })
    }
  },
  created () {
    this.$store.commit('showSpinner', true)
    this.$http.get(`settings`)
      .then(response => {
        this.$store.commit('showSpinner', false)
        this.settings = JSON.parse(response.data)
      })
      .catch(e => {
        this.errors.push(e)
        this.$store.commit('showSpinner', false)
      })
  },
  mounted () {
    this.$refs.settingsDataTable.defaultPagination.descending = true
  }
}
