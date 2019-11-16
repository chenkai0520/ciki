<template>
    <div class="writer-topbar" @click="handlerFun('shuangping')">
        <span class="svg-wrapper" v-for="icon in icons" :key="icon" @click.native="handlerFun(icon)">
            <svg :title="icon" class="icon select-none" aria-hidden="true">
                <use :[xhref]="comXhref(icon)"></use>
            </svg>
        </span>
    </div>
</template>

<script>
    import event from '@/components/common/event/eventHub.js'
    import {
        SWITCH_SHUNGPING
    } from '@/components/common/event/eventTypes.js'
    export default {
        data() {
            return {
                xhref: 'xlink:href',
                icons: ['shuangping']
            }
        },
        methods: {
            comXhref(icon) {
                return `#icon${icon}`;
            },
            handlerFun(type) {
                console.log(`type:`, type)

                switch (type) {
                    case 'shuangping':
                        this.shuangpingFun();
                        break;
                    default:
                        break;
                }
            },
            shuangpingFun() {
                console.log(SWITCH_SHUNGPING)
                this.$bus.$emit(SWITCH_SHUNGPING);
            }
        },
    }
</script>

<style lang="scss">
    @import "@/assets/style/variable.scss";

    .writer-topbar {
        font-size: 16px;
        float: right;
        color: $gray;
        cursor: pointer;




        .svg-wrapper {
            display: inline-block;
            height: 100%;
            padding: 6px 12px;
            &:hover {
                color: $primary;
            }
        }
    }
</style>