import { createRouter, createWebHistory } from 'vue-router'
import Services from '../pages/services.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/services',
      name: 'services',
      component: Services
    },
    {
      name: 'Things',
      path: '/',
      component: () => import('../pages/things.vue')
    },
    {
      name: 'Relationships',
      path: '/relationships',
      component: () => import('../pages/relationships.vue')
    },
     {
      name: 'Apps',
      path: '/apps',
      component: () => import('../pages/apps.vue')

     }
  ]
})

export default router
