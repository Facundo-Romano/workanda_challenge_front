<template>
  <main class="main">
    <img src="/blue_circle_logo.svg" alt="logo" class="logo"/>
    <h1 class="h1">Login</h1>
    <div class="inputContainer" :class="{ inputContainerError: invalidEmail || loginError }">
      <EnvelopeIcon :error="invalidEmail || loginError ? true : false" :filled="email ? true: false"/>
      <input class="input" type="text" v-model="email" @input="handleInputChange" :class="{ error: invalidEmail || loginError }" placeholder="email" id="email"/>
    </div>
    <label class="errorLabel" v-if="invalidEmail" for="email">Invalid email</label>
    <div class="inputContainer" :class="{ inputContainerError: loginError }">
      <LockIcon :error="loginError" :filled="password ? true: false"/>
      <input class="input" type="password" v-model="password" @input="handleInputChange" :class="{ error: loginError }" placeholder="password" id="password"/>
    </div>
    <p class="errorLabel" v-if="loginError">Incorrect credentials</p>
    <button class="loginButton" @click="login(email, password)">Login</button>
    <h2 class="h2">
      or 
      <router-link class="link" to="/register">Sing Up</router-link>
    </h2>
    <LoginBackground class="background"/>
  </main>
</template>

<script setup>
  import customAxios from '@/functions/axios/customAxios.js';
  import setTokenCookie from '@/functions/cookies/setTokenCookie.js';
  import router from '@/router';
  import '@/assets/views/login.css';
  import EnvelopeIcon from '../components/icons/EnvelopeIcon.vue';
  import LockIcon from '../components/icons/LockIcon.vue';
  import LoginBackground from '../components/icons/LoginBackground.vue';
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