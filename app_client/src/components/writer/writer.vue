<template>
    <div class="edit-container">
        <el-input type="textarea" placeholder="请输入内容" v-model="content">
        </el-input>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                content: null
            }
        },
    }
</script>

<style lang="scss">
.edit-container{
    width: 100%;
    height: 100%;
}
</style>