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
        v-model="settings.show_slider"
        label="Отображать слайдер"/>
      <v-checkbox
        v-model="settings.show_badges"
        label="Отображать бэджи"/>
      <v-checkbox
        v-model="settings.show_recommendations"
        label="Отображать рекомендации"/>
      <v-checkbox
        v-model="settings.show_brands"
        label="Отображать бренды"/>
    </v-card-text>
  </v-card>
</template>

<script src="./general.js"></script>

<style scoped lang="scss">
</style>
