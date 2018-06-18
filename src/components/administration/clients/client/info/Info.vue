<template>
  <v-card>
    <v-form ref="form">
      <v-card-text>
        <v-layout
          column
          wrap>
          <v-flex
            lg6
            md6
            sm12
            pa-1>
            <v-text-field
              v-model="item.email"
              :rules="[(v) => !!v || 'Введите e-mail адрес',
                       (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Введите правильный e-mail адрес',
                       (v) => (!v || v.length <= 32) || 'Не более 32 символов']"
              label="Email"
            />
            <v-text-field
              v-model="item.phone_number"
              :rules="[(v) => (!v || v.length <= 32) || 'Не более 32 символов']"
              label="Телефон"
            />
            <v-textarea
              v-model="item.main_info"
              :rules="[(v) => (!v || v.length <= 5500) || 'Не более 5500 символов']"
              label="Основная информация"
            />
            <v-textarea
              v-model="item.additional_info"
              :rules="[(v) => (!v || v.length <= 1500) || 'Не более 1500 символов']"
              label="Дополнительная информация"
            />
          </v-flex>
          <v-flex
            lg6
            md6
            sm12
            pa-1>
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
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-form>
    <div
      v-text="compItem"/>
    <v-card-actions><v-btn
      dark
      color="success"
      @click="updateItem()"
    >Обновить</v-btn></v-card-actions>
  </v-card>
</template>

<script src="./info.js"></script>

<style scoped></style>
