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
    <v-card-text style="height: 80vh;">
      <v-form
        ref="form"
        class="v-card-form">
        <v-text-field
          v-model="data.item.email"
          :rules="[(v) => (!v || v.length <= 32) || 'Не более 32 символов']"
          label="Регистрация"
        />
        <v-text-field
          v-model="data.item.phone_number"
          :rules="[(v) => (!v || v.length <= 32) || 'Не более 32 символов']"
          label="Телефон"
        />
        <v-textarea
          v-model="data.item.main_info"
          :rules="[(v) => (!v || v.length <= 5500) || 'Не более 5500 символов']"
          label="Основная информация"
        />
        <v-textarea
          v-model="data.item.additional_info"
          :rules="[(v) => (!v || v.length <= 1500) || 'Не более 1500 символов']"
          label="Дополнительная информация"
        />
      </v-form>
      <v-avatar size="125px">
        <img
          class="img-circle elevation-7 mb-1"
          src="https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/lists/1.jpg"
        >
      </v-avatar>
      <vue-transmit
        ref="uploader"
        v-bind="options"
        class="col-12 mb-2"
        tag="section"
        @complete-multiple="updateAvatar">
        <v-btn
          dark
          color="info">Сменить аватар</v-btn>
      </vue-transmit>
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

<script src="./updateModal.js"></script>

<style scoped></style>
