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
    <v-form
      ref="form"
      v-model="valid"
      class="v-card-form">
      <v-text-field
        v-model="data.item.first_name"
        :rules="fNameRules"
        label="Имя"
        required
      />
      <v-text-field
        v-model="data.item.last_name"
        :rules="lNameRules"
        label="Фамилия"
        required
      />
      <v-text-field
        v-model="data.item.login_data[0].login"
        :rules="emailRules"
        label="Логин"
        required
      />
      <v-text-field
        v-model="data.item.login_data[0].password"
        :rules="passwordRules"
        :append-icon="'refresh'"
        :append-icon-cb="generatePassword"
        label="Пароль"
        required
      />
      <v-select
        v-model="data.item.user_role_id"
        :items="userRoles"
        :rules="[(v) => !!v || 'Выберите роль']"
        item-text="name"
        item-value="id"
        label="Роль пользователя"
        required
      />
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
    </v-form>
  </v-card>
</template>

<script src="./updateModal.js"></script>

<style scoped></style>
