<template>
    <div class="writer-topbar">
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
                icons: ['lishijilu', 'shuangping', 'bangzhu', 'baocun']
            }
        },
        methods: {
            comXhref(icon) {
                return `#icon${icon}`;
            },
            handlerFun(type) {
                switch (type) {
                    case 'shuangping':
                        this.shuangpingFun();
                        break;
                    default:
                        break;
                }
            },
            shuangpingFun() {
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
        height: 30px;



        .svg-wrapper {
            display: inline-block;
            height: 100%;
            padding: 8px;

            &:hover {
                color: $primary;
                background-color: $bgwhite;
            }
        }
    }
</style>