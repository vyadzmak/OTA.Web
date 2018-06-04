<template>
  <div>
    <v-card>
      <v-card-title>
        <v-btn
          color="success"
          dark
          @click.stop="showUpdateModal({})">Добавить настройку</v-btn>
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
        ref="settingsDataTable"
        :headers="headers"
        :items="settings"
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
            <td>{{ props.item.Id }}</td>
            <td>{{ props.item.SettingName }}</td>
            <td>{{ props.item.SettingValue }}</td>
            <td class="px-1">
              <v-tooltip top>
                <v-btn
                  slot="activator"
                  icon
                  @click.stop="updatePressed(props.item)"><v-icon color="info">mdi-pen</v-icon></v-btn>
                <span>Редактировать</span>
              </v-tooltip>
            </td>
            <td class="px-1">
              <v-tooltip top>
                <v-btn
                  slot="activator"
                  icon
                  @click.stop="showDeleteModal(props.item.id)"><v-icon color="error">mdi-delete-variant</v-icon></v-btn>
                <span>Удалить</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script src="./settings.js"></script>

<style scoped></style>
