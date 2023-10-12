import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import getTokenCookie from '../functions/cookies/getAllCookies';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = getTokenCookie();

  if (to.name !== 'login' && !token) {
    next({ name: 'login' });
  } else if (to.name === 'login' && token) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router
