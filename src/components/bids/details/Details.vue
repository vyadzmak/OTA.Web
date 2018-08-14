<template>
  <v-card>
    <div
      v-show="false"
      v-text="compUserDetails.id"/>
    <v-card-title class="headline pb-0">Общая информация<v-spacer/>
      <v-btn
        v-show="item.order_state_id===1"
        :disabled="!!$loading"
        color="primary"
        dark
        @click.stop="acceptBid()">Принять заявку</v-btn>
      <v-btn
        v-show="item.order_state_id===2"
        :disabled="!!$loading"
        color="warning"
        dark
        @click.stop="closeBid()">Закрыть заявку</v-btn>
    </v-card-title>
    <v-card-text>
      <v-layout
        align-content-space-around
        row
        wrap>
        <v-flex
          lg6
          md6
          sm8
          xs12
        ><v-list>
          <v-divider/>
          <v-list-tile>
            <v-list-tile-content class="body-2">№ Заявки:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ item.number }}</v-list-tile-content>
          </v-list-tile>
          <v-divider/>
          <v-list-tile>
            <v-list-tile-content class="body-2">Заказчик:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ ldsh.get(item, 'order_user_data.client_data.name') }}</v-list-tile-content>
          </v-list-tile>
          <v-divider/>
          <v-list-tile>
            <v-list-tile-content class="body-2">Время:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ item.creation_date | moment("DD.MM.YYYY HH:mm") }}</v-list-tile-content>
          </v-list-tile>
          <v-divider/>
          <v-list-tile>
            <v-list-tile-content class="body-2">Телефон:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ ldsh.get(compItem, 'client_address_data.phone_nubmer') }}</v-list-tile-content>
          </v-list-tile>
          <v-divider/>
          <v-list-tile>
            <v-list-tile-content
              class="body-2"
              style="display:-webkit-box">Адрес:
            </v-list-tile-content>
            <v-list-tile-content class="align-end">
              <v-select
                v-model="item.client_address_id"
                :items="clientAddresses"
                :disabled="item.order_state_id!==2"
                item-text="address"
                item-value="id"
                style="width:100%"
                solo
                hide-details
                single-line
                label="Адрес"/>
            </v-list-tile-content>
            <v-list-tile-action
              v-show="item.order_state_id===2"><v-tooltip top>
                <v-btn
                  slot="activator"
                  :disabled="!!$loading"
                  icon
                  @click.stop="updateAddress()"><v-icon color="info">mdi-pen</v-icon></v-btn>
                <span>Редактировать</span>
            </v-tooltip></v-list-tile-action>
          </v-list-tile>
          <v-divider/>
          <v-list-tile>
            <v-list-tile-content class="body-2">Город/а.е.:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ ldsh.get(compItem, 'client_address_data.city_data.name') }}</v-list-tile-content>
          </v-list-tile>
          <v-divider/>
          <v-list-tile>
            <v-list-tile-content class="body-2">Регион/область:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ ldsh.get(compItem, 'client_address_data.city_data.area_data.name') }}</v-list-tile-content>
          </v-list-tile>
          <v-divider/>
          <v-list-tile>
            <v-list-tile-content class="body-2">Подтвержден:</v-list-tile-content>
            <v-list-tile-content class="align-end">
              <v-icon
                slot="activator"
                :color="compItem.client_address_data.confirmed?'success':'error'">
                {{ 'fas fa-'+(compItem.client_address_data.confirmed?'check':'times') }}
            </v-icon></v-list-tile-content>
          </v-list-tile>
          <v-divider/>
          <v-list-tile>
            <v-list-tile-content class="body-2">Лицензия на продажу алкоголя:</v-list-tile-content>
            <v-list-tile-content class="align-end">
              <v-icon
                slot="activator"
                :color="compItem.client_address_data.tobacco_alcohol_license?'success':'error'">
                {{ 'fas fa-'+(compItem.client_address_data.tobacco_alcohol_license?'check':'times') }}
            </v-icon></v-list-tile-content>
          </v-list-tile>
          <v-divider/>
        </v-list>
        </v-flex>
        <v-flex
          lg6
          md6
          sm8
          xs12
        >
          <v-list>
            <v-divider/>
            <v-list-tile>
              <v-list-tile-content class="body-2">Сумма:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ item.amount||'0' }}</v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
              <v-list-tile-content class="body-2">Скидка:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ item.discount_amount||'0' }}</v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
              <v-list-tile-content class="body-2">Итого:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ item.total_amount||'0' }}</v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
              <v-list-tile-content class="body-2">Количество:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ items.length }}</v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
              <v-list-tile-content class="body-2">Контакт:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ ldsh.get(item, 'order_user_data.name') }}</v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
              <v-list-tile-content class="body-2">E-mail:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ ldsh.get(userDetails, 'user_info_data.email') }}</v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
              <v-list-tile-content class="body-2">Телефон:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ ldsh.get(userDetails, 'user_info_data.phone_number') }}</v-list-tile-content>
            </v-list-tile>
            <v-divider/>
          </v-list>
          <v-textarea
            class="px-3"
            hide-details
            disabled
            label="Примечание"/>
        </v-flex>
      </v-layout>
    </v-card-text>
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
          <td>{{ props.item.product_data.name }}</td>
          <td>{{ props.item.product_data.product_code }}</td>
          <td>{{ props.item.count+' '+props.item.product_data.unit_display_value
          + (props.item.alt_count? ' / '+props.item.alt_count+' '+props.item.product_data.alt_unit_display_value:'') }}</td>
          <td>{{ props.item.amount_per_item+''+props.item.product_data.currency_display_value
          + (props.item.alt_amount_per_item? ' / '+props.item.alt_amount_per_item+''+props.item.product_data.currency_display_value:'') }}</td>
          <td>{{ props.item.amount_per_item_discount+''+props.item.product_data.currency_display_value
          + (props.item.alt_amount_per_item_discount? ' / '+props.item.alt_amount_per_item_discount+''+props.item.product_data.currency_display_value:'') }}</td>
          <td>{{ props.item.total_amount+''+props.item.product_data.currency_display_value }}</td>
          <td><v-icon
            slot="activator"
            :color="props.item.product_data.is_stock_product?'success':'error'">
            {{ 'fas fa-'+(props.item.product_data.is_stock_product?'check':'times') }}
          </v-icon></td>
          <td>{{ props.item.description }}</td>
          <td>{{ props.item.product_data.partner_name }}</td>
          <td><v-icon
            slot="activator"
            :color="props.item.need_invoice?'success':'error'">
            {{ 'fas fa-'+(props.item.need_invoice?'check':'times') }}
          </v-icon></td>
          <td
            v-show="item.order_state_id===2 || item.order_state_id===3"
            class="px-1">
            <v-tooltip top>
              <v-btn
                slot="activator"
                icon
                @click.stop="openProductDialog(props.item)">
                <v-icon
                  :color="props.item.order_position_states.id===1?'success'
                  :props.item.order_position_states.id===3?'warning':'error'">mdi-eye</v-icon>
              </v-btn>
              <span>{{ props.item.order_position_states.title }}</span>
            </v-tooltip>
          </td>
          <td
            v-show="item.order_state_id===2 || item.order_state_id===3"
            class="px-1">
            <v-tooltip top>
              <v-btn
                slot="activator"
                :disabled="item.executor_id !== userData.id"
                icon
                @click.stop="openDialog(props.item)"><v-icon color="info">mdi-pen</v-icon></v-btn>
              <span>Редактировать</span>
            </v-tooltip>
          </td>
          <td
            v-show="item.order_state_id===2"
            class="px-1">
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
      max-width="500px">
      <component
        v-if="dialog"
        :is="dialogComponent"
        :data="dialogData"
        @dialog-close="dialogClose"/>
    </v-dialog>
    <v-dialog
      v-model="qDialog"
      max-width="300px">
      <component
        v-if="qDialog"
        :is="qDialogComponent"
        :data="dialogData"
        @dialog-close="qDialogClose"/>
    </v-dialog>
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
</v-card></template>

<script src="./details.js"></script>

<style scoped></style>
