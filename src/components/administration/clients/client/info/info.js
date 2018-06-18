import {mapGetters} from 'vuex'
import {baseUrl} from '@/httpClient/index'

export default {
  name: 'clientGeneral',
  data () {
    return {
      item: {},
      options: {
        acceptedFileTypes: ['.jpg', '.jpeg', '.png'],
        url: baseUrl + 'uploadFiles',
        autoProcessQueue: true,
        uploadMultiple: true
      }
    }
  },
  computed: {
    ...mapGetters({userData: 'userData', client: 'clients/item'}),
    compItem () {
      let result = _.get(this.$store.getters, 'clientInfo/item', {})
      this.item = _.cloneDeep(result)
      return result
    }
  },
  methods: {
    updateItem () {
      let isUpdate = true
      if (!this.item.client_id) {
        isUpdate = false
        this.item.client_id = this.client.id
      }
      this.$store.dispatch('clientInfo/updateItem', {item: this.item, isUpdate})
    },
    updateAvatar (e) {
      if (e[0].xhr.status === 200) {
        this.$store.dispatch('clientInfo/updateItem', {item: this.item, isUpdate: true})
      } else {
        this.$store.commit('showSnackbar', {text: 'Загрузка картинки не удалась', snackbar: true, context: 'error'})
      }
    }
  },
  created () {
    this.$store.dispatch('clientInfo/clientInfoByClient', {user_id: this.userData.id, client_id: this.client.id})
  },
  mounted () {
  },
  beforeDestroy () {
    this.$store.commit('clientInfo/item', {})
  }
}
