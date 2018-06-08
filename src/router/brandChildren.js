import Gallery from '@/components/dataSettings/brands/brand/gallery/Gallery.vue'
import General from '@/components/dataSettings/brands/brand/general/General.vue'

const children = [
  {
    path: 'gallery',
    name: 'brand.gallery',
    component: Gallery
  },
  {
    path: 'general',
    name: 'brand.general',
    component: General
  }
]

export default children
