<template>
  <v-card>
    <v-card-title class="headline pb-0">Общая информация</v-card-title>
    <v-card-text>
      <v-layout
        align-content-space-around
        row
        wrap>
        <v-flex
          lg5
          md6
          sm8
          xs12
        ><v-list>
          <v-divider/>
          <v-list-tile>
            <v-list-tile-content class="body-2">№ Заявки:</v-list-tile-content>
            <v-list-tile-content class="align-end">00000001</v-list-tile-content>
          </v-list-tile>
          <v-divider/>
          <v-list-tile>
            <v-list-tile-content class="body-2">Заказчик:</v-list-tile-content>
            <v-list-tile-content class="align-end">trololo</v-list-tile-content>
          </v-list-tile>
          <v-divider/>
          <v-list-tile>
            <v-list-tile-content class="body-2">Время:</v-list-tile-content>
            <v-list-tile-content class="align-end">trololo</v-list-tile-content>
          </v-list-tile>
          <v-divider/>
          <v-list-tile>
            <v-list-tile-content class="body-2">Адрес:</v-list-tile-content>
            <v-list-tile-content class="align-end">
              <v-select
                style="width:100%"
                solo
                hide-details
                single-line
                label="Адрес"/></v-list-tile-content>
          </v-list-tile>
          <v-divider/>
          <v-list-tile>
            <v-list-tile-content class="body-2">Контакт:</v-list-tile-content>
            <v-list-tile-content class="align-end">trololo</v-list-tile-content>
          </v-list-tile>
          <v-divider/>
          <v-list-tile>
            <v-list-tile-content class="body-2">E-mail:</v-list-tile-content>
            <v-list-tile-content class="align-end">trololo</v-list-tile-content>
          </v-list-tile>
          <v-divider/>
          <v-list-tile>
            <v-list-tile-content class="body-2">Телефон:</v-list-tile-content>
            <v-list-tile-content class="align-end">trololo</v-list-tile-content>
          </v-list-tile>
          <v-divider/>
        </v-list>
        </v-flex>
        <v-flex
          lg5
          md6
          sm8
          xs12
        >
          <v-list>
            <v-divider/>
            <v-list-tile>
              <v-list-tile-content class="body-2">Сумма:</v-list-tile-content>
              <v-list-tile-content class="align-end">00000001</v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
              <v-list-tile-content class="body-2">Скидка:</v-list-tile-content>
              <v-list-tile-content class="align-end">00000001</v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
              <v-list-tile-content class="body-2">Итого:</v-list-tile-content>
              <v-list-tile-content class="align-end">00000001</v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-list-tile>
              <v-list-tile-content class="body-2">Количество:</v-list-tile-content>
              <v-list-tile-content class="align-end">00000001</v-list-tile-content>
            </v-list-tile>
            <v-divider/>
          </v-list>
          <v-textarea
            class="px-3"
            hide-details
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
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.system_name }}</td>
          <td>{{ props.item.display_value }}</td>
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
</v-card></template>

<script src="./details.js"></script>

<style scoped></style>
