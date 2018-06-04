import Vue from 'Vue'

export const modalBus = new Vue()

const modalService = {
  addModal: function (config) {
    modalBus.$emit('addModal', config)
  },
  closeModal: function (id) {
    modalBus.$emit('closeModal', id)
  }
}
export default modalService
