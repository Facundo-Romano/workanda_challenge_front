<template>
    <div class="userCard">
      <p>User</p>
      <p>Email: {{ user.email }}</p>
    </div>
</template>
  
<script setup>
</script>

<script>
    export default {
        props: {
            user: {
                type: Object,
                required: true,
            },
        },
    };
</script>
  