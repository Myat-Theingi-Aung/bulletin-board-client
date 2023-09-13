import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFoundView.vue'
import UserListView from '../views/user/ListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/users',
      name: 'users',
      component: UserListView
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound,
    }
  ]
})

export default router
