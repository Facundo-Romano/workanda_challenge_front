<template>
    <div class="userCardContainer">
        <div class="userCardSubContainer">
            <p class="userCardHeader">User {{ index }}</p>
            <div v-if="!edit">
                <PencilIcon class="userCardIcon" @click="setEdit(true)"/>
                <DeleteIcon class="userCardIcon" @click="deleteUser(index, user.id)"/>
            </div>
        </div>
        <div v-if="edit" class="userCardSecondarySubContainer">
            <input class="userCardInput" type="text" v-model="email" placeholder="email" />
            <div class="userCardButtonsContainer">
                <button class="userCardSaveButton" @click="save(index, user.id, email)">Save</button>
                <button class="userCardCancelButton" @click="setEdit(false)">Cancel</button>
            </div>
        </div>
        <div v-else class="userCardSecondarySubContainer">
            <p class="userCardText">Id: {{ user.id }}</p>
            <p class="userCardText">Email: {{ user.email }}</p>
        </div>
    </div>
</template>
  
<script setup>
    import customAxios from '@/functions/axios/customAxios.js';
    import PencilIcon from '@/components/svgs/PencilIcon.vue';
    import DeleteIcon from '@/components/svgs/DeleteIcon.vue';
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
        },
        components: {
            PencilIcon,
            DeleteIcon
        }
    };
</script>
  