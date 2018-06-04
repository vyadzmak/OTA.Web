<template>
  <v-card>
    <v-card-title :class="[data.titleClass ? data.titleClass : 'primary white--text']">
      <div :class="[data.headlineClass ? data.headlineClass : 'headline']">{{ data.title ? data.title : "Modal header" }}</div>
      <v-spacer/>
      <v-btn
        v-if="data.isClosable"
        icon
        dark
        @click="cancel"><v-icon>clear</v-icon></v-btn>
    </v-card-title>
    <v-card-text>{{ data.message }}</v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        color="success"
        dark
        @click="submit">Да</v-btn>
      <v-btn
        color="error"
        dark
        @click="cancel">Нет</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script src="./questionDialogJs.js"></script>

<style scoped></style>
