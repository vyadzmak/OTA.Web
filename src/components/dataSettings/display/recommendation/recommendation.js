
export default {
  name: 'recommendation',
  data () {
    return {
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

      this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' настройки прошло успешно', snackbar: true, context: 'success'})

      this.$store.commit('showSpinner', false)
    }
  },
  created () {
    // this.$store.commit('showSpinner', true)
  },
  mounted () {
    this.$refs.recommendationDataTable.defaultPagination.descending = true
  }
}
