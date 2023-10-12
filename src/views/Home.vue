<template>
  <div class="home">
    <h1>HOME</h1>
    <button @click="logout(email, password)">Logout</button>
    <div v-for="user in users">
      <UserCard :user="user" />
    </div>
  </div>
</template>

<script setup>
  import customAxios from '@/functions/axios/customAxios.js';
  import deleteTokenCookie from '@/functions/cookies/deleteTokenCookie.js';
  import router from '@/router/index.js';
  import UserCard from '@/components/UserCard.vue';
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
    components: {
      UserCard,
    }
  };
</script>
