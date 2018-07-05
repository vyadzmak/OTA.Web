<template>
  <v-card>
    <div v-show="false">{{ item }}</div>
    <v-card-actions><v-btn
      :disabled="!!$loading"
      dark
      color="success"
      @click="updateItem()"
    >Обновить</v-btn></v-card-actions>
    <v-card-text>
      <v-checkbox
        v-model="settings.show_badge_popular"
        label="Отображать популярное"/>
      <v-checkbox
        v-model="settings.show_badge_discount"
        label="Отображать скидки"/>
      <v-checkbox
        v-model="settings.show_badge_stock"
        label="Отображать акции"/>
      <v-checkbox
        v-model="settings.show_badge_partners"
        label="Отображать партнеры"/>
    </v-card-text>
  </v-card>
</template>

<script src="./badges.js"></script>

<style scoped lang="scss">
</style>
