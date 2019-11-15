<template>
    <div class="about">
        <h1>This is an about page{{user.name}}</h1>
    </div>
</template>

<script>
    import {
        user as userAPI
    } from '@/api';
    export default {
        data() {
            
            return {
                user: this.$store.state.user,
            }
        },
        async created() {
            await userAPI.shell();
        },
    }
</script>