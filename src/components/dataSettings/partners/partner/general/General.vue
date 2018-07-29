<template>
  <div>
    <v-card>
      <v-card-actions><v-btn
        :disabled="!!$loading"
        dark
        color="success"
        @click="updateItem()"
      >Обновить</v-btn></v-card-actions>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="item.name"
            :rules="sNameRules"
            required
            label="Наименование"/>
          <v-text-field
            v-model.number="item.minimum_order_amount"
            :rules="[(v) => (!isNaN(parseFloat(v)) && isFinite(v)) || 'Введите число']"
            label="Минимальная сумма заказа"/>
          <v-textarea
            v-model="item.short_description"
            :rules="sDescRules"
            label="Краткое описание"/>
          <v-textarea
            v-model="item.description"
            :rules="descRules"
            label="Описание"/>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script src="./general.js"></script>

<style scoped></style>
