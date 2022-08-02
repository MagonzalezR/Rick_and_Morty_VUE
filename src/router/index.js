import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Characters from '@/views/Characters.vue'
import Episodes from '@/views/Episodes.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Locations',
    name: 'Locations',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Locations.vue')
  },
  {
    path: '/Characters',
    name: 'Characters',
    component: Characters
  },
  {
    path: '/Episodes',
    name: 'Episodes',
    component: Episodes
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
