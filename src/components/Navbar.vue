<template>
    <div class="navbarContainer">
        <NavbarBackground class="background"/>
        <div class="navbarSubContainer">
            <div class="navbarMainSubContainer">
                <div class="whiteLogoContainer">
                    <img src="/white_circle_logo.svg" alt="logo" class="whiteLogo"/>
                    <p class="textWhiteLogo">Circle</p>
                </div>
                <HomeIcon class="buttonIconNavbar" @click="home"/>
                <p class="buttonTextNavbar" @click="home">Home</p>
                <ProfileIcon class="buttonIconNavbar"/>
                <p class="buttonTextNavbar">Profile</p>
            </div>
            <div class="navbarSecondarySubContainer">
                <SettingsIcon class="secondaryButtonIconNavbar"/>
                <LogoutIcon class="secondaryButtonIconNavbar" @click="logout"/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import '@/assets/components/navbar.css'; 
    import router from '@/router';
    import NavbarBackground from '@/components/svgs/NavbarBackground.vue';
    import HomeIcon from '@/components/svgs/HomeIcon.vue';
    import ProfileIcon from '@/components/svgs/ProfileIcon.vue';
    import SettingsIcon from '@/components/svgs/SettingsIcon.vue';
    import LogoutIcon from '@/components/svgs/LogoutIcon.vue';
</script>

<script>
  export default {
    props: {
        logout: {
            type: Function,
            required: true,
        },
    },
    methods: {
        home() {
            router.push('/')
        }
    },
    components: {
        NavbarBackground,
        HomeIcon,
        ProfileIcon,
        SettingsIcon,
        LogoutIcon
    }
  };
</script>