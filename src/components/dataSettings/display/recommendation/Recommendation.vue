<template>
  <v-card>
    <div v-show="false">{{ compItem.id }}</div>
    <v-card-title>
      <v-btn
        :disabled="!!$loading"
        dark
        color="success"
        @click="updateItem()"
      >Обновить</v-btn>
      <v-spacer/>
      <v-checkbox
        v-model="showRecommended"
        label="Отображать рекомендованные"/>
      <v-spacer/>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Поиск"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      v-model="selectedItems"
      :headers="headers"
      :items="items"
      :search="search"
      :rows-per-page-items="tableRowsShown"
      :rows-per-page-text="rowsPerPageText"
      :no-results-text="noResultsText"
      :no-data-text="noDataText"
      item-key="id"
    >
      <template
        slot="items"
        slot-scope="props">
        <tr>
          <td>
            <v-checkbox
              v-model="props.selected"
              primary
              hide-details
            />
          </td>
          <td v-text="props.item.id"/>
          <td v-text="props.item.name"/>
          <td v-text="props.item.product_code"/>
          <td class="px-1">
            <v-tooltip top>
              <v-btn
                slot="activator"
                icon
                @click.stop="openProductDialog(props.item)"><v-icon color="warning">mdi-eye</v-icon></v-btn>
              <span>Просмотр</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog
      v-model="productDialog"
      scrollable
      max-width="500px">
      <component
        v-if="productDialog"
        :is="productDialogComponent"
        :data="dialogData"
        @dialog-close="productDialogClose"/>
    </v-dialog>
  </v-card>
</template>

<script src="./recommendation.js"></script>

<style scoped></style>
