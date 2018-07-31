<template>
  <v-card>
    <v-card-title :class="[data.titleClass ? data.titleClass : 'info white--text']">
      <div :class="[data.headlineClass ? data.headlineClass : 'headline']">{{ data.title ? data.title : "Modal header" }}</div>
      <v-spacer/>
      <v-btn
        v-if="data.isClosable"
        icon
        dark
        @click="cancel"><v-icon>clear</v-icon></v-btn>
    </v-card-title>
    <v-card-actions class="pt-1">
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Поиск"
        class="mt-0"
        single-line
        hide-details
      />
    </v-card-actions>
    <v-card-text style="height: 90vh;">
      <v-list>
        <v-layout
          row
          wrap>
          <v-flex sm6>
            <v-list-tile>
              <v-list-tile-title>Пользователи</v-list-tile-title>
              <v-list-tile-action-text>Прочитано</v-list-tile-action-text>
            </v-list-tile>
            <v-divider/>
          </v-flex>
          <v-flex
            sm6
            hidden-xs-only>
            <v-list-tile>
              <v-list-tile-title>Пользователи</v-list-tile-title>
              <v-list-tile-action-text>Прочитано</v-list-tile-action-text>
            </v-list-tile>
            <v-divider/>
          </v-flex>
        </v-layout>
        <v-data-iterator
          :items="messages"
          :search="search"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          :rows-per-page-text="rowsPerPageText"
          :no-results-text="noResultsText"
          :no-data-text="noDataText"
          content-tag="v-layout"
          row
          wrap
        >
          <v-flex
            slot="item"
            slot-scope="props"
            sm6>
            <v-list-tile>
              <v-list-tile-title v-html="props.item.name"/>
              <v-list-tile-action-text><v-icon
                :color="props.item.is_read?'success':'error'">
                {{ 'fas fa-'+(props.item.is_read?'check':'times') }}
              </v-icon></v-list-tile-action-text>
            </v-list-tile>
            <v-divider/>
          </v-flex>
        </v-data-iterator>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'DialogHeader',
  props: {'data': {
    type: Object,
    default: {}
  }},
  data () {
    return {
      search: '',
      rowsPerPageItems: [12, 18, 24, 36, 72, {text: 'Все', value: -1}],
      pagination: { rowsPerPage: 12 },
      rowsPerPageText: 'Элементов на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов'
    }
  },
  computed: {
    ...mapGetters({messages: 'messages/items'})
  },
  beforeDestroy () {
    this.$store.commit('messages/items', [])
  },
  methods: {
    cancel: function () {
      this.$emit('dialog-close', false)
    }
  }
}

</script>

<style scoped></style>
