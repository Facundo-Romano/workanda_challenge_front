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
            <input class="userCardInput" type="text" v-model="email" @input="handleInputChange" :class="{ authError: emailInvalid || emailAlreadyInUse }" placeholder="email" />
            <label class="authErrorLabel" v-if="emailInvalid" for="email">Invalid email</label>
            <label class="authErrorLabel" v-if="emailAlreadyInUse" for="email">Email already in use</label>
            <div class="userCardButtonsContainer">
                <button class="userCardSaveButton" @click="save(index, user.id, email)">Save</button>
                <button class="userCardCancelButton" @click="cancel()">Cancel</button>
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
                email: this.user.email,
                initialEmail: this.user.email,
                emailInvalid: false,
                emailAlreadyInUse: false
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
                    const isEmailValid = this.validateEmail(email);

                    if (!isEmailValid) {
                        this.emailInvalid = true;
                        return;
                    }

                    this.updateUserLocally(index, email);
                    
                    await customAxios.patch('/users/update', { 
                        id,
                        email 
                    });

                    this.edit = false;
                } catch (err) {
                    this.handleError(err);
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
            handleError(err) {
                if (err.response?.data?.message == 'Email already in use' && this.initialEmail !== this.email) {
                    this.emailAlreadyInUse = true
                }
            },
            handleInputChange() {
                this.emailInvalid = false;
                this.emailAlreadyInUse = false;
            },
            cancel() {
                this.edit = false;
                this.emailInvalid = false;
                this.emailAlreadyInUse = false;
            },
            validateEmail(email) {
                const emailValidationRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                
                return emailValidationRegex.test(email);
            },
        },
        components: {
            PencilIcon,
            DeleteIcon
        }
    };
</script>
  