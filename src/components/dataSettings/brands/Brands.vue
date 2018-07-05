<template>
  <v-container
    pa-2
    fluid
    grid-list-md>
    <v-layout
      row
      wrap>
      <v-flex
        :disabled="!!$loading"
        tag="a"
        xs12
        sm4
        md2
        lg2
        @click="openDialog()">
        <v-card
          height="100%"
          class="hover-card">
          <v-card-text
            class="text-xs-center py-3 grey--text"
          ><div class="py-3">
            <div class="headline pt-3">Добавить</div>
            <div><v-icon color="grey">fas fa-plus fa-5x</v-icon></div>
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
        </div></v-card-text></v-card>
      </v-flex>
      <v-flex
        v-for="(item, index) in items"
        :key="index"
        tag="a"
        xs12
        sm4
        md2
        lg2
        @click="goTo(item)">
        <v-card class="hover-card">
          <div class="text-xs-center pa-1" >
            <div class="card-top-action">
              <div><v-btn icon><v-icon color="info">mdi-pen</v-icon></v-btn></div>
              <div><v-btn
                icon
                @click.stop="openQDialog(item.id)"><v-icon color="error">mdi-delete-variant</v-icon></v-btn></div>
            </div>
            <v-card-media
              :key="index+'img'"
              :src="item.default_image_id?baseUrl+item.default_image_data_brands.thumb_file_path:userData.no_image_url"
              height="125px"
              contain/>
          </div>
          <div class="text-xs-center pa-1">
            <div
              v-line-clamp="2"
              class="subheading product-name">{{ item.name }}</div>
        </div></v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./brands.js"></script>

<style scoped lang="scss">
@import '../../../assets/styles/scss/mixins.scss';
.product-name {
  height: 45px;
}
</style>
