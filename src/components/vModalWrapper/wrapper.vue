<template>
  <div>
    <v-dialog
      v-for="modal in modals"
      v-model="modal.show"
      :key="modal.id"
      hide-overlay>

      <component
        :data = "modal.config.data"
        :is="modal.config.component"
        @close="closeModal(modal.id)"/>
    </v-dialog>
  </div>
</template>

<script>
import {modalBus} from './service.js'
var uuidv4 = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0
    var v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
export default {
  name: 'ModalWrapper',
  data () {
    return {
      modals: []
    }
  },
  computed: {
  },
  watch: {
    modals: {
      handler: function (val, oldVal) {
        if (val.length === oldVal) {
          _.remove(this.modals, (item) => { return item.show === false })
        }
      },
      deep: true
    }
  },
  created () {
    modalBus.$on('addModal', (config) => {
      this.addModal(config)
    })
    modalBus.$on('closeModal', (id) => {
      this.closeModal(id)
    })
  },
  mounted () {
  },
  methods: {
    addModal (config) {
      return new Promise((resolve, reject) => {
        this.modals.push({ id: uuidv4(), show: false, config, resolve, reject })
        this.$nextTick(() => {
          this.modals[this.modals.length - 1].show = true
        })
      })
    },
    closeModal (id) {
      let modal = _.find(this.modals, {'id': id}, null)
      if (modal) {
        modal.show = false
        modal.resolve(id)
      }
    }
  }
}
</script>
