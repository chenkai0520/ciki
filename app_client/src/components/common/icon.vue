<template>
    <div class="icon-container" :style="{fontSize:size, cursor:cursor}">
        <svg class="icon" aria-hidden="true">
            <use :[xhref]="comXhref"></use>
        </svg>
    </div>
</template>
<script>
    export default {
        props: {
            value: String,
            cursor: {
                type: String,
                default: 'pointer'
            },
            size: {
                type: String,
                default: '16px'
            }
        },
        computed: {
            comXhref(){
                return `#${this.value}`;
            }
        },
        data() {
            return {
                xhref: 'xlink:href',
            }
        },
    }
</script>
<style lang="scss">
    @import "@/assets/style/variable.scss";
    .icon-container {
        display: flex;
        align-items: center;
        color: $gray;
        &:hover{
            color: $primary;
        }
        .icon {
            width: 1em;
            height: 1em;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
            user-select: none;
        }
    }
</style>