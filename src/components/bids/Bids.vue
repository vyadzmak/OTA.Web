<template>
  <div>
    <!-- <v-card>
      <v-card-title>
        <v-select
          v-model="currentSchema"
          :items="entitySchemas"
          item-text="title"
          label="Тип"
        />
        <v-btn
          color="success"
          dark
          @click.stop="showUpdateModal()">Добавить объект</v-btn>
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
        ref = "entitiesDataTable"
        :headers="headers"
        :items="entities.items"
        :search="search"
        :rows-per-page-items="tableRowsShown"
        :rows-per-page-text="rowsPerPageText"
        :no-results-text="noResultsText"
        :no-data-text="noDataText"
      >
        <template
          slot="items"
          slot-scope="props">
          <tr @click="goToEntity(props.item.g_id)">
            <td
              v-for="h in entities.headers"
              :key="h.value">{{ _.get(props.item, h.value) }}</td>
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
                  @click.stop="showDeleteModal(props.item.g_id)"><v-icon color="error">mdi-delete-variant</v-icon></v-btn>
                <span>Удалить</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card> -->
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>Главная</v-toolbar-title>
      </v-toolbar>
      <v-container
        fluid
        grid-list-sm>
        <v-layout
          row
          wrap>
          <v-flex
            v-for="(schema, index) in entitySchemas"
            :key="index"
            class="text-xs-center"
            xs2>
            <v-btn
              :color="entitySigns[index%3].color"
              dark
              icon
              raised
              style="width:40px; height:40px;"
              @click.stop="currentSchema=schema">
              <v-icon large>{{ entitySigns[index%3].icon }}</v-icon>
            </v-btn>
            <div v-html="schema.title"/>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-title>
        <v-btn
          color="success"
          dark
          @click.stop="showUpdateModal()">Добавить объект</v-btn>
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
        ref = "entitiesDataTable"
        :headers="headers"
        :items="entities.items"
        :search="search"
        :rows-per-page-items="tableRowsShown"
        :rows-per-page-text="rowsPerPageText"
        :no-results-text="noResultsText"
        :no-data-text="noDataText"
      >
        <template
          slot="items"
          slot-scope="props">
          <tr @click="goToEntity(props.item.g_id)">
            <td
              v-for="h in entities.headers"
              :key="h.value">{{ _.get(props.item, h.value) }}</td>
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
                  @click.stop="showDeleteModal(props.item.g_id)"><v-icon color="error">mdi-delete-variant</v-icon></v-btn>
                <span>Удалить</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <!-- <v-card>
      <v-toolbar flat>
        <v-toolbar-title>Главная</v-toolbar-title>
      </v-toolbar>
      <v-list>
        <template v-for="(item, index) in entitySchemas">
          <v-divider
            v-if="index>0"
            :key="index"/>
          <v-list-tile
            :key="item.title"
            avatar>
            <v-list-tile-avatar>
              <v-icon
                :color="entitySigns[index%3].color"
                large>{{ entitySigns[index%3].icon }}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"/>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-card> -->
  </div>
</template>

<script src="./bids.js"></script>

<style scoped></style>
