import {mapGetters} from 'vuex'

export default {
  name: 'log',
  data () {
    return {
      msg: 'Лог',
      search: '',
      errors: [],
      headers: [
        { text: 'ID', align: 'left', value: 'id' },
        { text: 'Дата', align: 'left', value: 'date' },
        { text: 'Сообщение', align: 'left', value: 'message' }
      ],
      tableRowsShown: [10, 20, 50, 100, {text: 'Все', value: -1}],
      rowsPerPageText: 'Строк на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов'
    }
  },
  computed: {
    ...mapGetters({items: 'log/items', userData: 'userData'})
  },
  methods: {
  },
  created () {
    this.$store.dispatch('log/routeAdminLogs', {item: this.settings, isUpdate: true})
  },
  mounted () {
    this.$refs.dataTable.defaultPagination.descending = true
  }
}
