<template>
  <v-card>
    <div
      v-show="false"
      v-text="compItem"/>
    <v-card-title class="headline">Пользовательское соглашение</v-card-title>
    <v-card-actions><v-btn
      dark
      color="success"
      @click="updateItem()"
    >Обновить</v-btn></v-card-actions>
    <v-card-text>
      <v-textarea
        v-model="settings.user_agreement"/>
    </v-card-text>
  </v-card>
</template>

<script src="./userAgreement.js"></script>

<style scoped lang="scss">
</style>
