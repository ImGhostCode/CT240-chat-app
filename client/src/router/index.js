import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from "./../stores/auth.store.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      beforeEnter: async (to, from, next) => {
        const authStore = useAuthStore()
        authStore.getUserStored()
        if (!authStore.user) next({ name: 'login' })
        next()
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/forgot-password',
      name: "forgot-password",
      component: () => import('../views/ForgotView.vue')
    }
  ]
})

export default router