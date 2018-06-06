<template>
  <div>
    <v-card>
      <v-card-text>
        <v-layout
          row
          wrap>
          <v-flex
            lg6
            md6
            sm12
            pa-1>
            <v-text-field label="Наименование"/>
            <v-text-field label="Артикул"/>
            <v-textarea label="Краткое описание"/>
            <v-textarea label="Полное описание"/>
          </v-flex>
          <v-flex
            lg6
            md6
            sm12
            pa-1>
            <v-select label="Бренд"/>
            <v-select label="Партнерский товар"/>
            <v-text-field label="Стоимость"/>
            <v-select label="Валюта"/>
            <v-text-field label="Вес/Объем/Штук"/>
            <v-select label="Единица измерения"/>
            <v-checkbox label="Акционный товар"/>
            <v-textarea label="Текст акции"/>
            <v-checkbox label="Скидка"/>
            <v-text-field label="Сумму с учетом скидки"/>
            <v-checkbox label="Нет в наличии"/>
            <v-checkbox label="Не отображать в каталоге"/>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script src="./general.js"></script>

<style scoped></style>
