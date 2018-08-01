<template>
  <v-card>
    <v-card-title>
      <v-btn
        :disabled="!!$loading"
        color="success"
        dark
        @click.stop="addDialog()">Добавить</v-btn>
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
          <td><v-icon
            :color="props.item.type">
            {{ 'fas fa-'+(props.item.type==='success'?'check':props.item.type==='warning'?'exclamation':'times') }}
          </v-icon></td>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.product.slice(0,100) }}</td>
          <td class="word-break">{{ props.item.message.slice(0,200) }}</td>
          <td>{{ props.item.end_date | moment("DD.MM.YYYY") }}</td>
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
  </v-card>
</template>

<script>
import {mapGetters} from 'vuex'
import MessageModal from './MessageModal'
import UpdateModal from './UpdateModal'
import QuestionDialog from '@/components/questionDialog/QuestionDialog.vue'

export default {
  name: 'ClientMessages',
  data () {
    return {
      search: '',
      headers: [
        { sortable: false },
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Отправитель', align: 'left', value: 'name' },
        { text: 'Продукт', align: 'left', value: 'product' },
        { text: 'Сообщение', align: 'left', value: 'message' },
        { text: 'Время окончания', align: 'left', value: 'creation_date' },
        { sortable: false }
      ],
      tableRowsShown: [10, 20, 50, 100, {text: 'Все', value: -1}],
      rowsPerPageText: 'Строк на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов',
      dialog: false,
      dialogData: {},
      dialogComponent: null,
      dialogClose: null
    }
  },
  computed: {
    ...mapGetters({items: 'events/items'})
  },
  created () {
    this.getEvents()
  },
  mounted () {
    this.$refs.dataTable.defaultPagination.descending = true
  },
  beforeDestroy () {
    let eventsCount = 0
    this.items.forEach(v => {
      if (v.type !== 'success') {
        eventsCount++
      }
    })
    this.$store.commit('updateByPath', {path: 'loginUser.userData.events', value: eventsCount})
    this.$store.commit('events/items', [])
  },
  methods: {
    async goTo (item) {
      this.dialogData = {
        title: 'Данные события',
        item,
        isClosable: true
      }
      this.dialogComponent = MessageModal
      this.dialogClose = this.messageClose
      this.dialog = true
    },
    messageClose () {
      this.dialog = false
    },
    addDialog () {
      let item = {
        user_creator_id: this.userData.id,
        product_id: null,
        count_days_notifications: 0,
        state: true,
        end_date: null,
        message: ''
      }
      this.dialogData = {
        title: 'Добавление события',
        isClosable: true,
        item
      }
      this.dialogComponent = UpdateModal
      this.dialogClose = this.addDialogClose
      this.dialog = true
    },
    addDialogClose (confirmed, item) {
      if (confirmed) {
        this.$store.dispatch('events/updateItem', {item, isUpdate: false})
      }
      this.dialog = false
    },
    openQDialog (id) {
      this.dialogData = {
        message: 'Вы действительно хотите удалить событие?',
        title: 'Удаление',
        isClosable: true,
        data: id
      }
      this.dialogComponent = QuestionDialog
      this.dialogClose = this.questionClose
      this.dialog = true
    },
    questionClose (confirmed, data) {
      if (confirmed) {
        this.$store.dispatch('events/deleteItem', data)
      }
      this.dialog = false
    },
    getEvents () {
      this.$store.dispatch('events/getItems')
    }
  }
}
</script>
