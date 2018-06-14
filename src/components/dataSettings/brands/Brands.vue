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
        @click="openDialog()">
        <v-card
          height="100%"
          class="hover-card">
          <v-card-text
            class="text-xs-center py-5 grey--text"
          ><div class="display-3 pt-3">Добавить</div>
            <div><v-icon color="grey">fas fa-plus fa-7x</v-icon></div>
            <v-dialog
              v-model="dialog"
              max-width="500px">
              <component
                v-if="dialog"
                :is="dialogComponent"
                :data="dialogData"
                @dialog-close="dialogClose"/>
            </v-dialog>
            <v-dialog
              v-model="qDialog"
              scrollable
              max-width="300px">
              <component
                v-if="qDialog"
                :is="qDialogComponent"
                :data="dialogData"
                @dialog-close="qDialogClose"/>
            </v-dialog>
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
        @click="goTo(item)">
        <v-card class="hover-card">
          <v-card-text
            class="text-xs-center"
          >
            <div class="card-top-action">
              <div><v-btn icon><v-icon color="info">mdi-pen</v-icon></v-btn></div>
              <div><v-btn
                icon
                @click.stop="openQDialog(item.id)"><v-icon color="error">mdi-delete-variant</v-icon></v-btn></div>
            </div>
            <v-card-media
              :key="index+'img'"
              :src="baseUrl+(item.default_image_id?item.default_image_data_brands.thumb_file_path:userData.no_image_url)"
              height="150px"
              contain/>
          </v-card-text>
          <v-card-text
            class="text-xs-center">

            <div
              class="headline product-name">{{ item.name }}</div>
        </v-card-text></v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./brands.js"></script>

<style scoped lang="scss">
@import '../../../assets/styles/scss/mixins.scss';
.product-name {
  @include lineClamp(2);
}
</style>
