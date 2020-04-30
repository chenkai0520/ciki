<template>
    <div id="preview-container">
    </div>
</template>

<script>
    import Worker from './render.worker.js';
    let renderWorker = new Worker();
    renderWorker.onmessage = function (e) {
        document.getElementById('preview-container').innerHTML = e.data;
    }

    export default {
        props: {
            markdownText: {
                type: String,
                renderTimeOut: null,
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
                renderWorker.postMessage([this.markdownText]);
            }
        },
    }
</script>

<style lang="scss">
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