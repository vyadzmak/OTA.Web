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
          <td v-text="props.item.short_description"/>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script src="./brands.js"></script>

<style scoped lang="scss">
</style>
