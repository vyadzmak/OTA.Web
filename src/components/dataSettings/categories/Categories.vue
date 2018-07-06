<template>
  <v-container
    pa-2
    fluid
    grid-list-md>
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
    <v-card-actions class="pt-1">
      <v-btn
        :disabled="!!$loading"
        color="success"
        dark
        @click.stop="openDialog()">Добавить</v-btn>
      <v-breadcrumbs class="py-1">
        <v-breadcrumbs-item
          v-for="item in categoryIds"
          :key="item.id"
          @click.native="goBack(item.id)"
        >
          {{ item.name }}
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-spacer/>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Поиск"
        class="mt-0"
        single-line
        hide-details
      />
    </v-card-actions>
    <v-data-iterator
      :items="items"
      :search="search"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      :rows-per-page-text="rowsPerPageText"
      :no-results-text="noResultsText"
      :no-data-text="noDataText"
      content-tag="v-layout"
      row
      wrap
    >
      <v-flex
        slot="item"
        slot-scope="props"
        tag="a"
        xs12
        sm4
        md2
        lg2
        @click="getNext(props.item)">
        <v-card class="hover-card">
          <div class="text-xs-center pa-1">
            <div class="card-top-action">
              <div><v-btn
                icon
                @click.stop="goTo(props.item)"><v-icon color="info">mdi-pen</v-icon></v-btn></div>
              <div><v-btn
                icon
                @click.stop="openQDialog(props.item.id)"><v-icon color="error">mdi-delete-variant</v-icon></v-btn></div>
            </div>
            <v-card-media
              :src="baseUrl+(props.item.default_image_id?props.item.default_image_data.thumb_file_path:userData.no_image_url)"
              height="125px"
              contain/>
          </div>
          <div class="text-xs-center pa-1">
            <div
              v-line-clamp="2"
              class="subheading product-name"
              v-text="props.item.name"/>
            <div
              class="grey--text"
              v-text="props.item.internal_categories_count>0?
                `Категорий `+props.item.internal_categories_count:
              `Товаров `+(props.item.internal_products_count||0)"/>
        </div></v-card>
      </v-flex>
    </v-data-iterator>
  </v-container>
</template>

<script src="./categories.js"></script>

<style scoped lang="scss">
@import '../../../assets/styles/scss/mixins.scss';
.product-name {
  height: 50px;
}
</style>
