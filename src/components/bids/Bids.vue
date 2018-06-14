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
    <router-view :key="$route.path"/>
  </div>
</template>

<script src="./bids.js"></script>

<style scoped></style>
