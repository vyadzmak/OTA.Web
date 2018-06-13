import Gallery from '@/components/dataSettings/categories/category/gallery/Gallery.vue'
import General from '@/components/dataSettings/categories/category/general/General.vue'

const children = [
  {
    path: 'gallery',
    name: 'category.gallery',
    component: Gallery
  },
  {
    path: 'general',
    name: 'category.general',
    component: General
  }
]

export default children
