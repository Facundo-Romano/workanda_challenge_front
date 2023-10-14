<template>
    <main class="authContainer">
      <div class="authSubContainer">
        <img src="/blue_circle_logo.svg" alt="logo" class="logo"/>
        <h1 class="authHeader">Register</h1>
        <div class="authInputContainer" :class="{ authInputContainerError: invalidEmail || registerError }">
          <EnvelopeIcon :error="invalidEmail || registerError ? true : false" :filled="email ? true: false"/>
          <input class="authInput" type="text" v-model="email" @input="handleInputChange" :class="{ authError: invalidEmail || registerError }" placeholder="email" id="email"/>
        </div>
        <label class="authErrorLabel" v-if="invalidEmail" for="email">Invalid email</label>
        <div class="authInputContainer" :class="{ authInputContainerError: registerError }">
          <LockIcon :error="registerError" :filled="password ? true: false"/>
          <input class="authInput" type="password" v-model="password" @input="handleInputChange" :class="{ authError: registerError }" placeholder="password" id="password"/>
        </div>
        <p class="authErrorLabel" v-if="registerError">Incorrect credentials</p>
        <button class="authButton" @click="register(email, password)">Register</button>
        <h2 class="authText">
          Already have an user? 
          <router-link class="link" to="/login">Sign In</router-link>
        </h2>
      </div>
      <RegisterBackground class="background"/>
    </main>
  </template>
  
  <script setup>
    import customAxios from '@/functions/axios/customAxios.js';
    import setTokenCookie from '@/functions/cookies/setTokenCookie.js';
    import router from '@/router/index.js';
    import EnvelopeIcon from '@/components/svgs/EnvelopeIcon.vue';
    import LockIcon from '@/components/svgs/LockIcon.vue';
    import RegisterBackground from '@/components/svgs/RegisterBackground.vue';
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
    },
    metaInfo: {
      title: 'Circle - Register',
      meta: [
        {
          name: 'description',
          content: 'Register for an account on Circle and get started with our platform.',
        },
      ],
    },
  };
</script>