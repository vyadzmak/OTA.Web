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
        uploadMultiple: false
      },
      imgSrc: null
    }
  },
  computed: {
    ...mapGetters({client: 'clients/item'}),
    compItem () {
      let result = _.get(this.$store.getters, 'clientInfo/item', {})
      if (!this.item.id) {
        this.item = _.cloneDeep(result)
      }
      return result
    },
    imgUrl () {
      if (this.imgSrc) {
        return this.imgSrc
      } else if (this.compItem.logo_attachment_id) {
        return baseUrl.slice(0, -1) + this.compItem.attachment_data.thumb_file_path
      } else {
        return baseUrl.slice(0, -1) + this.userData.no_avatar_url
      }
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
    beforeSend (files, xhrRequest, formData) {
      xhrRequest.setRequestHeader('Access-Control-Allow-Origin', '*')
      xhrRequest.setRequestHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Key, Access-Control-Allow-Origin')
      this.$store.commit('showSpinner', true)
      formData.append('user_id', this.userData.id)
    },
    completeSend (e) {
      this.$store.commit('showSpinner', false)
      let xhrObj = _.get(e, 'xhr', {})
      if (xhrObj.status === 200) {
        this.imgSrc = e._dataUrl
        this.item.logo_attachment_id = JSON.parse(xhrObj.response)[0]
      } else {
        this.$store.commit('showSnackbar', {text: 'Загрузка файла не удалась. Обратитесь к администратору', snackbar: true, context: 'error'})
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
