<template>
  <div>
    <v-breadcrumbs class="py-1">
      <v-breadcrumbs-item
        v-for="item in breadcrumbs"
        :key="item.id"
        @click.native="goBack(item.id)"
      >
        {{ item.name }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
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

<script src="./category.js"></script>

<style scoped></style>
