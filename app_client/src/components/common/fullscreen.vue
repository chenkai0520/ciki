<template>
    <span class="fullscreen-content">
        <span v-if="!isfullscreen" :isf="getIsfullscreen()" @click="toggleFullScreen()">
            <svg class="icon select-none markdown-fullscree" aria-hidden="true">
                <use :[xhref]="comXhref('quanping')"></use>
            </svg>
        </span>
        <span v-else @click="toggleFullScreen()">
            <svg class="icon select-none markdown-fullscree" aria-hidden="true">
                <use :[xhref]="comXhref('quitquanping')"></use>
            </svg>
        </span>
    </span>
</template>

<script>
    export default {
        props: {
            fdom: {
                type: [HTMLDivElement, HTMLHtmlElement],
                default: () => {
                    return document.documentElement
                },
            }
        },
        data() {
            return {
                xhref: 'xlink:href',
                isfullscreen: false,
            }
        },
        methods: {
            getIsfullscreen() {
                return !!document.fullscreenElement;
            },
            comXhref(icon) {
                return `#icon${icon}`;
            },
            toggleFullScreen() {
                let fulldom = this.fdom || document.documentElement;
                if (!this.getIsfullscreen()) {
                    fulldom.requestFullscreen();
                    this.isfullscreen = true;
                } else {
                    document.exitFullscreen();
                    this.isfullscreen = false;
                }
            }
        }
    }
</script>
<style lang="scss">
    @import "@/assets/style/variable.scss";

    .fullscreen-content {
        padding: 8px;
        font-size: 14px;
        cursor: pointer;
        &:hover{
            color: $primary;
        }
    }
</style>