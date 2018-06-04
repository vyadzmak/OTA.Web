import { ModalService } from 'vue-modal-dialog'

export default {
  inject: ['$validator'],
  name: 'dialogHeader',
  props: ['data'],
  data () {
    let vm = this
    let mData = JSON.parse(this.$store.getters.entitySchema.data)
    if (this.data.item.id) {
      _.forEach(this.data.item.fields, function (value, key) {
        _.forEach(mData.fields, function (mvalue, mkey) {
          if (value.index === mvalue.index) {
            vm.data.item.fields[key].items = mvalue.items ? mvalue.items : undefined
            vm.data.item.fields[key].var = mvalue.var
          }
        })
      })
    } else {
      this.data.item.fields = _.cloneDeep(mData.fields)
    }
    return {
      isUpdate: !!this.data.item.id,
      valid: false,

      updateItem: this.data.item,
      formSchema: {},
      formOptions: {
        fieldIdPrefix: 'entity-'
      }
    }
  },
  computed: {
    updEntitySchema () {
      return this.$store.getters.entitySchema
    }
  },
  methods: {
    submit: function () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            ModalService.submit(this.updateItem)
          }
        })
    },
    cancel: function () {
      this.$store.commit('showSpinner', false)
      ModalService.cancel(this.updateItem) // reject .open() promise
    },
    clear: function () {
      this.$validator.reset()
    }
  },
  created () {
  }
}
