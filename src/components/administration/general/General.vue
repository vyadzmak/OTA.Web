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
            <v-text-field label="Время обновления заявок (в мс)"/>
          </v-flex>
          <v-flex
            md6
            sm12
            pa-1>
            <v-text-field label="Количество данных выводимых ну устройства (для операции take)"/>
          </v-flex>
          <v-flex
            md6
            sm12
            pa-1>
            <v-text-field label="Количество записей в логе для его авто очистки"/>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script src="./general.js"></script>

<style scoped></style>
