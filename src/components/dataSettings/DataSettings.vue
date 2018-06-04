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
        sm6
        md3
        lg3>
        <v-card class="hover-card">
          <v-card-text
            class="text-xs-center"
          >
            <img
              :src="'static/p'+(item.id-1)+'.png'"
              width="150px">
          </v-card-text>
          <v-card-text
            class="text-xs-center">
            <div
              class="headline category-name"
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
  @include lineClamp(2);
  // @include responsiveText(14px, 22px);
}
</style>
