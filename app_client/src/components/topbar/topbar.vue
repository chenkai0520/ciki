<template>
    <div class="topbar-container-wrapper">
        <div class="topbar-container">
            <div class="topbar-left-wrapper">
                <logo class="logo-wraper" @click.native="linkToHome"></logo>

                
                <div class="topbar-router-wrapper  flex-vertical-center">发现</div>
                <div v-if="isLogin" class="topbar-router-wrapper  flex-vertical-center">关注</div>
                <div v-if="isLogin" class="topbar-router-wrapper flex-vertical-center">我的主页</div>
            </div>
            <div class="topbar-right-wrapper">
                <div class="search-wrapper">
                    <el-input @keyup.enter="publishBlog" v-model="search" round placeholder="搜索文章">
                        <icon @click="publishBlog" slot="suffix" class="input-suffix-wrapper" value="icon-search" size="20px"></icon>
                    </el-input>
                </div>

                <div class="info-tip-wrapper" v-if="isLogin">
                    <el-badge :value="12" class="item">
                        <icon class="icon-wrapper" value="iconicon_notice" size="28px"></icon>
                    </el-badge>
                </div>
                <div class="topbar-write-wrapper" v-if="!isLogin">
                    <el-button type="primary" round @click="routeToLogin">登陆</el-button>
                </div>
                <div class="topbar-write-wrapper" v-if="isLogin">
                    <el-button v-if="isEditor" type="primary" round @click="publishBlog">发布</el-button>
                    <el-button v-else type="primary" round @click="routeToEditor">写文章</el-button>
                </div>
                <div v-if="isLogin" class="avatar-container" :style="{backgroundImage:`url(${user.avatar})`}"
                    @click="clickAvatar">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Logo from "@/components/common/logo.vue";
    import Icon from "@/components/common/icon.vue";
    import {
        PUBLISH_BLOG
    } from '@/event/eventTypes.js'
    export default {
        data() {
            return {
                // routeName: null
                search: null,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            isLogin(){
                return this.$store.getters.isLogin;
            },
            isEditor(){
                return this.$route.name === 'editor' || this.$route.name === 'new';
            },

        },
        methods: {
            clickAvatar() {
                console.log(this.$store.getters.isLogin);
            },
            linkToHome() {
                // window.open('/', '_self');
                if (this.$route.name === 'about') return;
                this.$router.push({
                    name: 'about'
                });
            },
            routeToEditor() {
                if(!this.isLogin){
                    this.routeToLogin();
                }
                if (this.$route.name === 'editor') return;
                this.$router.push({
                    name: 'new',
                });
            },
            routeToLogin() {
                window.open('/sign', '_self');
            },
            publishBlog(){
                this.$bus.$emit(PUBLISH_BLOG);
            }
        },
        components: {
            Logo,
            Icon
        }
    }
</script>

<style lang="scss">
    .topbar-container-wrapper {
        display: flex;
        justify-content: center;
        border-bottom: 1px solid $bggray;
    }

    .topbar-container {

        // @media screen and (min-width: $b-screen) {
        //     max-width: $b-screen;
        // }

        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        padding-right: 24px;

        >div {
            display: flex;
        }

        .avatar-container {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-repeat: round;
            margin: 10px;
            cursor: pointer;

            &::after {
                content: "";
                position: relative;
                top: 24px;
                left: 40px;
                margin: 0 12px;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 6px solid #999;
            }

            &:hover{
                &::after {
                    border-top: 6px solid $primary;
                }
            }
        }

        .logo-wraper {
            margin: 0 160px 0 12px;
            cursor: pointer;
        }

        .topbar-write-wrapper {
            padding: 10px;
        }
        .search-wrapper{
            padding: 10px;
            min-width: 160px;
            input{
                border-radius: 24px;
            }
            .input-suffix-wrapper{
                margin: 10px;
            }
        }
        .info-tip-wrapper{
            .icon-wrapper{
                padding: 0 12px;
                margin: 16px;
            }
            sup{
                top: 16px;
                right: 38px;
            }
        }

        .topbar-router-wrapper{
            padding: 0 24px;
            cursor: pointer;
            white-space: nowrap;
            &:hover{
                color: $primary;
            }
        }
    }
</style>