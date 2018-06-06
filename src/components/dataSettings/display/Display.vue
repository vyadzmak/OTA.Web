<template>
  <v-tabs
    v-model="tab"
    icons-and-text
    centered
    grow
    dark
    color="primary">
    <v-tabs-slider color="warning"/>
    <v-tab
      v-for="item in tabs"
      :key="`tab-${item.id}`"
      :href="'#tab-'+item.id">
      {{ item.name }}
      <v-icon>{{ item.icon }}</v-icon>
    </v-tab>
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in tabs"
        :id="'tab-'+item.id"
        :key="`tab-item-${item.id}`">
        <component :is="item.component"/>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script src="./display.js"></script>

<style scoped lang="scss">
</style>
