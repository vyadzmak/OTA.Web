<template>
  <div>
    <div
      v-show="false"
      v-text="compItem.id"/>
    <v-card>
      <v-card-actions><v-btn
        :disabled="!!$loading"
        dark
        color="success"
        @click="updateItem()"
      >Обновить</v-btn></v-card-actions>
      <v-card-text>
        <v-form ref="form">
          <v-layout
            row
            wrap>
            <v-flex
              lg6
              md6
              sm12
              pa-1>
              <v-text-field
                v-model="item.name"
                :rules="sNameRules"
                required
                label="Наименование"/>
              <v-text-field
                v-model="item.product_code"
                :rules="[(v)=> (!v || v.length <= 32) || 'Не более 32 символов']"
                label="Артикул"/>
              <v-textarea
                v-model="item.short_description"
                :rules="sDescRules"
                label="Краткое описание"/>
              <v-textarea
                v-model="item.full_description"
                :rules="descRules"
                label="Полное описание"/>
              <v-select
                v-model="item.category_id"
                :items="selectCategories"
                item-value="id"
                item-text="name"
                label="Категория"
                required
              />
            </v-flex>
            <v-flex
              lg6
              md6
              sm12
              pa-1>
              <v-select
                v-model="item.brand_id"
                :items="brandTypes"
                item-value="id"
                item-text="name"
                label="Бренд"
              />
              <v-select
                v-model="item.partner_id"
                :items="partnerTypes"
                item-value="id"
                item-text="name"
                label="Партнерский товар"
              />
              <v-text-field
                v-model="item.amount"
                :rules="numRules"
                required
                label="Стоимость"/>
              <v-text-field
                v-model="item.recommended_amount"
                :rules="[(v) => (!isNaN(parseFloat(v)) && isFinite(v)) || 'Введите число']"
                label="Рекомендуемая цена"/>
              <v-select
                v-model="item.currency_id"
                :items="currencyTypes"
                :rules="[(v) => !!v || 'Выберите валюту']"
                item-value="id"
                item-text="name"
                label="Валюта"
                required />
              <v-text-field
                v-model="item.unit_value"
                :rules="[(v) => (!isNaN(parseFloat(v)) && isFinite(v)) || 'Введите число']"
                label="Вес/Объем/Штук"/>
              <v-select
                v-model="item.unit_id"
                :items="unitTypes"
                item-value="id"
                item-text="name"
                label="Единица измерения" />
              <v-checkbox
                v-model="item.is_stock_product"
                label="Акционный товар"/>
              <v-textarea
                v-model="item.stock_text"
                :rules="[(v)=> (!v || v.length <= 150) || 'Не более 150 символов']"
                label="Текст акции"/>
              <v-checkbox
                v-model="item.is_discount_product"
                label="Скидка"/>
              <v-text-field
                v-model="item.discount_amount"
                :rules="[(v) => (!isNaN(parseFloat(v)) && isFinite(v)) || 'Введите число']"
                label="Сумму с учетом скидки"/>
              <v-text-field
                v-model="item.bonus_percent"
                :rules="[(v) => (!isNaN(parseFloat(v)) && isFinite(v)) || 'Введите число']"
                label="Бонусы, (%)"/>
              <v-checkbox
                v-model="item.not_available"
                label="Нет в наличии"/>
              <v-checkbox
                v-model="item.not_show_in_catalog"
                label="Не отображать в каталоге"/>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script src="./general.js"></script>

<style scoped></style>
