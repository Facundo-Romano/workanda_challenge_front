<template>
  <main class="homeContainer">
    <Navbar :logout="logout"/>
    <div class="home">
      <h1>HOME</h1>
      <button @click="createUser()">Add new user</button>
      <div v-for="(user, index) in users">
        <UserCard :user="user" :index="index" :updateUserLocally="updateUserLocally" :deleteUserLocally="deleteUserLocally" :logout="logout"/>
      </div>
    </div>
  </main>
</template>

<script setup>
  import customAxios from '@/functions/axios/customAxios.js';
  import deleteTokenCookie from '@/functions/cookies/deleteTokenCookie.js';
  import router from '@/router/index.js';
  import Navbar from '../components/Navbar.vue';
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
      this.interval = setInterval(this.getUsers, 5000);
    },
    beforeUnmount() {
      clearInterval(this.interval);
    },
    methods: {
      async getUsers() {
        try {
          const response = await customAxios.get('/users/getAll');

          this.users = response.data.users;
        } catch (err) {
          console.log(err)
        }
      },
      updateUserLocally(index, email) {
        this.users[index].email = email;
      },
      deleteUserLocally(index) {
        this.users.splice(index, 1);
      },
      createUser() {
        router.push('/new-user');
      },
      logout() {
            deleteTokenCookie();
            router.push('/login');
      },
    },
    components: {
      Navbar,
      UserCard
    }
  };
</script>
