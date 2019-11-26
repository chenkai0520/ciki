<template>
    <div class="content-wrapper">
        <editor-content></editor-content>
    </div>
</template>

<script>
    import EditorContent from '@/components/content/editor-content.vue'

    export default {
        name: 'editor',
        components: {
            "editor-content":EditorContent
        }
    }
</script>

<style lang="scss">
    @import "@/assets/style/variable.scss";

    .content-wrapper{
        width: 100%;
        height: calc(100% - 60px);
        background-color: $bgwhite;
    }
</style>