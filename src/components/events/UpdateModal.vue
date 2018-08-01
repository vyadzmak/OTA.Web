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
      <v-form
        ref="form"
        v-model="valid"
        class="v-card-form">
        <v-textarea
          v-model="data.item.message"
          :rules="[(v) => !!v || 'Поле должно быть заполнено',
                   (v) => (v && v.length <= 5000) || 'Не более 5000 символов']"
          label="Текст сообщения"
          required
        />
        <product-search
          class="py-2"
          @change="productChanged"/>
        <div
          v-if="tryValidate && !data.item.product_id"
          class="v-messages error--text"><div class="v-messages__wrapper"><div class="v-messages__message">Поле должно быть заполнено</div></div></div>

        <v-menu
          :close-on-content-click="false"
          v-model="datePicker"
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
            v-model="data.item.end_date"
            label="Дата окончания"
            prepend-icon="event"
            readonly
          />
          <v-date-picker
            v-model="data.item.end_date"
            no-title
            @input="datePicker = false"/>
        </v-menu>
        <v-text-field
          v-model.number="data.item.count_days_notifications"
          :rules="[(v) => (!isNaN(parseFloat(v)) && isFinite(v)) || 'Введите число']"
          label="Период, дней"/>
      </v-form>

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
import ProductSearch from '@/components/catalogs/ProductSearch'

export default {
  name: 'DialogHeader',
  components: {'product-search': ProductSearch},
  props: {'data': {
    type: Object,
    default: {}
  }},
  data () {
    return {
      valid: false,
      tryValidate: false,
      datePicker: false
    }
  },
  computed: {
  },
  methods: {
    submit: function () {
      this.tryValidate = true
      if (this.$refs.form.validate() && this.data.item.product_id) {
        this.$emit('dialog-close', true, this.data.item)
      }
    },
    cancel: function () {
      this.$emit('dialog-close', false)
    },
    clear: function () {
      this.$refs.form.reset()
    },
    productChanged (item) {
      this.data.item.product_id = item.id
    }
  }
}

</script>

<style scoped></style>
