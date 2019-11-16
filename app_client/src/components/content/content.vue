<template>
    <div class="content-container">
        <writer :style="{width: isShuangPing ? '50%':'100%'}"  :vmodel.sync="markdownText"></writer>
        <preview v-show="isShuangPing" :style="{width:'50%'}" :markdownText="markdownText"></preview>
    </div>
</template>

<script>
    import Writer from '@/components/content/writer.vue'
    import Preview from '@/components/content/preview.vue'
    import {SWITCH_SHUNGPING} from '@/components/common/event/eventTypes.js'

    export default {
        name: 'home',
        data() {
            return {
                markdownText: "# hello world",
                isShuangPing: true
            }
        },
        created() {
            let VM = this;
            this.$bus.$on(SWITCH_SHUNGPING,(val)=>{
                console.log(`val`,val);
                this.isShuangPing = !this.isShuangPing;
            });
        },
        watch: {
            isShuangPing(val){
                console.log(`val`,val)
            }
        },
        components: {
            Writer,
            Preview,
        }
    }
</script>

<style lang="scss">
    @import "@/assets/style/variable.scss";

    .content-container{
        width: 100%;
        height: 100%;
        display: flex;
        border-left: 1px solid $bggray;
        border-right: 1px solid $bggray;
        border-bottom: 1px solid $bggray;
    }
</style>