import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Home from '../views/Home.vue';
import NewUser from '../views/NewUser.vue';
import getTokenCookie from '../functions/cookies/getTokenCookie';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/new-user',
      name: 'new-user',
      component: NewUser
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = getTokenCookie();

  const needsAuth = to.name === 'login' || to.name === 'register' ? false : true;

  if (needsAuth && !token) {
    next({ name: 'login' });
  } else if (!needsAuth && token) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router
