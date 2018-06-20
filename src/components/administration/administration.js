
export default {
  name: 'administration',
  data () {
    return {
      items: [
        {id: 2, icon: 'mdi-account-multiple', name: 'Сотрудники', route: '/administration/users/'},
        {id: 3, icon: 'mdi-domain', name: 'Клиенты', route: '/administration/clients'},
        {id: 4, icon: 'mdi-information-outline', name: 'Лог', route: '/administration/log'},
        {id: 5, icon: 'mdi-settings', name: 'Системные настройки', route: '/administration/settings'},
        {id: 1, icon: 'mdi-file-chart', name: 'Общее', route: '/administration/general'}
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
