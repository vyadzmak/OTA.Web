
export default {
  name: 'dialogHeader',
  props: ['data'],
  data () {
    return {
      valid: false,
      nameRules: [
        (v) => !!v || 'Имя параметра должно быть заполнено',
        (v) => (v && v.length <= 600) || 'Не более 600 символов'
      ],
      numRules: [
        (v) => !!v || 'Стоимость должна быть заполнена',
        (v) => (!isNaN(parseFloat(v)) && isFinite(v)) || 'Введите число'
      ]
    }
  },
  computed: {
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
