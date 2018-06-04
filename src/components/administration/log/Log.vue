<template>
  <div>
    <v-card>
      <v-card-title>
        <v-btn
          color="error"
          dark
          @click.stop="showDeleteModal({})">Очистить лог</v-btn>
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
        ref = "logDataTable"
        :headers="headers"
        :items="logs"
        :search="search"
        :rows-per-page-items="tableRowsShown"
        :rows-per-page-text="rowsPerPageText"
        :no-results-text="noResultsText"
        :no-data-text="noDataText"
      >
        <template
          slot="items"
          slot-scope="props">
          <tr>
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.date | moment("DD.MM.YYYY HH:mm:ss") }}</td>
            <td>{{ props.item.message }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script src="./log.js"></script>

<style scoped></style>
