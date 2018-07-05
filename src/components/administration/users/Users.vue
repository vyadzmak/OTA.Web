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
          <td>{{ ldsh.get(props.item, 'user_login.login') }}</td>
          <td>{{ props.item.name }}</td>
          <td>{{ ldsh.get(props.item, 'user_role_data.title') }}</td>
          <td>{{ ldsh.get(props.item, 'client_data.name') }}</td>
          <td>{{ ldsh.get(props.item, 'user_info_data.phone_number') }}</td>
          <td>
            <v-tooltip top>
              <v-icon
                slot="activator"
                :color="props.item.lock_state?'error':'success'">
                {{ props.item.lock_state?'fas fa-lock':'fas fa-check' }}</v-icon>
              <span>{{ props.item.lock_state?'Заблокирован':'Активен' }}</span>
            </v-tooltip>
          </td>
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
      scrollable
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

<script src="./users.js"></script>

<style scoped></style>
