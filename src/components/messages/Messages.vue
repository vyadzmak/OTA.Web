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
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.title.slice(0,100) }}</td>
          <td class="word-break">{{ props.item.message.slice(0,200) }}</td>
          <td>{{ props.item.creation_date | moment("DD.MM.YYYY HH:mm") }}</td>
          <td><v-icon
            :color="props.item.is_popup?'success':'error'">
            {{ 'fas fa-'+(props.item.is_popup?'check':'times') }}
          </v-icon></td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog
      v-model="dialog"
      scrollable
      fullscreen>
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
import RecieverModal from './RecieverModal'
import UpdateModal from './UpdateModal'

export default {
  name: 'ClientMessages',
  data () {
    return {
      search: '',
      headers: [
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Отправитель', align: 'left', value: 'name' },
        { text: 'Заголовок', align: 'left', value: 'title' },
        { text: 'Сообщение', align: 'left', value: 'message' },
        { text: 'Время', align: 'left', value: 'creation_date' },
        { text: 'Всплывающее', align: 'left', value: 'is_popup' }
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
    ...mapGetters({items: 'messageContents/items'})
  },
  created () {
    this.getMessages()
  },
  mounted () {
    this.$refs.dataTable.defaultPagination.descending = true
  },
  beforeDestroy () {
    this.$store.commit('messageContents/items', [])
  },
  methods: {
    async goTo (item) {
      this.dialogData = {
        title: 'Данные сообщения: ' + item.title.slice(0, 100),
        isClosable: true
      }
      this.dialogComponent = RecieverModal
      this.dialogClose = this.recieverClose
      await this.$store.dispatch('messages/messagesByMessageContent', {message_content_id: item.id, user_id: this.userData.id})
      this.dialog = true
    },
    recieverClose () {
      this.dialog = false
    },
    addDialog () {
      let item = {
        user_sender_id: this.userData.id,
        is_popup: false,
        title: '',
        message: '',
        receivers: []
      }
      this.dialogData = {
        title: 'Добавление сообщения',
        isClosable: true,
        item
      }
      this.dialogComponent = UpdateModal
      this.dialogClose = this.addDialogClose
      this.dialog = true
    },
    addDialogClose (confirmed, item) {
      if (confirmed) {
        this.$store.dispatch('messageContents/updateItem', {item, isUpdate: false})
      }
      this.dialog = false
    },
    getMessages () {
      this.$store.dispatch('messageContents/getItems')
    }
  }
}
</script>
