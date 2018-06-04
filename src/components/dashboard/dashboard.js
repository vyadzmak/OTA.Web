import questionDialog from '../questionDialog/QuestionDialog.vue'
import updateModal from './updateModal/UpdateModal.vue'
import { ModalService } from 'vue-modal-dialog'

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
      fab: false
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
          isActive: this.isActive(['bids'])
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
          isActive: this.isActive(['dataSettings'])
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
    logOut: function () {
      let modalConfig = {
        size: 'md',
        data: {
          message: 'Вы действительно хотите выйти?',
          title: 'Выход',
          isClosable: true
        }
      }
      ModalService.open(questionDialog, modalConfig).then(
        modalSubmit => {
          this.$store.dispatch('logout', null)
          this.$router.push({path: '/login'})
        },
        modalCancel => {}
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    isActive (names) {
      return _.includes(names, this.$route.name)
    },
    showUpdateModal: function () {
      let item = _.cloneDeep(this.userData)
      let isUpdate = true
      let modalConfig = {
        size: 'lg',
        data: {
          title: (isUpdate ? 'Обновление' : 'Добавление') + ' пользователя',
          isClosable: true,
          item: isUpdate ? Object.assign({}, item) : item
        }
      }
      ModalService.open(updateModal, modalConfig).then(
        modalSubmit => {
          // this.updateItem(modalSubmit, isUpdate)
        },
        modalCancel => { console.log(modalCancel) }
      ).catch(err => { console.log(err) })
    },
    goToMessages: function (item) { console.log(item) },
    goToNotifications: function (item) { console.log(item) },
    goToRoute (path) {
      this.$store.commit('catalogBack', path === '/catalogs')
      this.$router.push({path})
    }
  }
}
