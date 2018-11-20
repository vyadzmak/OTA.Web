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
    <v-card-title>
      <v-btn
        color="success"
        dark
        @click.stop="closeBonus()">Закрыть</v-btn>
      <v-spacer/>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Поиск"
        single-line
        hide-details
      />
    </v-card-title>
    <v-card-text style="height:90vh">
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
            <td>{{ props.item.order_id }}</td>
            <td>{{ props.item.creation_date | moment("DD.MM.YYYY HH:mm") }}</td>
            <td>{{ props.item.amount }}</td>
            <td>
              <v-tooltip top>
                <v-icon
                  slot="activator"
                  :color="props.item.state?'success':'error'">
                  {{ props.item.state?'fas fa-check':'fas fa-lock' }}</v-icon>
                <span>{{ props.item.state?'Активен':'Заблокирован' }}</span>
              </v-tooltip>
            </td>
            <td class="px-1">
              <v-tooltip top>
                <v-btn
                  slot="activator"
                  :disabled="!props.item.state"
                  icon
                  @click="updateBonus(props.item)"
                >
                  <v-icon
                    color="info">
                    edit</v-icon>
                </v-btn>
                <span>Редактировать</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
    <v-dialog
      v-model="showModal"
      scrollable
      max-width="300px"
      @close="showModal=false">
      <v-card>
        <v-card-title class="info white--text">Измените сумму бонусов</v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            class="v-card-form">
            <v-text-field
              v-model.number="modalBonus.amount"
              :rules="[(v) => (!isNaN(parseFloat(v)) && isFinite(v)) || 'Введите число']"
              label="Сумма бонусов"/>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn @click="modalBonus.amount=0">Очистить</v-btn>
          <v-btn
            :class="{ green: valid, red: !valid }"
            color="success"
            dark
            @click="editBonus">Сохранить</v-btn>
          <v-btn
            color="error"
            dark
            @click="showModal=false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  props: {data: {
    type: Object,
    default () {
      return {titleClass: 'info white--text',
        headlineClass: 'headline',
        itemId: -1
      }
    }
  }
  },
  data () {
    return {
      valid: false,
      search: '',
      headers: [
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Id заказа', align: 'left', value: 'order_id' },
        { text: 'Дата создания', align: 'left', value: 'creation_date' },
        { text: 'Сумма', align: 'left', value: 'amount' },
        { text: 'Статус', align: 'left', value: 'state' },
        { sortable: false }
      ],
      tableRowsShown: [10, 20, 50, 100, {text: 'Все', value: -1}],
      rowsPerPageText: 'Строк на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов',
      showModal: false,
      modalBonus: { amount: 0 }
    }
  },
  computed: {
    ...mapGetters({items: 'userBonuses/items'})
  },
  created () {
    this.$store.dispatch('userBonuses/userBonusesDetails', {user_id: this.data.itemId})
  },
  methods: {
    cancel () {
      this.$emit('dialog-close', false)
    },
    async closeBonus () {
      let state = await this.$http.get('closeUserBonuses', {params: {user_id: this.data.itemId}})
      if (state.status === 200) {
        this.$store.commit('showSnackbar', {text: 'Бонусы списаны', snackbar: true, context: 'success'})
        this.cancel()
      } else {
        this.$store.commit('showSnackbar', {text: 'Списание бонусов не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
      }
    },
    updateBonus (item) {
      this.showModal = true
      this.modalBonus = _.cloneDeep(item)
    },
    editBonus () {
      this.$store.dispatch('userBonuses/updateItem', {item: this.modalBonus, isUpdate: true})
      this.showModal = false
    }
  }
}
</script>

<style scoped></style>
