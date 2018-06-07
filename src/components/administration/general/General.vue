<template>
  <div>
    <v-card>
      <v-card-text>
        <v-layout
          column>
          <v-flex
            md6
            sm12
            pa-1>
            <v-text-field
              v-model="settings.data_refresh_interval"
              label="Время обновления заявок (в мс)"/>
          </v-flex>
          <v-flex
            md6
            sm12
            pa-1>
            <v-text-field
              v-model="settings.count_data_take_device"
              label="Количество данных выводимых ну устройства (для операции take)"/>
          </v-flex>
          <v-flex
            md6
            sm12
            pa-1>
            <v-text-field
              v-model="settings.count_log_data_records_auto_clean"
              label="Количество записей в логе для его авто очистки"/>
          </v-flex>
        </v-layout>
        <div v-show="false">{{ items }}</div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script src="./general.js"></script>

<style scoped></style>
