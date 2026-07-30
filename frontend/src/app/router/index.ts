import { useSessionStore } from '@/entities/session/model/sessionStore';
import DashboardPage from '@/pages/dashboard/DashboardPage.vue';
import LoginPage from '@/pages/login/LoginPage.vue';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const sessionStore = useSessionStore();
  if (to.meta.requiresAuth && !sessionStore.isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && sessionStore.isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});
