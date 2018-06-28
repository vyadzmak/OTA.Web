<template>
  <v-container
    pa-2
    fluid
    grid-list-md>
    <v-layout
      row
      wrap>
      <v-flex
        v-for="(item, index) in items"
        :key="index"
        tag="a"
        xs12
        sm4
        md2
        lg2
        @click="goToSetting(item.path)">
        <v-card class="hover-card">
          <div class="text-xs-center pa-1">
            <img
              :src="'static/p'+(item.id-1)+'.png'"
              width="125px">
          </div>
          <v-card-text
            class="text-xs-center">
            <div
              v-line-clamp="2"
              class="subheading category-name"
              v-text="item.name"/>
        </v-card-text></v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./dataSettingsJs.js"></script>

<style lang="scss" scoped>
@import '../../assets/styles/scss/mixins.scss';

.category-name {
  height: 45px;
}
</style>
