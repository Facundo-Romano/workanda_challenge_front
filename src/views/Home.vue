<template>
  <div class="home">
    <h1>HOME</h1>
    <button @click="logout(email, password)">Logout</button>
    <li v-for="user in users">
      {{ user.email }}
    </li>
  </div>
</template>

<script setup>
  import customAxios from '@/functions/axios/customAxios.js';
  import deleteTokenCookie from '@/functions/cookies/deleteTokenCookie.js';
  import router from '@/router/index.js';
</script>

<script>
  export default {
    data() {
      return {
        users: []
      }
    },
    mounted() {
      this.getUsers();
    },
    methods: {
      logout() {
        deleteTokenCookie();
        router.push('/login');
      },
      async getUsers() {
        try {
          const response = await customAxios.get('/users/getAll');

          this.users = response.data.users;
        } catch (err) {
          console.log(err)
        }
      }
    },
  };
</script>
