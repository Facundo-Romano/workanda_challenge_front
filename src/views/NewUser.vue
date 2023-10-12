<template>
    <main>
      <h1>Create</h1>
      <input type="text" v-model="name" placeholder="name" />
      <input type="text" v-model="lastName" placeholder="last name" />
      <input type="text" v-model="email" placeholder="email" />
      <input type="text" v-model="password" placeholder="password" />
      <button @click="create(email, password)">Create</button>
    </main>
  </template>
  
  <script setup>
    import customAxios from '@/functions/axios/customAxios.js';
    import router from '@/router/index.js';
  
    const name = '';
    const lastName = '';
    const email = '';
    const password = '';
  </script>
  
  <script>
    async function create(email, password) {
      try {
        await customAxios.post('/auth/register', {
          email,
          password,
        });
  
        router.push('/');
      } catch (err) {
        console.log(err);
      }
    }
  </script>