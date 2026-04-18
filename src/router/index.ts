import { createRouter, createWebHistory } from 'vue-router'
import Overview from '../views/Overview.vue'
import Faculty from '../views/Faculty.vue'
import Talent from '../views/Talent.vue'
import Research from '../views/Research.vue'
import Admission from '../views/Admission.vue'
import OnlineLearning from '../views/OnlineLearning.vue'
import Contact from '../views/Contact.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Overview },
    { path: '/faculty', component: Faculty },
    { path: '/talent', component: Talent },
    { path: '/research', component: Research },
    { path: '/admission', component: Admission },
    { path: '/online-learning', component: OnlineLearning },
    { path: '/contact', component: Contact },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
