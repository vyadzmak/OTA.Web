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
  name: 'Administration',
  data () {
    return {
      items: [
        {id: 2, icon: 'mdi-account-multiple', name: 'Сотрудники', route: '/administration/users/'},
        {id: 3, icon: 'mdi-domain', name: 'Клиенты', route: '/administration/clients'},
        {id: 4, icon: 'mdi-information-outline', name: 'Лог', route: '/administration/log'},
        {id: 5, icon: 'mdi-settings', name: 'Системные настройки', route: '/administration/settings'},
        {id: 1, icon: 'mdi-file-chart', name: 'Общее', route: '/administration/general'}
      ]
    }
  }
}
</script>

<style scoped>
</style>
