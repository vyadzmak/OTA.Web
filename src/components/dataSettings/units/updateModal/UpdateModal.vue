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
        v-model="data.item.display_value"
        :rules="sNameRules"
        label="Отображаемое значение"
        required
      />
      <v-text-field
        v-model="data.item.system_name"
        :rules="sNameRules"
        label="Системное имя"
        required
      />
      <v-checkbox
        v-model="data.item.is_default"
        label="Использовать по умолчанию"/>
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
    </v-form>
  </v-card>
</template>

<script src="./updateModal.js"></script>

<style scoped></style>
