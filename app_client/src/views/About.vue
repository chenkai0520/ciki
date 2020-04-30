<template>
    <div class="about">
        <h1>markdown 编辑器</h1>
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
            // await userAPI.info();
        },
    }
</script>