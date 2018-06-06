import questionDialog from '../questionDialog/QuestionDialog.vue'
import updateDialog from './updateModal/UpdateModal.vue'

export default {
  name: 'dashboard',
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'Online Trade Assistant',
      fab: false,
      updateDialog: updateDialog,
      dialog: false,
      questionDialog: questionDialog,
      questionDialogShow: false,
      dialogData: null
    }
  },
  computed: {
    userData () {
      return this.$store.getters.userData
    },
    items () {
      return [
        { icon: 'mdi-worker',
          title: 'Администрирование',
          path: '/administration',
          visible: this.$router.requireAuth({name: 'administration'}, this.userData.user_role_id),
          isActive: this.isActive(['administration', 'administration.log', 'administration.clients',
            'administration.users', 'administration.settings', 'administration.general'])
        },
        { icon: 'mdi-book',
          title: 'Заявки',
          path: '/bids',
          visible: this.$router.requireAuth({name: 'bids'}, this.userData.user_role_id),
          isActive: this.isActive(['bids', 'bids.active', 'bids.inbox', 'bids.history', 'bids.details'])
        },
        { icon: 'dashboard',
          title: 'Каталог',
          path: '/catalogs',
          visible: this.$router.requireAuth({name: 'catalogs'}, this.userData.user_role_id),
          isActive: this.isActive(['catalogs'])
        },
        { icon: 'fas fa-cogs',
          title: 'Настройки данных',
          path: '/dataSettings',
          visible: this.$router.requireAuth({name: 'dataSettings'}, this.userData.user_role_id),
          isActive: this.isActive(['dataSettings', 'categories', 'brands', 'partners', 'userAgreement', 'currencies', 'units', 'display'])
        }
      ]
    },
    appliedMiniVariant () {
      switch (this.$vuetify.breakpoint.name) {
        case 'lg': return this.miniVariant
        case 'xl': return this.miniVariant
        default: return false
      }
    }
  },
  methods: {
    logOut () {
      this.dialogData = {
        message: 'Вы действительно хотите выйти?',
        title: 'Выход',
        isClosable: true
      }
      this.questionDialogShow = true
    },
    logOutDialog (confirmed) {
      this.questionDialogShow = false
      if (confirmed) {
        this.$store.dispatch('logout', null)
        this.$router.push({path: '/login'})
      }
    },
    isActive (names) {
      return _.includes(names, this.$route.name)
    },
    showUpdateModal: function () {
      this.dialogData = {
        title: 'Обновление пользователя',
        isClosable: true,
        item: _.cloneDeep(this.userData)
      }
      this.dialog = true
    },
    profileDialog (confirmed, data) {
      this.dialog = false
      if (confirmed) {
        console.log(data)
      }
    },
    goToRoute (path) {
      this.$store.commit('catalogBack', path === '/catalogs')
      this.$store.commit('categoryBack', path === '/categories')
      this.$router.push({path})
    }
  }
}
