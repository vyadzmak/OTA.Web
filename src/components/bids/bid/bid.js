import {mapGetters} from 'vuex'
import {baseUrl} from '@/httpClient/index'

export default {
  name: 'bids',
  data () {
    return {
      search: '',
      headers1: [
        { text: 'Id', align: 'left', value: 'id' },
        { text: '№ заявки', align: 'left', value: 'number' },
        { text: 'Заказчик', align: 'left', value: 'order_user_data.client_data.name' },
        { text: 'Адрес', align: 'left', value: 'client_address_data.address' },
        { text: 'Город/а.е.', align: 'left', value: 'client_address_data.city_data.name' },
        { text: 'Регион/Область', align: 'left', value: 'client_address_data.city_data.area_data.name' },
        { text: 'Сумма', align: 'left', value: 'total_amount' },
        { text: 'Время заказа',
          align: 'left',
          value: this.$route.name === 'bids.inbox' ? 'creation_date'
            : this.$route.name === 'bids.active' ? 'processed_date' : 'execute_date'}
      ],
      headers2: [
        { text: 'Исполнитель', align: 'left', value: 'order_executor_data.name' }
      ],
      headers3: [
        { text: 'Статус', align: 'left', value: 'order_state_data.title' },
        { text: 'Адрес подтвержден', align: 'left', value: 'client_address_data.confirmed' }
      ],
      tableRowsShown: [10, 20, 50, 100, {text: 'Все', value: -1}],
      rowsPerPageText: 'Строк на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов',
      selected: []
    }
  },
  computed: {
    ...mapGetters({items: 'orders/items', userData: 'userData'}),
    currentStateFilter () {
      switch (this.$route.name) {
        case 'bids.inbox': return 1
        case 'bids.active': return 2
        case 'bids.history': return 3
        case 'bids.cancelled': return 4
        default: return 0
      }
    },
    headers () {
      switch (this.currentStateFilter) {
        case 1: return [...this.headers1, ...this.headers3]
        case 3: return [{sortable: false}, ...this.headers1, ...this.headers2, ...this.headers3]
        default: return [...this.headers1, ...this.headers2, ...this.headers3]
      }
    }
  },
  methods: {
    goTo (item, event) {
      console.log(event)
      if (event.target.className.indexOf('v-input--selection-controls__ripple') === -1) {
        this.$store.commit('orders/item', item)
        this.$router.push({name: 'bids.details'})
      }
    },
    getOrders () {
      this.$store.dispatch('orders/routeOrders', {user_id: this.userData.id, state_id: this.currentStateFilter})
    },
    async exportOrders () {
      let ordersIds = this.selected.map(x => { return x.id })
      try {
        window.open(baseUrl + 'exportOrders' + '?user_id=' + this.userData.id + '&orders_ids=' + ordersIds)
      } catch (e) {
        this.$store.commit('showSnackbar', {text: 'Экспорт данных не удался. Обратитесь к администратору ' + e, snackbar: true, context: 'error'}, {root: true})
      }
    }
  },
  created () {
    this.getOrders()
  },
  mounted () {
    this.$refs.dataTable.defaultPagination.descending = true
  },
  beforeDestroy () {
    this.$store.commit('orders/items', [])
  }
}
