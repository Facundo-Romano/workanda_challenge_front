<template>
  <main class="homeContainer">
    <Navbar :logout="logout"/>
    <div class="homeSubContainer">
      <h1 class="homeHeader">Users</h1>
      <button @click="createUser()" class="addNewUserContainer">
        <PlusIcon class="addNewUserIcon"/>
        <p class="addNewUserText">Add new user</p>
      </button>
      <div class="userCardsContainer">
        <UserCard v-for="(user, index) in users" :user="user" :index="index" :updateUserLocally="updateUserLocally" :deleteUserLocally="deleteUserLocally" :logout="logout"/>
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
  import PlusIcon from '@/components/svgs/PlusIcon.vue';
  import getTokenCookie from '../functions/cookies/getTokenCookie';
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
      this.interval = setInterval(getTokenCookie, 5000);
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
      UserCard,
      PlusIcon
    }
  };
</script>
