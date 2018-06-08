<template>
  <v-card>
    <v-card-title :class="[data.titleClass ? data.titleClass : 'info white--text']">
      <div :class="[data.headlineClass ? data.headlineClass : 'headline']">{{ data.title ? data.title : "Modal header" }}</div>
      <v-spacer/>
      <v-btn
        v-if="data.isClosable"
        icon
        dark
        @click="cancel"><v-icon>clear</v-icon></v-btn>
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid">
        <v-text-field
          v-model="data.item.name"
          :rules="sNameRules"
          required
          label="Наименование"/>
        <v-textarea
          v-model="data.item.short_description"
          :rules="sDescRules"
          label="Краткое описание"/>
        <v-textarea
          v-model="data.item.description"
          :rules="descRules"
          label="Описание"/>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn @click="clear">Очистить</v-btn>
      <v-btn
        :class="{ green: valid, red: !valid }"
        color="success"
        dark
        @click="submit">Сохранить</v-btn>
      <v-btn
        color="error"
        dark
        @click="cancel">Отмена</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script src="./updateModalJs.js"></script>

<style scoped></style>
