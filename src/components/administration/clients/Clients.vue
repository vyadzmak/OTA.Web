<template>
  <div>
    <v-card>
      <v-card-title>
        <v-btn
          color="success"
          dark
          @click.stop="showUpdateModal({})">Добавить клиента</v-btn>
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
        ref="companiesDataTable"
        :headers="headers"
        :items="companies"
        :search="search"
        :rows-per-page-items="tableRowsShown"
        :rows-per-page-text="rowsPerPageText"
        :no-results-text="noResultsText"
        :no-data-text="noDataText"
      >
        <template
          slot="items"
          slot-scope="props">
          <tr @click="goToUsers(props.item.id)">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.registration_number }}</td>
            <td>{{ props.item.registration_date | moment("DD.MM.YYYY HH:mm") }}</td>
            <td>{{ props.item.client_type.name }}</td>
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

<script src="./clients.js"></script>

<style scoped></style>
