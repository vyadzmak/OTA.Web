<template>
  <div>
    <v-tabs
      icons-and-text
      centered
      grow
      dark
      color="primary">
      <v-tabs-slider color="warning"/>
      <v-tab
        v-for="item in items"
        :key="item.id"
        :to="item.route">
        {{ item.name }}
        <v-icon>{{ item.icon }}</v-icon>
      </v-tab>
    </v-tabs>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'Partner',
  data () {
    return {
      items: [
        {id: 1, icon: 'mdi-file-chart', name: 'Общее', route: '/partner/general'},
        {id: 2, icon: 'fas fa-images', name: 'Галерея', route: '/partner/gallery/'}
      ]
    }
  }
}
</script>

<style scoped></style>
