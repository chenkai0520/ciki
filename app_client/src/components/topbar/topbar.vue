<template>
    <div class="topbar-container-wrapper">
        <div class="topbar-container">
            <logo class="logo-wraper"></logo>
            <div class="avatar-container" :style="{backgroundImage:`url(${user.avatar})`}" @click="clickAvatar"></div>
        </div>
    </div>
</template>
<script>
    import Logo from "@/components/logo.vue";

    export default {
        data() {
            return {}
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        methods: {
            clickAvatar() {
                console.log(this.$store.getters.isLogin);
            }
        },
        components: {
            Logo
        }
    }
</script>

<style lang="scss">
    @import "@/assets/style/variable.scss";

    .topbar-container-wrapper{
        display: flex;
        justify-content: center;
    }

    .topbar-container {

        @media screen and (min-width: $b-screen) {
            max-width: $b-screen;
        }
        
        width: 100%;
        height: 60px;
        border-bottom: 1px solid $bggray;

        .avatar-container {
            width: 40px;
            height: 40px;
            float: right;
            border-radius: 50%;
            background-repeat: round;
            margin: 10px;
            cursor: pointer;
        }

        .logo-wraper {
            margin: 8px 12px;
        }
    }
</style>