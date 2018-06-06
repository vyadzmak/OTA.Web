
export default {
  name: 'partners',
  data () {
    return {
      items: [1, 2, 3, 4, 5, 6],
      level: 0,
      backbutton: false
    }
  },
  methods: {
  },
  computed: {
    userData () {
      return this.$store.getters.userData
    }
  },
  created () {
  },
  mounted () {
  }
}
