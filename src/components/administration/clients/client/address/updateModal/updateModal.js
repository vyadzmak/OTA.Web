import {mapGetters} from 'vuex'

export default {
  name: 'dialogHeader',
  props: ['data'],
  data () {
    return {
      valid: false,
      nameRules: [
        (v) => !!v || 'Имя параметра должно быть заполнено',
        (v) => (v && v.length <= 500) || 'Не более 500 символов'
      ],
      sNameRules: [
        (v) => (!v || v.length <= 250) || 'Не более 250 символов'
      ]
    }
  },
  computed: {
    ...mapGetters({cityTypes: 'cityCatalog/items'})
  },
  methods: {
    submit: function () {
      if (this.$refs.form.validate()) {
        this.$emit('dialog-close', true, this.data.item, this.data.isUpdate)
      }
    },
    cancel: function () {
      this.$emit('dialog-close', false)
    },
    clear: function () {
      this.$refs.form.reset()
    }
  }
}
