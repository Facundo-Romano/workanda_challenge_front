<template>
  <main class="authContainer">
    <div class="authSubContainer">
      <img src="/blue_circle_logo.svg" alt="logo" class="logo"/>
      <h1 class="authHeader">Login</h1>
      <div class="authInputContainer" :class="{ authInputContainerError: invalidEmail || loginError }">
        <EnvelopeIcon :error="invalidEmail || loginError ? true : false" :filled="email ? true: false"/>
        <input class="authInput" type="text" v-model="email" @input="handleInputChange" :class="{ authError: invalidEmail || loginError }" placeholder="email" id="email"/>
      </div>
      <label class="authErrorLabel" v-if="invalidEmail" for="email">Invalid email</label>
      <div class="authInputContainer" :class="{ authInputContainerError: loginError }">
        <LockIcon :error="loginError" :filled="password ? true: false"/>
        <input class="authInput" type="password" v-model="password" @input="handleInputChange" :class="{ authError: loginError }" placeholder="password" id="password"/>
      </div>
      <p class="authErrorLabel" v-if="loginError">Incorrect credentials</p>
      <button class="authButton" @click="login(email, password)">Login</button>
      <h2 class="authText">
        or 
        <router-link class="link" to="/register">Sign Up</router-link>
      </h2>
    </div>
    <LoginBackground class="background"/>
  </main>
</template>

<script setup>
  import customAxios from '@/functions/axios/customAxios.js';
  import setTokenCookie from '@/functions/cookies/setTokenCookie.js';
  import router from '@/router';
  import EnvelopeIcon from '@/components/svgs/EnvelopeIcon.vue';
  import LockIcon from '@/components/svgs/LockIcon.vue';
  import LoginBackground from '@/components/svgs/LoginBackground.vue';
</script>

<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        invalidEmail: false,
        loginError: false
      }
    },
    methods: {
      async login(email, password) {
        try {
          const isEmailValid = this.validateEmail(this.email);

          if (!isEmailValid) {
            this.invalidEmail = true;
            return;
          }

          const response = await customAxios.post('/auth/login', {
            email,
            password,
          });

          const token = response.data.token;

          setTokenCookie(token);

          router.push('/');
        } catch (err) {
          this.handleError(err);
        }
      },
      handleInputChange() {
        this.invalidEmail = false;
        this.loginError = false;
      },
      validateEmail(email) {
          const emailValidationRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          
          return emailValidationRegex.test(email);
      },
      handleError(err) {
        if (err.message == 'Invalid email') {
            this.invalidEmail = true;
        }

        this.loginError = true;
      }
    },
    components: {
      EnvelopeIcon,
      LockIcon,
      LoginBackground
    }
  };
</script>