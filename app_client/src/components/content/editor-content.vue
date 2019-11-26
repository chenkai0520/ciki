<template>
    <div class="content-container">
        <writer :style="{width: isShuangPing ? '50%':'100%'}" :vmodel.sync="markdownText" :isShuangPing="isShuangPing"></writer>
        <preview v-show="isShuangPing" :style="{width:'50%'}" :markdownText="markdownText"></preview>
    </div>
</template>

<script>
    import Writer from '@/components/content/writer.vue'
    import Preview from '@/components/content/preview.vue'
    import {
        SWITCH_SHUNGPING
    } from '@/event/eventTypes.js'

    export default {
        name: 'editor-content',
        data() {
            let tt= this.$route.name;
            return {
                markdownText: `# hello world ${tt}`,
                isShuangPing: true
            }
        },
        created() {
            this.$bus.$off(SWITCH_SHUNGPING);
            this.$bus.$on(SWITCH_SHUNGPING, (val) => {
                this.isShuangPing = !this.isShuangPing;
            });
        },
        components: {
            Writer,
            Preview,
        }
    }
</script>

<style lang="scss">
    @import "@/assets/style/variable.scss";

    .content-container {
        width: 100%;
        height: 100%;
        display: flex;
        border-left: 1px solid $bggray;
        border-bottom: 1px solid $bggray;
        border-right: 1px solid $bggray;
    }
</style>