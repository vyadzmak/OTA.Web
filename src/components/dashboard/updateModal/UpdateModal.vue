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
        @sending = "beforeSend"
        @complete="completeSend">
        <v-btn
          dark
          color="info">Сменить аватар</v-btn>
      </vue-transmit>
      <v-form
        ref="form"
        v-model="valid">
        <v-text-field
          v-model="updateUser.login_data.login"
          label="Логин"
          disabled
        />
        <v-text-field
          v-model="newPassword"
          :rules="passwordRules"
          :append-icon="'refresh'"
          :append-icon-cb="generatePassword"
          label="Новый пароль"
          required
        />
        <v-text-field
          v-model="repeatPassword"
          :rules="passwordRepeatRules"
          label="Повторите пароль"
          required
        />
        <v-text-field
          v-model="updateUser.first_name"
          :rules="fNameRules"
          label="Имя"
          required
        />
        <v-text-field
          v-model="updateUser.last_name"
          :rules="lNameRules"
          label="Фамилия"
          required
        />
        <v-text-field
          v-model="updateUser.phone"
          label="Телефон"
          required
        />
        <v-checkbox label="Присылать уведомления на почту"/>
        <v-checkbox label="Присылать смс-уведомления на телефон"/>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
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
