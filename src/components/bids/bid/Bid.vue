<template>
  <v-card>
    <v-card-title>
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
        <tr @click="goTo(props.item)">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.number }}</td>
          <td>{{ props.item.order_user_data.client_data.name }}</td>
          <td>{{ props.item.client_address_data.address }}</td>
          <td>{{ props.item.client_address_data.city_data.name }}</td>
          <td>{{ props.item.client_address_data.city_data.area_data.name }}</td>
          <td>{{ props.item.total_amount }}</td>
          <td>{{ props.item[$route.name === 'bids.inbox' ? 'creation_date'
          : $route.name === 'bids.active' ? 'processed_date' : 'execute_date'] | moment("DD.MM.YYYY HH:mm") }}</td>
          <td>{{ ldsh.get(props.item, 'order_executor_data.name', 'Нет') }}</td>
          <td>{{ props.item.order_state_data.title }}</td>
          <td><v-icon
            slot="activator"
            :color="ldsh.get(props.item, 'client_address_data.confirmed')?'success':'error'">
            {{ 'fas fa-'+(ldsh.get(props.item, 'client_address_data.confirmed')?'check':'times') }}
          </v-icon></td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script src="./bid.js"></script>

<style scoped></style>
