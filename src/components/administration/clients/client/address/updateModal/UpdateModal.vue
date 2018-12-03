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
    <v-card-text style="height: 80vh">
      <v-form
        ref="form"
        v-model="valid"
        class="v-card-form">
        <v-text-field
          v-model="data.item.address"
          :rules="nameRules"
          label="Адрес"
          required
        />
        <v-text-field
          v-model="data.item.name"
          :rules="sNameRules"
          label="Название"
        />
        <v-text-field
          v-model="data.item.code"
          :rules="sNameRules"
          label="Менеджер"
        />
        <v-text-field
          v-model="data.item.phone_number"
          :rules="[(v) => (!v || v.length <= 50) || 'Не более 50 символов']"
          label="Телефон"
        />
        <v-select
          v-model="areaId"
          :items="areaTypes"
          item-value="id"
          item-text="name"
          label="Регион/область"
          @change="areaUpdated"
        />
        <v-select
          v-model="data.item.city_id"
          :items="cityTypes"
          :disabled="!areaId"
          item-value="id"
          item-text="name"
          label="Город/а.е."
        />
        <v-checkbox
          v-model="data.item.is_default"
          label="По умолчанию"/>
        <v-checkbox
          v-model="data.item.confirmed"
          label="Подтвержден"/>
        <v-checkbox
          v-model="data.item.tobacco_alcohol_license"
          label="Лицензия на алкоголь и табак"/>
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
