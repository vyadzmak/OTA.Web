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
        <div
          v-show="false"
          v-text="compItem.id"/>
        <v-form ref="form">
          <v-text-field
            v-model="item.name"
            :rules="sNameRules"
            required
            label="Наименование"/>
          <v-textarea
            v-model="item.short_description"
            :rules="sDescRules"
            label="Краткое описание"/>
          <v-textarea
            v-model="item.full_description"
            :rules="descRules"
            label="Описание"/>
          <v-select
            v-model="item.parent_category_id"
            :items="selectCategories"
            item-value="id"
            item-text="name"
            label="Родительская категория"
            required
          />
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script src="./general.js"></script>

<style scoped></style>
