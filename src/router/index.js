import { createRouter, createWebHistory } from 'vue-router'
import formDesignView from '../views/formDesignView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'formDesignView',
      component: formDesignView
    },
    {
      path: '/formBuildView',
      name: 'formBuildView',     
      component: () => import('../views/formBuildView.vue')
    }
  ]
})

export default router
