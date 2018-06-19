
export default {
  name: 'client',
  data () {
    return {
      items: [
        {id: 1, icon: 'mdi-file-chart', name: 'Общее', route: '/administration/client/general'},
        {id: 2, icon: 'mdi-account-multiple', name: 'Пользователи', route: '/administration/client/users/'},
        {id: 3, icon: 'fas fa-info', name: 'Информация', route: '/administration/client/info'},
        {id: 4, icon: 'fas fa-address-card', name: 'Адреса', route: '/administration/client/address'}
      ]
    }
  },
  computed: {
    userData () {
      return this.$store.getters.userData
    }
  },
  methods: {},
  created () {
  },
  mounted () {
  }
}
