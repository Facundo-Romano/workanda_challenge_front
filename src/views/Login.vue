<template>
  <main>
    <h1>Login</h1>
    <input type="text" v-model="email" placeholder="email" />
    <input type="text" v-model="password" placeholder="password" />
    <button @click="login(email, password)">Login</button>
    <h2>
      or 
      <router-link to="/register">Sing Up</router-link>
    </h2>
  </main>
</template>

<script setup>
  import customAxios from '@/functions/axios/customAxios.js';
  import setTokenCookie from '@/functions/cookies/setTokenCookie.js';
  import router from '@/router/index.js';

  const email = '';
  const password = '';
</script>

<script>
  async function login(email, password) {
    try {
      const response = await customAxios.post('/auth/login', {
        email,
        password,
      });

      const token = response.data.token;

      setTokenCookie(token);

      router.push('/');
    } catch (err) {
      console.log(err);
    }
  }
</script>