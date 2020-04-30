<template>
    <div class="tip-wrapper">
        <div class="tip-container" v-if="tip">
            {{tip}}
        </div>
    </div>

</template>

<script>
    export default {
        props: {
            tip: String
        }
    }
</script>

<style lang="scss">
    .tip-wrapper{
        height: 24px;
        .tip-container {
            text-align: right;
            line-height: 24px;
            color: $red;
            font-size: 14px;
        }
    }

</style>