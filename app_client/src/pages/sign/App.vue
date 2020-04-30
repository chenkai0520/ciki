<template>
    <div id="app">
        <sign></sign>
    </div>
</template>
<script>
    import Sign from '@/components/sign/sign'

    export default {
        components: {
            Sign
        }
    }
</script>
<style lang="scss">
    #app {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        background-color: $bggray;
    }
</style>