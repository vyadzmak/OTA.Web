export default {
  name: 'dialogHeader',
  props: ['data'],
  data () {
    return {
      valid: false,
      sNameRules: [
        (v) => !!v || 'Наименование должно быть заполнено',
        (v) => (v && v.length <= 270) || 'Не более 270 символов'
      ],
      sDescRules: [(v) => (v.length <= 600) || 'Не более 600 символов'],
      descRules: [(v) => (v.length <= 1000) || 'Не более 1000 символов'],
      name: '',
      description: '',
      shortDescription: ''
    }
  },
  computed: {
  },
  methods: {
    submit: function () {
      if (this.$refs.form.validate()) {
        this.$emit('dialog-close', true, {name: this.name, description: this.description, short_description: this.shortDescription})
      }
    },
    cancel: function () {
      this.$emit('dialog-close', false)
    },
    clear: function () {
      this.$refs.form.reset()
    }
  },
  created () {
  }
}
