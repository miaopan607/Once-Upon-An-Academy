import { createRouter, createWebHistory } from 'vue-router'
import Overview from '../views/Overview.vue'
import School from '../views/School.vue'
import Talent from '../views/Talent.vue'
import Admission from '../views/Admission.vue'
import OnlineLearning from '../views/OnlineLearning.vue'
import CourseAdmin from '../views/CourseAdmin.vue'
import Contact from '../views/Contact.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Overview },
    { path: '/school', component: School },
    { path: '/talent', component: Talent },
    { path: '/admission', component: Admission },
    { path: '/online-learning', component: OnlineLearning },
    { path: '/course-admin', component: CourseAdmin },
    { path: '/contact', component: Contact },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
