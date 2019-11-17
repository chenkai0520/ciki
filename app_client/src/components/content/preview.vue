<template>
    <div id="preview-container">
        {{markdownText}}
    </div>
</template>

<script>
    import RenderWorker from './render.worker.js';
    let renderWorker = new RenderWorker();
    renderWorker.onmessage = function (e) {
        document.getElementById('preview-container').innerHTML = e.data;
    }

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
                renderWorker.postMessage([this.markdownText]);
            }
        },
    }
</script>

<style lang="scss">
    @import "@/assets/style/variable.scss";

    #preview-container {
        padding: 5px 15px;
        border-left: 1px solid $bggray;
        overflow: scroll;

        pre {
            background-color: $bggray;
            padding: 12px;
            overflow: scroll;
        }
    }
</style>