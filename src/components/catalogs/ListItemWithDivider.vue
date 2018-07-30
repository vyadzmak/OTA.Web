<template>
  <div>
    <v-divider v-if="isFirst"/>
    <v-list-tile>
      {{ hasNumber? index+'. ':'' }}{{ item.name }}
    </v-list-tile>
    <v-divider/>
  </div>
</template>
<script>
export default {
  name: 'ListItemWithDivider',
  props: {'item': {
    type: Object,
    default: {}
  },
  'index': {type: Number,
    default: 0},
  'has-number': {type: Boolean,
    default: false},
  'is-first': {type: Boolean,
    default: false}
  }
}
</script>
