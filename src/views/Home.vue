<template>
  <div class="home">
    <h1>HOME</h1>
    <button @click="logout(email, password)">Logout</button>
  </div>
</template>

<script setup>
  import deleteTokenCookie from '@/functions/cookies/deleteTokenCookie.js';
  import router from '@/router/index.js';
</script>

<script>
  function logout() {
    try {
      deleteTokenCookie();

      router.push('/login');
    } catch (err) {
      console.log(err);
    }
  }
</script>
