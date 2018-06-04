
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
    },
    backbuttonCallback () {
      this.backbutton = true
    }
  },
  computed: {
    userData () {
      return this.$store.getters.userData
    },
    catalogBack () {
      return this.$store.getters.catalogBack
    }
  },
  created () {
    this.$store.commit('catalogBack', true)
  },
  mounted () {
  },
  beforeRouteLeave (to, from, next) {
    if (this.catalogBack) {
      if (this.items[0] < 10) {
        next()
      } else {
        let vm = this
        this.items = _.map(vm.items, item => {
          return item % Math.pow(10, vm.level)
        })
        this.level--
        this.backbutton = false
        next(false)
      }
    } else {
      next()
    }
  }
}
