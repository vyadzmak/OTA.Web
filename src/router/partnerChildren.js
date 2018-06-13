import Gallery from '@/components/dataSettings/partners/partner/gallery/Gallery.vue'
import General from '@/components/dataSettings/partners/partner/general/General.vue'

const children = [
  {
    path: 'gallery',
    name: 'partner.gallery',
    component: Gallery
  },
  {
    path: 'general',
    name: 'partner.general',
    component: General
  }
]

export default children
