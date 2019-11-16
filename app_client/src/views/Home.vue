<template>
    <div class="content-wrapper">
        <main-content></main-content>
    </div>
</template>

<script>
    import Content from '@/components/content/content.vue'

    export default {
        name: 'home',
        components: {
            "main-content":Content
        }
    }
</script>

<style lang="scss">
    .content-wrapper{
        width: 100%;
        height: calc(100% - 60px);
    }
</style>