import Reviews from '@/components/product/reviews/Reviews.vue'
import Gallery from '@/components/product/gallery/Gallery.vue'
import Recommendation from '@/components/product/recommendation/Recommendation.vue'
import General from '@/components/product/general/General.vue'

const adminChildren = [
  {
    path: 'recommendation',
    name: 'product.recommendation',
    component: Recommendation
  },
  {
    path: 'reviews',
    name: 'product.reviews',
    component: Reviews
  },
  {
    path: 'gallery',
    name: 'product.gallery',
    component: Gallery
  },
  {
    path: 'general',
    name: 'product.general',
    component: General
  }
]

export default adminChildren
