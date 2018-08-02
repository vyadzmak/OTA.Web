import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      userData: 'userData',
      $loading: 'loading'
    }),
    $deleteDisabled () { return this.userData.user_role_data.id !== 1 }
  }
}
