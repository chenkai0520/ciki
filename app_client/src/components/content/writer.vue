<template>
    <div class="edit-container">
        <!-- topbar功能条 -->
        <div class="writer-topbar">
            <div class="topbar-left-wrapper">
                <el-input v-model="blogTitle" class="title-input-wrapper" placeholder="请输入标题" size="mini" clearable></el-input>
            </div>
            <div class="topbar-right-wrapper">
                <template v-for="(icon,index) in icons">
                    <span v-if="icon !== '|'" :key="index" class="svg-wrapper" @click="handlerFun(icon)">
                        <svg :title="icon" class="icon select-none" aria-hidden="true">
                            <use :[xhref]="comXhref(icon)"> </use>
                        </svg>
                    </span>
                    <div v-else :key="index" class="split"></div>
                </template>
                <fullscreen class="fullscreen-wrapper" :fdom="fullscreenDom"></fullscreen>
            </div>
        </div>

        <!-- 编辑器  -->
        <el-input class="input-container" type="textarea" placeholder="请输入内容" v-model="markdownText">
        </el-input>


        <!-- 帮助 -->
        <svg :style="{left: isShuangPing ? 'calc(50% - 30px)':'calc(100% - 30px)'}"
            class="icon select-none markdown-help" aria-hidden="true">
            <use :[xhref]="comXhref('bangzhu')"></use>
        </svg>
    </div>
</template>

<script>
    import event from '@/event/eventHub.js'
    import fullscreen from '@/components/common/fullscreen.vue'
    import {
        downloadText,
        toggleFullScreen
    } from '@/utils/utils.js'
    import {
        SWITCH_SHUNGPING,PUBLISH_BLOG
    } from '@/event/eventTypes.js'

    import {
        blog as blogAPI
    } from '@/api';
    export default {
        props: {
            isShuangPing: {
                type: Boolean,
                default: true
            }
        },
        data() {
            const editConfig = {
                biaogecopy: this.getTableMarkdown(3, 3),
                daimakuai: "\n```\n\n```"
            }
            return {
                fullscreenDom: null,
                editConfig: editConfig,
                markdownText: this.$attrs.vmodel,
                blogTitle: null,
                bgcolor: "#EBEEF5",
                xhref: 'xlink:href',
                icons: ['biaogecopy', 'daimakuai', '|', 'xiazai', 'lishijilu', 'shuangping', 'baocun']
            }
        },
        created() {
            this.$bus.$off(PUBLISH_BLOG);
            this.$bus.$on(PUBLISH_BLOG, (val) => {
                this.publishBlog();
            });
        },
        mounted() {
            this.$nextTick(() => {
                this.fullscreenDom = document.querySelector('.content-wrapper');
            });
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
                    case 'xiazai':
                        this.xiazaiFun();
                        break;
                    case 'biaogecopy':
                    case 'daimakuai':
                        if (type in this.editConfig) {
                            this.editMarkdownFun(this.editConfig[type]);
                        }
                        break;
                    case 'baocun':
                        this.baocunFun();
                        break;
                    default:
                        break;
                }
            },
            shuangpingFun() {
                this.$bus.$emit(SWITCH_SHUNGPING);
            },
            xiazaiFun() {
                downloadText(this.markdownText, 'markdown.md');
            },
            editMarkdownFun(val) {
                this.markdownText += val;
            },
            /**
             * {number} row 行
             * {number} column 列
             */
            getTableMarkdown(row, column) {
                let tableBase = '';
                let tableLine = '';
                let tableContent = '';

                for (let i = 0; i < column; i++) {
                    tableBase += "|      ";
                    tableLine += "| ---- "
                }
                tableBase += '|\n';
                tableLine += "|\n";

                for (let i = 0; i < row; i++) {
                    tableContent += tableBase;
                }

                return "\n" + tableBase + tableLine + tableContent;
            },
            async baocunFun() {
                if(!this.blogTitle){
                    this.$message({
                        message: '请输入标题',
                        type: 'error'
                    });
                    return;
                }
                let result = await blogAPI.create(this.markdownText, this.blogTitle, 'tag');
                console.log(result);
            },
            async publishBlog(){
                let result = await blogAPI.publish(this.markdownText, this.blogTitle, 'tag');
                console.log(result);
            }
        },
        watch: {
            markdownText(val) {
                this.$emit('update:vmodel', val);
            }
        },
        components: {
            fullscreen: fullscreen
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

        .markdown-help {
            position: absolute;
            bottom: 0px;
            right: 50%;
            font-size: 16px;
            margin: 6px;
            cursor: pointer;

            &:hover {
                color: $primary;
            }
        }

        .writer-topbar {
            font-size: 16px;
            color: $gray;
            height: 30px;
            display: flex;
            justify-content: space-between;

            .topbar-left-wrapper {
                overflow: scroll;
                .title-input-wrapper {
                    width: 140px;
                    input {
                        border: 0;
                        border-radius: 0;
                    }
                    &:hover{
                        input {
                            border-bottom: 1px solid $primary;;
                        }  
                    }
                }
            }


            .topbar-right-wrapper {
                display: flex;
                overflow: scroll;
                .split {
                    border-left: 1px solid $black;
                    margin: 4px;
                }

                .svg-wrapper {
                    display: inline-block;
                    height: 100%;
                    padding: 8px;
                    cursor: pointer;
                    svg {
                        &:hover {
                            color: $primary;
                            background-color: $bgwhite;
                        }
                    }
                }
            }
        }
    }
</style>