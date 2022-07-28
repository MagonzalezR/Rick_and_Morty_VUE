import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Otros from '@/views/Characters.vue'
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
    component: Otros
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
