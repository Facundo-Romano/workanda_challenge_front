<template>
    <div class="userCardContainer">
        <p>User</p>
        <div v-if="edit" class="userCard">
            <input type="text" v-model="email" placeholder="email" />
            <button @click="save(index, user.id, email)">Save</button>
            <button @click="setEdit(false)">Cancel</button>
        </div>
        <div v-else class="userCard">
            <p>Id: {{ user.id }}</p>
            <p>Email: {{ user.email }}</p>
            <button @click="setEdit(true)">Edit</button>
            <button @click="deleteUser(index, user.id)">Delete</button>
        </div>
    </div>
</template>
  
<script setup>
    import customAxios from '@/functions/axios/customAxios.js';
</script>

<script>
    export default {
        data() {
            return {
                edit: false,
                email: this.user.email
            }
        },
        props: {
            user: {
                type: Object,
                required: true,
            },
            index: {
                type: Number,
                required: true,
            },
            updateUserLocally: {
                type: Function,
                required: true,
            },
            deleteUserLocally: {
                type: Function,
                required: true,
            },
            logout: {
                type: Function,
                required: true,
            },
        },
        methods: {
            setEdit(boolean) {
                this.edit = boolean;
                this.email = this.user.email
            },
            async save(index, id, email) {
                try {
                    this.updateUserLocally(index, email);

                    this.edit = false;

                    await customAxios.patch('/users/update', { 
                        id,
                        email 
                    });
                } catch (err) {
                    console.log(err);
                }
            },
            async deleteUser(index, id) {
                try {
                    this.deleteUserLocally(index);
                    const response = await customAxios.delete(`/users/delete/${id}`);

                    const isUser = response.data.isOwnUser;

                    if (isUser) {
                        this.logout();
                    }
                } catch (err) {
                    console.log(err);
                }
            },
        }
    };
</script>
  