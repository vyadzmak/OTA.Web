<template>
  <div>
    <v-card>
      <v-card-title>
        <v-btn
          color="success"
          dark
          @click.stop="showUpdateModal({})">Добавить пользователя</v-btn>
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
        ref="usersDataTable"
        :headers="headers"
        :items="users"
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
            <td>{{ props.item.last_name }}</td>
            <td>{{ props.item.first_name }}</td>
            <td>{{ props.item.login_data.length>0 ? props.item.login_data[0].login : '' }}</td>
            <td><template v-if="props.item.login_data.length>0">{{ props.item.login_data[0].registration_date| moment("DD.MM.YYYY HH:mm") }}</template></td>
            <td><template v-if="props.item.login_data.length>0">{{ props.item.login_data[0].last_login_date| moment("DD.MM.YYYY HH:mm") }}</template></td>
            <td class="px-1">
              <v-tooltip top>
                <v-btn
                  slot="activator"
                  icon
                  @click.stop="showUpdateModal(props.item)"><v-icon color="info">mdi-pen</v-icon></v-btn>
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

<script src="./users.js"></script>

<style scoped></style>
