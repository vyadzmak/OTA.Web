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
    <v-card-text style="height:90vh;">
      <v-layout
        row
        wrap>
        <v-flex
          xs6
          pa-1><v-subheader>Неупорядоченные</v-subheader>
          <draggable
            v-model="filteredItems"
            :options="{group:'1s'}"
            element="v-list"
            class="dragArea"
            @start="drag=true"
            @end="drag=false">
            <list-item-with-divider
              v-for="(item,index) in filteredItems"
              :key="item.id"
              :item="item"
              :index="index+1"
              :is-first="index===0"/>
          </draggable>
        </v-flex>
        <v-flex
          xs6
          pa-1><v-subheader>Упорядоченные</v-subheader>
          <draggable
            v-model="selectedItems"
            :options="{group:'1s'}"
            element="v-list"
            class="dragArea"
            @start="drag=true"
            @end="drag=false">
            <list-item-with-divider
              v-for="(item,index) in selectedItems"
              :key="item.id"
              :item="item"
              :index="index+1"
              :is-first="index===0"
              :has-number="true"/>
          </draggable>
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
import draggable from 'vuedraggable'
import ListItemWithDivider from './ListItemWithDivider'

export default {
  name: 'PositionsDialog',
  components: { draggable, 'list-item-with-divider': ListItemWithDivider },
  props: {'data': {
    type: Object,
    default: {}
  }},
  data () {
    return {item: {},
      selectedItems: [],
      selectedIds: [],
      filteredItems: []
    }
  },
  computed: {
    compItem () {
      return this.$store
        .getters[((this.data.productsShown ? 'productsPositions' : 'productCategoryPositions') + '/item')]
    }
  },
  created () {
    this.item = _.cloneDeep(this.compItem)
    this.selectedIds = _.get(this.item, (this.data.productsShown ? 'products_positions' : 'child_category_positions'), [])
    this.data.items.forEach((v) => {
      if (this.selectedIds.indexOf(v.id) === -1) {
        this.filteredItems.push(v)
      } else {
        this.selectedItems.push(v)
      }
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
  border-radius: 1em;
}
</style>
