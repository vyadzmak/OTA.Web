import { ModalService } from 'vue-modal-dialog'
import validators from 'vue-form-generator'

export default {
  name: 'dialogHeader',
  props: ['data'],
  data () {
    let vm = this
    let mData = JSON.parse(this.$store.getters.catalogSchema.data)
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
      sNameRules: [
        (v) => !!v || 'Наименование должно быть заполнено',
        (v) => (v && v.length <= 270) || 'Не более 270 символов'
      ],

      updateItem: this.data.item,
      formSchema: {},
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        fieldIdPrefix: 'prefix-'
      }
    }
  },
  computed: {
    updCatalogSchema () {
      return this.$store.getters.catalogSchema
    }
  },
  methods: {
    submit: function () {
      ModalService.submit(this.updateItem)
    },
    cancel: function () {
      this.$store.commit('showSpinner', false)
      ModalService.cancel(this.updateItem) // reject .open() promise
    },
    clear: function () {
      this.$refs.form.reset()
    },
    generateSchema () {
      let vm = this
      this.formSchema.fields = []
      _.forEach(this.updateItem.fields, function (value, key) {
        if (!vm.isUpdate) {
          if (value.field_type === 9) { // value.field_type === 5 ||
            let listItems = JSON.parse(value.items)
            value.value = listItems && listItems.length > 0 ? listItems[0].id : null
          }
          _.forEach(value.var, function (vValue, vKey) {
            if (vKey.indexOf('default_value') === 0) {
              vm.updateItem.fields[key].value = vValue
            }
          })
        }
        vm.formSchema.fields.push(vm.generateField(value, key))
      })
    },
    generateField (value, key) {
      let field = {
        label: value.title,
        model: 'fields[' + key + '].value'
      }
      this.getFieldType(field, value)
      return field
    },
    getFieldType (field, value) {
      switch (value.field_type) {
        case 0: field.type = 'input'
          field.inputType = 'text'
          field.required = value.var.not_null
          field.maxlength = value.max_length
          field.max = value.max_length
          field.min = value.min_length
          field.validator = validators.string
          break
        case 1: field.type = 'input'
          field.inputType = 'number'
          field.required = value.var.not_null
          field.max = value.max_length
          field.min = value.min_length
          field.step = 0
          field.validator = validators.integer
          break
        case 2: field.type = 'input'
          field.inputType = 'number'
          field.required = value.var.not_null
          field.max = value.max_length
          field.min = value.min_length
          field.step = value.round_count
          field.validator = validators.double
          break
        case 3: field.type = 'vdatepicker'
          field.inputType = 'text'
          field.required = value.var.not_null
          field.validator = validators.date
          break
        case 4: field.type = 'input'
          field.inputType = 'text'
          field.required = value.var.not_null
          field.validator = validators.string
          break
        // case 5: field.type = 'select'
        //   field.required = value.var.not_null
        //   field.values = JSON.parse(value.items)
        //   break
        case 6: field.type = 'switch'
          field.textOn = value.var.true_value ? value.var.true_value : 'да'
          field.textOff = value.var.false_value ? value.var.false_value : 'нет'
          break
        case 9: field.type = 'select'
          field.required = value.var.not_null
          field.values = JSON.parse(value.items)
          break
      }
    }
  },
  created () {
    this.generateSchema()
  }
}
