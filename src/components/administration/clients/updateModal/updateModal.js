import {mapGetters} from 'vuex'

export default {
  name: 'dialogHeader',
  props: ['data'],
  data () {
    return {
      valid: false,
      sNameRules: [
        (v) => (v && v.length <= 25) || 'Не более 25 символов'
      ],
      nameRules: [
        (v) => !!v || 'Имя параметра должно быть заполнено',
        (v) => (v && v.length <= 70) || 'Не более 70 символов'
      ]
    }
  },
  computed: {
    ...mapGetters({clientTypes: 'clientTypes/items'})
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
