import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      userData: 'userData',
      $loading: 'loading'
    })
  }
}
