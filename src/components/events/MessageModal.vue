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
      <v-subheader>Продукт {{ data.item.product_code }}</v-subheader>
      <div>{{ data.item.product }}</div>
      <v-subheader>Дата окончания (показывать предупреждение за {{ data.item.count_days_notifications }} дней)</v-subheader>
      <div>{{ data.item.end_date | moment("DD.MM.YYYY") }}</div>
      <v-subheader>Сообщение</v-subheader>
      <div>{{ data.item.message }}</div>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        color="error"
        dark
        @click="cancel">Отмена</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'DialogHeader',
  props: {'data': {
    type: Object,
    default: {}
  }},
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    cancel () {
      this.$emit('dialog-close', false)
    }
  }
}

</script>

<style scoped></style>
