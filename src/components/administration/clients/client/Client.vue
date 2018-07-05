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
  name: 'Client',
  data () {
    return {
      items: [
        {id: 1, icon: 'mdi-file-chart', name: 'Общее', route: '/administration/client/general'},
        {id: 2, icon: 'mdi-account-multiple', name: 'Пользователи', route: '/administration/client/users/'},
        {id: 3, icon: 'fas fa-info', name: 'Информация', route: '/administration/client/info'},
        {id: 4, icon: 'fas fa-address-card', name: 'Адреса', route: '/administration/client/address'}
      ]
    }
  }
}
</script>

<style scoped></style>
