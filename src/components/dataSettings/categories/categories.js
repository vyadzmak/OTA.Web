
export default {
  name: 'categories',
  data () {
    return {
      msg: 'Настройка каталогов',
      items: [1, 2, 3, 4, 5, 6],
      level: 0,
      backbutton: false
    }
  },
  methods: {
    goToRoute (number) {
      this.level++
      let vm = this
      this.items = _.map(vm.items, item => {
        return item + number % 10 * Math.pow(10, vm.level)
      })
    }
  },
  computed: {
    userData () {
      return this.$store.getters.userData
    },
    categoryBack () {
      return this.$store.getters.categoryBack
    }
  },
  created () {
    this.$store.commit('categoryBack', true)
  },
  mounted () {
  },
  beforeRouteLeave (to, from, next) {
    if (this.categoryBack) {
      if (this.items[0] < 10) {
        next()
      } else {
        let vm = this
        this.items = _.map(vm.items, item => {
          return item % Math.pow(10, vm.level)
        })
        this.level--
        next(false)
      }
    } else {
      next()
    }
  }
}
