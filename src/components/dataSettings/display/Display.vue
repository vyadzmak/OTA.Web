<template>
  <v-tabs
    v-model="tab"
    icons-and-text
    centered
    grow
    dark
    color="primary">
    <v-tabs-slider color="warning"/>
    <v-tab
      v-for="item in tabs"
      :key="`tab-${item.id}`"
      :href="'#tab-'+item.id">
      {{ item.name }}
      <v-icon>{{ item.icon }}</v-icon>
    </v-tab>
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in tabs"
        :id="'tab-'+item.id"
        :key="`tab-item-${item.id}`">
        <component :is="item.component"/>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import General from './general/General.vue'
import Badges from './badges/Badges.vue'
import Brands from './brands/Brands.vue'
import Partners from './partners/Partners.vue'
import Recommendation from './recommendation/Recommendation.vue'
import Slider from './slider/Slider.vue'
export default {
  name: 'Display',
  data () {
    return {
      tabs: [
        {id: 1, icon: 'mdi-file-chart', name: 'Общее', component: General},
        {id: 2, icon: 'fas fa-sliders-h', name: 'Слайдер', component: Slider},
        {id: 3, icon: 'far fa-thumbs-up', name: 'Рекомендации', component: Recommendation},
        {id: 4, icon: 'fas fa-certificate', name: 'Бэджи', component: Badges},
        {id: 5, icon: 'mdi-watermark', name: 'Бренды', component: Brands},
        {id: 6, icon: 'fas fa-handshake', name: 'Партнеры', component: Partners}
      ],
      tab: 'tab-1'
    }
  },
  created () {
    this.$store.dispatch('viewSettings/routeViewSettings', {user_id: this.userData.id})
  },
  beforeDestroy () {
    this.$store.commit('viewSettings/item', {})
  }
}

</script>

<style scoped lang="scss">
</style>
