import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Recruit from '../views/Recruit.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/recruit', component: Recruit },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
