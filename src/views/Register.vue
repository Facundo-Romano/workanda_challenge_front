<template>
    <main class="main">
      <img src="/blue_circle_logo.svg" alt="logo" class="logo"/>
      <h1 class="h1">Register</h1>
      <div class="inputContainer" :class="{ inputContainerError: invalidEmail || registerError }">
        <EnvelopeIcon :error="invalidEmail || registerError ? true : false" :filled="email ? true: false"/>
        <input class="input" type="text" v-model="email" @input="handleInputChange" :class="{ error: invalidEmail || registerError }" placeholder="email" id="email"/>
      </div>
      <label class="errorLabel" v-if="invalidEmail" for="email">Invalid email</label>
      <div class="inputContainer" :class="{ inputContainerError: registerError }">
        <LockIcon :error="registerError" :filled="password ? true: false"/>
        <input class="input" type="password" v-model="password" @input="handleInputChange" :class="{ error: registerError }" placeholder="password" id="password"/>
      </div>
      <p class="errorLabel" v-if="registerError">Incorrect credentials</p>
      <button class="loginButton" @click="register(email, password)">Register</button>
      <h2 class="h2">
        Already have an user 
        <router-link class="link" to="/login">Sing In</router-link>
      </h2>
      <RegisterBackground class="background"/>
    </main>
  </template>
  
  <script setup>
    import customAxios from '@/functions/axios/customAxios.js';
    import setTokenCookie from '@/functions/cookies/setTokenCookie.js';
    import router from '@/router/index.js';
    import '@/assets/views/loginAndRegister.css';
    import EnvelopeIcon from '@/components/icons/EnvelopeIcon.vue';
    import LockIcon from '@/components/icons/LockIcon.vue';
    import RegisterBackground from '@/components/icons/RegisterBackground.vue';
  </script>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        invalidEmail: false,
        registerError: false
      }
    },
    methods: {
      async register(email, password) {
        try {
          const isEmailValid = this.validateEmail(this.email);

          if (!isEmailValid) {
            this.invalidEmail = true;
            return;
          }

          const response = await customAxios.post('/auth/register', {
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
        this.registerError = false;
      },
      validateEmail(email) {
          const emailValidationRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          
          return emailValidationRegex.test(email);
      },
      handleError(err) {
        if (err.message == 'Invalid email') {
            this.invalidEmail = true;
        }

        this.registerError = true;
      }
    },
    components: {
      EnvelopeIcon,
      LockIcon,
      RegisterBackground
    }
  };
</script>