<template>
  <main class="newUserContainer">
    <Navbar :logout="logout"/>
    <div class="authSubContainer">
      <img src="/blue_circle_logo.svg" alt="logo" class="logo"/>
      <h1 class="authHeader">Create new user</h1>
      <div class="authInputContainer" :class="{ authInputContainerError: invalidEmail || emailAlreadyInUse }">
        <EnvelopeIcon :error="invalidEmail || emailAlreadyInUse ? true : false" :filled="email ? true: false"/>
        <input class="authInput" type="text" v-model="email" @input="handleInputChange" :class="{ authError: invalidEmail || emailAlreadyInUse }" placeholder="email" id="email"/>
      </div>
      <label class="authErrorLabel" v-if="invalidEmail" for="email">Invalid email</label>
      <label class="authErrorLabel" v-if="emailAlreadyInUse" for="email">Email already in use</label>
      <div class="authInputContainer" :class="{ authInputContainerError: invalidPassword }">
        <LockIcon :error="invalidPassword" :filled="password ? true: false"/>
        <input class="authInput" type="password" v-model="password" @input="handleInputChange" :class="{ authError: invalidPassword }" placeholder="password" id="password"/>
      </div>
      <p class="authErrorLabel" v-if="invalidPassword">Please add a password</p>
      <button class="authButton" @click="create(email, password)">Create</button>
      <button class="goBackButton" @click="goBack()">Go back</button>
    </div>
  </main>
</template>

<script setup>
  import customAxios from '@/functions/axios/customAxios.js';
  import setTokenCookie from '@/functions/cookies/setTokenCookie.js';
  import router from '@/router/index.js';
  import EnvelopeIcon from '@/components/svgs/EnvelopeIcon.vue';
  import LockIcon from '@/components/svgs/LockIcon.vue';
  import Navbar from '@/components/Navbar.vue';
</script>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      invalidEmail: false,
      invalidPassword: false,
      emailAlreadyInUse: false
    }
  },
  methods: {
    async create(email, password) {
      try {
        const isEmailValid = this.validateEmail(this.email);

        if (!isEmailValid) {
          this.invalidEmail = true;
          return;
        }

        if (!password) {
          this.invalidPassword = true;
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
      this.invalidPassword = false;
      this.emailAlreadyInUse = false;
    },
    validateEmail(email) {
        const emailValidationRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        return emailValidationRegex.test(email);
    },
    handleError(err) {
      if (err.message == 'Invalid email') {
          this.invalidEmail = true;
      }

      if (err.response?.data?.message == 'Email already in use') {
          this.emailAlreadyInUse = true;
      }
    },
    logout() {
          deleteTokenCookie();
          router.push('/login');
    },
    goBack() {
      router.push('/');
    },
  },
  components: {
    Navbar,
    EnvelopeIcon,
    LockIcon
  }
};
</script>