
export default {
  name: 'brands',
  data () {
    return {
      items: [1, 2, 3, 4, 5, 6],
      level: 0
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
