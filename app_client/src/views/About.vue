<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
    import {
        user as userAPI
    } from '@/api';
export default {
    async created() {
        await userAPI.shell();
    },
}
</script>
