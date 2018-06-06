<template>
  <v-container
    pa-2
    fluid
    grid-list-md>
    <v-layout
      row
      wrap>
      <v-flex
        tag="a"
        xs12
        sm6
        md3
        lg3
        @click="addItem(item)">
        <v-card
          height="100%"
          class="hover-card">
          <v-card-text
            class="text-xs-center py-5 grey--text"
          ><div class="display-3 pt-3">Добавить</div>
            <div><v-icon color="grey">fas fa-plus fa-7x</v-icon></div>
        </v-card-text></v-card>
      </v-flex>
      <v-flex
        v-for="(item, index) in items"
        :key="index"
        tag="a"
        xs12
        sm6
        md3
        lg3
        @click="goToRoute(item)">
        <v-card class="hover-card">
          <v-card-text
            class="text-xs-center"
          >
            <div class="card-top-action">
              <div><v-btn icon><v-icon color="info">mdi-pen</v-icon></v-btn></div>
              <div><v-btn icon><v-icon color="error">mdi-delete-variant</v-icon></v-btn></div>
            </div>
            <img
              width="150px"
              src="@/assets/img/p52.png">
          </v-card-text>
          <v-card-text
            class="text-xs-center">

            <div
              v-show="index%2===0"
              class="headline product-name">Kangaroo</div>
            <div
              v-show="index%2!==0"
              class="headline product-name">Top western road trips</div>
            <div class="grey--text">1,000 miles of  {{ item }}</div>
        </v-card-text></v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./partners.js"></script>

<style scoped lang="scss">
@import '../../../assets/styles/scss/mixins.scss';
.product-name {
  @include lineClamp(2);
}
</style>
