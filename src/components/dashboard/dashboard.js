import questionDialog from '../questionDialog/QuestionDialog.vue'
import updateDialog from './updateModal/UpdateModal.vue'
import {admin as adminRoutes, bids as bidRoutes,
  settings as settingRoutes, catalog as catalogRoutes} from '@/router/routerNames'

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
          visible: _.includes(this.userData.user_role_data.user_role_route_access, 'administration'),
          isActive: this.isActive(adminRoutes)
        },
        { icon: 'mdi-book',
          title: 'Заявки',
          path: '/bids',
          visible: _.includes(this.userData.user_role_data.user_role_route_access, 'bids'),
          isActive: this.isActive(bidRoutes)
        },
        { icon: 'dashboard',
          title: 'Каталог',
          path: '/catalogs',
          visible: _.includes(this.userData.user_role_data.user_role_route_access, 'catalogs'),
          isActive: this.isActive(catalogRoutes)
        },
        { icon: 'fas fa-cogs',
          title: 'Настройки данных',
          path: '/dataSettings',
          visible: _.includes(this.userData.user_role_data.user_role_route_access, 'dataSettings'),
          isActive: this.isActive(settingRoutes)
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
