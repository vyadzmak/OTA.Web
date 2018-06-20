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
    <v-card-text style="height:80vh">
      <template v-if="data.isUpdate">
        <v-card-actions>
          <v-spacer/>
          <v-avatar size="125px">
            <img
              :src="imgUrl"
              class="img-circle elevation-7 mb-1"
            >
          </v-avatar>
          <v-spacer/>
        </v-card-actions>
        <v-card-actions>
          <v-spacer/>
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
          <v-spacer/>
        </v-card-actions>
      </template>
      <v-form
        ref="form"
        v-model="valid"
        class="v-card-form">
        <v-text-field
          v-model="data.item.name"
          :rules="nameRules"
          label="Имя"
          required
        />
        <v-text-field
          v-model="data.item.user_login.login"
          :rules="[(v) => !!v || 'Введите e-mail адрес',
                   (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Введите правильный e-mail адрес',
                   (v) => (!v || v.length <= 32) || 'Не более 32 символов']"
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
        <v-checkbox
          v-model="data.item.lock_state"
          label="Заблокирован"
          disabled/>
        <v-select
          v-model="data.item.client_data"
          :items="clients"
          item-value="id"
          item-text="name"
          return-object
          label="Клиент"
          disabled
        />
        <v-select
          v-model="data.item.user_role_data"
          :items="userRoles"
          item-value="id"
          item-text="title"
          return-object
          label="Роль"
          disabled
        />
        <template v-if="data.isUpdate">
          <v-text-field
            v-model="data.item.user_info_data.email"
            :rules="[(v) => (!v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)) || 'Введите правильный e-mail адрес',
                     (v) => (!v || v.length <= 32) || 'Не более 32 символов']"
            label="Email"
          />
          <v-text-field
            v-model="data.item.user_info_data.phone_number"
            :rules="[(v) => (!v || v.length <= 32) || 'Не более 32 символов']"
            label="Телефон"
          />
          <v-menu
            :close-on-content-click="false"
            v-model="datePicker"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="data.item.user_info_data.birthday"
              label="Дата рождения"
              prepend-icon="event"
              readonly
            />
            <v-date-picker
              v-model="data.item.user_info_data.birthday"
              no-title
              @input="datePicker = false"/>
          </v-menu>
        </template>
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

<script src="./updateModal.js"></script>

<style scoped></style>
