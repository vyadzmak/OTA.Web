
export default {
  name: 'questionDialog',
  props: ['data'],
  data () {
    return {
    }
  },
  methods: {
    submit: function () {
      this.$emit('dialog-close', true, this.data.data)
    },
    cancel: function () {
      this.$emit('dialog-close', false)
    }
  }
}
