<template>
  <v-card>
    <v-card-title>
      <v-btn
        v-show="selected.length>0"
        :disabled="!!$loading"
        color="success"
        dark
        @click.stop="exportOrders()"
      >Экспорт</v-btn>
      <v-spacer />
      <v-btn
        :disabled="!!$loading"
        color="warning"
        dark
        @click.stop="dialog=true"
      >Экспорт по дате</v-btn>
      <v-spacer />
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
      v-model="selected"
      item-key="id"
      class="word-wrap"
    >
      <template
        slot="items"
        slot-scope="props"
      >
        <tr @click="goTo(props.item, $event)">
          <td v-if="currentStateFilter===3">
            <v-checkbox
              v-model="props.selected"
              primary
              hide-details
            />
          </td>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.number }}</td>
          <td>{{ props.item.order_user_data.client_data.name }}</td>
          <td>{{ props.item.client_address_data.address }}</td>
          <td>{{ props.item.client_address_data.city_data.name }}</td>
          <td>{{ props.item.client_address_data.city_data.area_data.name }}</td>
          <td>{{ props.item.total_amount }}</td>
          <td>{{ props.item[$route.name === 'bids.inbox' ? 'creation_date'
          : $route.name === 'bids.active' ? 'processed_date' : 'execute_date'] | moment("DD.MM.YYYY HH:mm") }}</td>
          <td v-if="$route.name === 'bids.history'">{{ props.item.client_address_data.code }}</td>
          <td v-if="currentStateFilter !== 1">{{ ldsh.get(props.item, 'order_executor_data.name', 'Нет') }}</td>
          <td>{{ props.item.order_state_data.title }}</td>
          <td>
            <v-icon
              slot="activator"
              :color="ldsh.get(props.item, 'client_address_data.confirmed')?'success':'error'"
            >
              {{ 'fas fa-'+(ldsh.get(props.item, 'client_address_data.confirmed')?'check':'times') }}
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog
      v-model="dialog"
      max-width="350"
      @close="dialog=false"
    >
      <v-card>
        <v-card-title class="info white--text">
          <div class="headline">Данные экспорта по дате</div>
        </v-card-title>

        <v-card-text>
          <v-form
            ref="form"
            v-model="exportFormValid"
            class="v-card-form"
          >
            <v-menu
              :close-on-content-click="false"
              v-model="datePickerFrom"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="dateFrom"
                :rules="[(v) => (v.length>0) || 'Выберите дату']"
                label="Дата начала"
                prepend-icon="event"
                readonly
              />
              <v-date-picker
                v-model="dateFrom"
                no-title
                @input="datePickerFrom = false"
              />
            </v-menu>
            <v-menu
              :close-on-content-click="false"
              v-model="datePickerTo"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="dateTo"
                :rules="[(v) => (v.length>0) || 'Выберите дату', (v)=>(v > dateFrom) || 'Дата окончания меньше даты начала']"
                label="Дата окончания"
                prepend-icon="event"
                readonly
              />
              <v-date-picker
                v-model="dateTo"
                no-title
                @input="datePickerTo = false"
              />
            </v-menu>
            <v-checkbox
              v-model="orderStateIds"
              :rules="[(v)=>(v.length>0)||'']"
              primary
              hide-details
              label="Входящие"
              value="1"
            />
            <v-checkbox
              v-model="orderStateIds"
              :rules="[(v)=>(v.length>0)||'']"
              primary
              hide-details
              label="В обработке"
              value="2"
            />
            <v-checkbox
              v-model="orderStateIds"
              :rules="[(v)=>(v.length>0)||'']"
              primary
              hide-details
              label="История"
              value="3"
            />
            <v-checkbox
              v-model="orderStateIds"
              :rules="[(v)=>(v.length>0)||'Выберите состояние заказа']"
              primary
              label="Отмененные"
              value="4"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="clearForm()">Очистить</v-btn>
          <v-btn
            :class="{ green: exportFormValid, red: !exportFormValid }"
            color="success"
            dark
            @click="exportDateOrders()"
          >Экспорт</v-btn>
          <v-btn
            color="error"
            dark
            @click="dialog=false"
          >Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script src="./bid.js"></script>

<style scoped></style>
