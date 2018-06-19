import questionDialog from '@/components/questionDialog/QuestionDialog.vue'
import updateDialog from './updateModal/UpdateModal.vue'
import {admin as adminRoutes, bids as bidRoutes,
  settings as settingRoutes, catalog as catalogRoutes} from '@/router/routerNames'
import {baseUrl} from '@/httpClient/index'

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
          isActive: this.isActive(bidRoutes),
          hasBadge: true
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
    },
    avatarUrl () {
      if (this.userData.user_info_data && this.userData.user_info_data.avatar_id) {
        return baseUrl.slice(0, -1) + _.get(this.userData, 'user_info_data.avatar_data.thumb_file_path')
      } else {
        return this.userData.no_avatar_url
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
    showUpdateModal: async function () {
      let userDetails = await this.$store.dispatch('crudUsers/userDetails', {user_id: this.userData.id, request_user_id: this.userData.id})
      userDetails = this.$store.getters['crudUsers/item']
      this.dialogData = {
        title: 'Обновление пользователя',
        isClosable: true,
        item: _.cloneDeep(userDetails),
        isUpdate: true
      }
      this.dialog = true
    },
    profileDialog: async function (confirmed, item, isUpdate) {
      this.dialog = false
      if (confirmed) {
        let updateResult = await this.$store.dispatch('crudUsers/updateItem', {item, isUpdate, fromDashboard: true})
        updateResult = this.$store.getters['crudUsers/item']
        this.$store.commit('updateByPath', {path: 'loginUser.userData.name', value: updateResult.name})
        this.$store.commit('updateByPath', {path: 'loginUser.userData.user_info_data', value: updateResult.user_info_data})
      }
    },
    goToRoute (path) {
      this.$store.commit('catalogBack', path === '/catalogs')
      this.$store.commit('categoryBack', path === '/categories')
      this.$router.push({path})
    }
  }
}
