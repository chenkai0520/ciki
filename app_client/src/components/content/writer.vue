<template>
    <div class="edit-container">
        <writer-topbar></writer-topbar>
        <el-input class="input-container" type="textarea" placeholder="请输入内容" v-model="markdownText">
        </el-input>
        <!-- <k-textarea v-model="markdownText"></k-textarea> -->
    </div>
</template>

<script>
    import WriterTopbar from "@/components/content/writer-topbar.vue";

    export default {
        data() {
            return {
                markdownText: this.$attrs.vmodel
            }
        },
        watch: {
            markdownText(val) {
                this.$emit('update:vmodel', val);
            }
        },
        components:{
            WriterTopbar
        }
    }
</script>

<style lang="scss">
    @import "@/assets/style/variable.scss";

    .edit-container {
        .input-container {
            width: 100%;
            height: calc(100% - 30px);

            textarea {
                width: 100%;
                height: 100%;
                resize: none;
                border: 0;
                background-color: $bggray;
                border-radius: 0;
            }
        }
    }
</style>