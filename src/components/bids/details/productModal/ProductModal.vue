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
    <v-card-text style="height:80vh">
      <div class="text-xs-center pa-1">
        <v-card-media
          :src="baseUrl+(item.default_image_id?item.default_image_data.thumb_file_path:userData.no_image_url)"
          height="125px"
          contain/>
      </div>
      <div class="pa-1">
        <div
          class="title text-xs-center"
          v-text="item.name"/>
        <div
          class="grey--text"
          v-text="`Артикул: `+item.product_code"/>
        <div
          class="grey--text"
          v-text="item.short_description"/>
        <div
          class="grey--text"
          v-text="item.full_description"/>
        <v-layout class="text-xs-center pa-1 white--text">
          <v-flex
            style="background: green"
            v-text="item.unit_value+' '+ldsh(units).filter({id: item.unit_id}).get('[0].display_value', '')"/>
          <v-flex
            style="background: purple"
            v-text="item.amount+' '+ldsh(currencies).filter({id: item.currency_id}).get('[0].display_value', '')"/>
        </v-layout>
      </div>
    </v-card-text>
  </v-card>
</template>

<script src="./productModal.js"></script>

<style scoped></style>
