<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :filter="customFilter"
    :loading="isLoading"
    :search-input.sync="search"
    hide-details
    hide-selected
    single-line
    item-text="name"
    item-value="id"
    cached-items="true"
    return-object
    label="Введите название продукта"
    @change="modelChanged"
  >
    <template slot="no-data">
      <v-list-tile>
        <v-list-tile-title>
          Ничего не найдено
        </v-list-tile-title>
      </v-list-tile>
    </template>
    <template
      slot="item"
      slot-scope="{ item, tile }"
    >
      <v-list-tile-avatar>
        <img :src="baseUrl+(item.default_image_id?item.default_image_data.thumb_file_path:userData.no_image_url)">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-text="item.name"/>
        <v-list-tile-sub-title v-text="item.product_code"/>
      </v-list-tile-content>
    </template>
  </v-autocomplete>
</template>
<script>
import {baseUrl} from '@/httpClient/index'

export default {
  data: () => ({
    isLoading: false,
    items: [],
    model: null,
    search: null,
    baseUrl: baseUrl.slice(0, -1),
    foundText: 'not found'
  }),
  watch: {
    search: _.debounce(function (val, oldVal) {
      if (val === this.foundText) { return }
      if (val && val.length < 4) {
        this.items = []
        return
      }
      // Items have already been loaded
      if ((this.items.length > 0 && oldVal.indexOf(val) !== -1) || !val) return

      this.searchData(val)
    }, 400)
  },
  methods: {
    modelChanged (item) {
      this.foundText = item.name
      this.$emit('change', item)
    },
    searchData (val) {
      this.isLoading = true
      // Lazily load input items
      this.$http.get('filterProducts', {params: {
        user_id: this.userData.id,
        filter_parameter: 10,
        filter_value: val}})
        .then(res => {
          this.items = res.data
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
    customFilter () { return true }
  }
}
</script>
