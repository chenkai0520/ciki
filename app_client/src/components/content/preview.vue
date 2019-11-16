<template>
    <div id="preview-container">
        {{markdownText}}
    </div>
</template>

<script>
    import marked from 'marked'

    export default {
        props: {
            markdownText: {
                type: String,
            }
        },
        mounted() {
            this.transform(this.markdownText);
        },
        watch: {
            markdownText(val) {
                this.transform(val);
            },
        },
        methods: {
            transform(markdown) {
                if (!markdown) return;
                document.getElementById('preview-container').innerHTML = marked(this.markdownText);
            }
        },
    }
</script>

<style lang="scss">
@import "@/assets/style/variable.scss";

#preview-container{
    padding: 5px 15px;
    border-left: 1px solid $bggray;
}
</style>