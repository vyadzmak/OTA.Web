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
    <v-card-text style="height: 100%;">
      <v-layout
        row
        wrap>
        <v-flex xs5>
          <v-form
            ref="form"
            v-model="valid"
            class="v-card-form">
            <v-text-field
              v-model="data.item.title"
              :rules="[(v) => (!v || v.length <= 500) || 'Не более 500 символов']"
              label="Заголовок"
            />
            <v-textarea
              v-model="data.item.message"
              :rules="[(v) => !!v || 'Имя параметра должно быть заполнено',
                       (v) => (v && v.length <= 5000) || 'Не более 5000 символов']"
              label="Текст сообщения"
              required
            />
            <v-checkbox
              v-model="data.item.is_popup"
              label="Всплывающее сообщение"/>
            <v-checkbox
              v-model="data.item.send_all"
              label="Послать всем"/>
            <v-select
              v-model="client"
              :items="clients"
              :disabled="data.item.send_all"
              item-value="id"
              item-text="name"
              return-object
              label="Клиент"
              @change="getUsers()"
            />
            <v-select
              v-model="selectedUsers"
              :items="users"
              :disabled="!client || data.item.send_all"
              multiple
              item-value="id"
              item-text="name"
              return-object
              label="Пользователи"
            />
          </v-form>
        </v-flex>
        <v-flex xs7>
          <v-subheader>Получатели</v-subheader>
          <v-list><template v-for="(item, index) in data.item.receivers">
            <v-divider
              v-if="index===0"
              :key="index+'div-up'"/>
            <v-list-tile
              :key="item.id">
              <v-list-tile-content>{{ item.name+', '+item.company_name }}</v-list-tile-content>
              <v-list-tile-action>
                <v-btn
                  icon
                  @click.stop="data.item.receivers.splice(index,1)">
                  <v-icon color="error">mdi-delete-variant</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider :key="index+'div'"/>
          </template>
          </v-list>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        @click="clear">Очистить</v-btn>
      <v-btn
        :class="{ green: valid, red: !valid }"
        color="success"
        dark
        @click="submit">Сохранить</v-btn>
      <v-btn
        color="error"
        dark
        @click="cancel">Отмена</v-btn>
    </v-card-actions>
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
      valid: false,
      client: null,
      selectedUsers: [],
      currentCompanyName: ''
    }
  },
  computed: {
    ...mapGetters({clients: 'clients/items', users: 'crudUsers/items'})
  },
  created () {
    this.$store.dispatch('clients/getItems')
  },
  beforeDestroy () {
    this.$store.commit('clients/items', [])
    this.$store.commit('crudUsers/items', [])
  },
  methods: {
    submit: function () {
      if (this.$refs.form.validate()) {
        let receiversObj = {}
        this.selectedUsers.forEach(v => {
          receiversObj[v.id] = v.id
        })
        this.data.item.receivers.forEach(v => {
          receiversObj[v.id] = v.id
        })
        this.data.item.receivers = Object.values(receiversObj)
        this.$emit('dialog-close', true, this.data.item)
      }
    },
    cancel: function () {
      this.$emit('dialog-close', false)
    },
    clear: function () {
      this.$refs.form.reset()
    },
    getUsers () {
      let receiversObj = {}
      this.selectedUsers.forEach(v => {
        receiversObj[v.id] = {id: v.id, name: v.name, company_name: this.currentCompanyName}
      })
      this.data.item.receivers.forEach(v => {
        receiversObj[v.id] = v
      })
      this.data.item.receivers = Object.values(receiversObj)

      this.selectedUsers = []
      this.currentCompanyName = this.client.name
      this.$store.dispatch('crudUsers/usersByClient', {user_id: this.userData.id, client_id: this.client.id})
    }
  }
}

</script>

<style scoped></style>
