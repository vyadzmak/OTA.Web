<template>
  <v-card>
    <v-card-actions><v-btn
      dark
      color="success"
      @click="updateItem()"
    >Обновить</v-btn></v-card-actions>
    <v-card-text>
      <v-form ref="form">
        <v-layout
          column>
          <v-flex
            md6
            sm12
            pa-1>
            <v-text-field
              v-model="item.name"
              :rules="[ (v) => !!v || 'Имя параметра должно быть заполнено',
                        (v) => (v && v.length <= 70) || 'Не более 70 символов' ]"
              label="Наименование"/>
          </v-flex>
          <v-flex
            md6
            sm12
            pa-1>
            <v-text-field
              v-model="item.registration_number"
              :rules="[(v) => (!v || v.length <= 25) || 'Не более 25 символов']"
              label="Регистрационный номер"/>
          </v-flex>
          <v-flex
            md6
            sm12
            pa-1>
            <v-checkbox
              v-model="item.lock_state"
              label="Заблокирован"/>
          </v-flex>
          <v-flex
            md6
            sm12
            pa-1>
            <v-select
              v-model="item.client_type_id"
              :items="clientTypes"
              :rules="[(v) => !!v || 'Имя параметра должно быть заполнено']"
              item-value="id"
              item-text="title"
              label="Тип клиента"
              required
            />
          </v-flex>
        </v-layout>
      </v-form>
      <div v-show="false">{{ compItem }}</div>
    </v-card-text>
  </v-card>
</template>

<script src="./general.js"></script>

<style scoped></style>
