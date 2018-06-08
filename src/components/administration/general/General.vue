<template>
  <div>
    <v-card>
      <v-card-text>
        <v-form ref="form">
          <v-layout
            column>
            <v-flex
              md6
              sm12
              pa-1>
              <v-text-field
                v-model="settings.data_refresh_interval"
                :rules="rules"
                label="Время обновления заявок (в мс)"/>
            </v-flex>
            <v-flex
              md6
              sm12
              pa-1>
              <v-text-field
                v-model="settings.count_data_take_device"
                :rules="rules"
                label="Количество данных выводимых ну устройства (для операции take)"/>
            </v-flex>
            <v-flex
              md6
              sm12
              pa-1>
              <v-text-field
                v-model="settings.count_log_data_records_auto_clean"
                :rules="rules"
                label="Количество записей в логе для его авто очистки"/>
            </v-flex>
          </v-layout>
        </v-form>
        <div v-show="false">{{ items }}</div>
      </v-card-text>
      <v-card-actions><v-btn
        dark
        color="success"
        @click="updateItem()"
      >Обновить</v-btn></v-card-actions>
    </v-card>
  </div>
</template>

<script src="./general.js"></script>

<style scoped></style>
