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
    <v-card-text style="height:80vh;">
      <v-layout
        row
        wrap>
        <v-flex
          xs6
          pa-1><v-subheader>Неупорядоченные</v-subheader>
          <drop
            class="dragArea"
            @drop="handleDrop(...arguments)">
            <v-list>
              <v-divider/>
              <template v-for="(item, index) in filteredItems">
                <v-list-tile
                  :key="item.id">
                  <drag
                    :transfer-data="{ item: item, list: 1}"
                    class="drag">
                    {{ item.name }}
                  </drag>
                </v-list-tile>
                <v-divider :key="index"/>
              </template>
            </v-list>
          </drop>
        </v-flex>
        <v-flex
          xs6
          pa-1><v-subheader>Упорядоченные</v-subheader>
          <drop
            class="dragArea"
            @drop="handleSelectedDrop(...arguments)">
            <v-list>
              <v-divider/>
              <template v-for="(item, index) in selectedItems">
                <v-list-tile
                  :key="item.id">
                  <drag
                    :transfer-data="{ item: item, list: 2}"
                    class="drag">
                    {{ item.name }}
                  </drag>
                </v-list-tile>
                <v-divider :key="index"/>
              </template>
            </v-list>
          </drop>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn @click="clear">Очистить</v-btn>
      <v-btn
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
import { Drag, Drop } from 'vue-drag-drop'

export default {
  name: 'PositionsDialog',
  components: {
    'drag': Drag,
    'drop': Drop
  },
  props: {'data': {
    type: Object,
    default: {}
  }},
  data () {
    return {
      item: {},
      selectedItems: [],
      selectedIds: []
    }
  },
  computed: {
    compItem () {
      return this.$store
        .getters[((this.data.productsShown ? 'productsPositions' : 'productCategoryPositions') + '/item')]
    },
    items () {
      return this.$store
        .getters[((this.data.productsShown ? 'products' : 'productCategories') + '/items')]
    },
    filteredItems () {
      return this.items.filter(v => { return this.selectedIds.indexOf(v.id) === -1 })
    }
  },
  created () {
    this.item = _.cloneDeep(this.compItem)
    this.selectedIds = _.get(this.compItem, (this.data.productsShown ? 'products_positions' : 'child_category_positions'), [])
    this.selectedItems = this.items.filter((v) => {
      return this.selectedIds.indexOf(v.id) !== -1
    })
  },
  beforeDestroy () {
    this.$store.commit((this.data.productsShown
      ? 'productsPositions' : 'productCategoryPositions') + '/item', {})
  },
  methods: {
    submit: function () {
      this.selectedIds = this.selectedItems.map(v => { return v.id })
      this.item[(this.data.productsShown ? 'products_positions' : 'child_category_positions')] = this.selectedIds
      this.$emit('dialog-close', true, this.item, this.data.isUpdate)
    },
    cancel: function () {
      this.$emit('dialog-close', false)
    },
    clear: function () {
      this.$refs.form.reset()
    },
    handleDrop ({item, list}) {
      if (list !== 1) {
        this.selectedItems.splice(this.selectedItems.indexOf(item), 1)
        this.filteredItems.push(item)
      }
    },
    handleSelectedDrop ({item, list}, ...args) {
      if (list !== 2) {
        this.filteredItems.splice(this.filteredItems.indexOf(item), 1)
        this.selectedItems.push(item)
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.dragArea {
  height: 100%;
  border: dashed 2px #546E7A;
}
</style>
