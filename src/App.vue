<template>
  <v-app>
    <div
      v-show="loading!==0"
      class="spinner-position">
      <v-progress-circular
        :size="120"
        :width="15"
        indeterminate
        class="blue--text"/>
    </div>
    <v-snackbar
      :timeout="snackbarOptions.timeout"
      :top="snackbarOptions.ylay === 'top'"
      :bottom="snackbarOptions.ylay === 'bottom'"
      :right="snackbarOptions.xlay === 'right'"
      :left="snackbarOptions.xlay === 'left'"
      :color="snackbarOptions.context"
      :multi-line="snackbarOptions.mode === 'multi-line'"
      :vertical="snackbarOptions.mode === 'vertical'"
      :text = "snackbarOptions.text"
      v-model="snackbarOptions.snackbar"
    >
      {{ snackbarOptions.text }}
      <v-btn
        dark
        flat
        @click.native="closeSnackbar">Закрыть</v-btn>
    </v-snackbar>
    <modal-dialog/>
    <router-view/>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    snackbarOptions () {
      return this.$store.state.snackbarOptions
    }
  },
  methods: {
    closeSnackbar () {
      this.$store.commit('showSnackbar', {snackbar: false})
    }
  }
}
</script>

<style lang="scss"></style>
