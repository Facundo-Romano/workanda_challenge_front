<template>
    <main>
      <h1>Register</h1>
      <input type="text" v-model="email" placeholder="email" />
      <input type="text" v-model="password" placeholder="password" />
      <button @click="register(email, password)">Register</button>
      <h2>
        Already have a user? 
        <router-link to="/login">Sing In</router-link>
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
    async function register(email, password) {
      try {
        const response = await customAxios.post('/auth/register', {
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