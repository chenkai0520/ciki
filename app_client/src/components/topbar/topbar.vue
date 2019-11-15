<template>
    <div class="topnar-container">
        <div class="avatar-container" :style="{backgroundImage:`url(${user.avatar})`}" @click="clickAvatar"></div>
    </div>
</template>
<script>
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
            clickAvatar(){
                console.log(this.$store.getters.isLogin);
            }
        },
    }
</script>

<style lang="scss">
    @import "@/assets/style/variable.scss";

    .topnar-container {
        height: 60px;
        border-bottom: 1px solid $bggray;

        .avatar-container {
            display: inline-block;
            width: 40px;
            height: 40px;
            float: right;
            border-radius: 50%;
            background-repeat: round;
            margin: 10px;
            cursor: pointer;
        }
    }
</style>