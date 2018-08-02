<template>
  <v-card>
    <v-card-title>
      <v-btn
        :disabled="!!$loading"
        color="success"
        dark
        @click.stop="openDialog()">Добавить</v-btn>
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
      ref="dataTable"
      :headers="headers"
      :items="items"
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
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.system_name }}</td>
          <td>{{ props.item.display_value }}</td>
          <td><v-icon
            v-if="props.item.is_default"
            color="success">fas fa-check</v-icon></td>
          <td class="px-1">
            <v-tooltip top>
              <v-btn
                slot="activator"
                icon
                @click.stop="openDialog(props.item)"><v-icon color="info">mdi-pen</v-icon></v-btn>
              <span>Редактировать</span>
            </v-tooltip>
          </td>
          <td class="px-1">
            <v-tooltip top>
              <v-btn
                slot="activator"
                :disabled="$deleteDisabled"
                icon
                @click.stop="openQDialog(props.item.id)"><v-icon color="error">mdi-delete-variant</v-icon></v-btn>
              <span>Удалить</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </v-data-table>
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
  </v-card>
</template>

<script src="./units.js"></script>

<style scoped></style>
