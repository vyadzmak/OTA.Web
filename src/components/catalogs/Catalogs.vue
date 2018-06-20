<template>
  <v-container
    pa-2
    fluid
    grid-list-md>
    <v-dialog
      v-model="dialog"
      max-width="500px"
      scrollable>
      <component
        v-if="dialog"
        :is="dialogComponent"
        :data="dialogData"
        @dialog-close="dialogClose"/>
    </v-dialog>
    <v-dialog
      v-model="qDialog"
      max-width="300px">
      <component
        v-if="qDialog"
        :is="qDialogComponent"
        :data="dialogData"
        @dialog-close="qDialogClose"/>
    </v-dialog>
    <v-breadcrumbs class="py-1">
      <v-breadcrumbs-item
        v-for="item in categoryIds"
        :key="item.id"
        @click.native="goBack(item.id)"
      >
        {{ item.name }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-layout
      row
      wrap>
      <v-flex
        v-show="productsShown"
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
            class="text-xs-center py-4 grey--text"
          ><div class="py-5">
            <div class="headline pt-3">Добавить</div>
            <div><v-icon color="grey">fas fa-plus fa-5x</v-icon></div>
          </div>
        </v-card-text></v-card>
      </v-flex>
      <v-flex
        v-for="(item, index) in items"
        v-show="!productsShown"
        :key="index+'-item'"
        tag="a"
        xs12
        sm4
        md2
        lg2
        @click="getNext(item)">
        <v-card class="hover-card">
          <div class="text-xs-center pa-2">
            <v-card-media
              :key="index+'img'"
              :src="item.default_image_id?baseUrl+item.default_image_data.thumb_file_path:userData.no_image_url"
              height="125px"
              contain/>
          </div>
          <div class="text-xs-center">
            <div
              class="subheading product-name"
              v-text="item.name"/>
            <div
              class="grey--text"
              v-text="item.internal_categories_count>0?
                `Категорий `+item.internal_categories_count:
                item.internal_products_count>0?
              `Товаров `+item.internal_products_count:'Категорий 0'"/>
        </div></v-card>
      </v-flex>
      <v-flex
        v-for="(item, index) in products"
        :key="index+'-prod'"
        tag="a"
        xs12
        sm4
        md2
        lg2
        @click="goTo(item)">
        <v-card class="hover-card">
          <div class="text-xs-center pa-1">
            <div class="card-top-action">
              <div><v-btn
                icon
                @click.stop="goTo(item)"><v-icon color="info">mdi-pen</v-icon></v-btn></div>
              <div><v-btn
                icon
                @click.stop="openQDialog(item.id)"><v-icon color="error">mdi-delete-variant</v-icon></v-btn></div>
            </div>
            <v-card-media
              :key="index+'img'"
              :src="item.default_image_id?baseUrl+item.default_image_data.thumb_file_path:userData.no_image_url"
              height="125px"
              contain/>
          </div>
          <div class="text-xs-center pa-1">
            <div
              class="subheading product-name"
              v-text="item.name"/>
            <div
              class="grey--text"
              v-text="`Артикул: `+item.product_code"/>
            <div
              class="grey--text product-description"
              v-text="item.short_description"/>
            <v-layout class="pa-1 white--text">
              <v-flex
                style="background: green"
                v-text="item.unit_value+' '+ldsh(units).filter({id: item.unit_id}).get('[0].display_value', '')"/>
              <v-flex
                style="background: purple"
                v-text="item.amount+' '+ldsh(currencies).filter({id: item.currency_id}).get('[0].display_value', '')"/>
            </v-layout>
        </div></v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./catalogs.js"></script>

<style scoped lang="scss">
@import '../../assets/styles/scss/mixins.scss';

.product-description {
  @include lineClamp(3, 60px);
}
.product-name {
  @include lineClamp(2, 50px);
}
</style>
