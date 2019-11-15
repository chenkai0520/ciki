<template>
    <div class="sign-container base-shadow">
        <form>
            <error-tip :tip="userNameTip" />
            <el-input v-model.trim="userName" placeholder="账号" clearable></el-input>

            <error-tip :tip="userPasswordTip" />
            <el-input v-model.trim="userPassword" placeholder="密码" show-password clearable @keyup.enter.native="onEnterPassword">
            </el-input>

            <template v-if="!isLogin">
                <error-tip :tip="reUserPasswordTip" />
                <el-input v-model.trim="reUserPassword" placeholder="确认密码" show-password clearable>
                </el-input>
            </template>
        </form>

        <el-button v-if="isLogin" id="login-button" type="primary" @click="login" :disabled="isLoginDisable">登陆
        </el-button>
        <el-button v-else id="login-button" type="primary" @click="register" :disabled="isRegisterDisable">注册
        </el-button>

        <div>
            <span class="button-span float-left" @click="forgetPassword">忘记密码</span>
            <span class="button-span float-right" @click="changeType">{{isLogin ? '注册':'返回登陆'}}</span>
        </div>
    </div>
</template>

<script>
    import SHA256 from 'crypto-js/sha256';
    import ErrorTip from "@/components/common/error-tip";

    import {
        user as userAPI
    } from '@/api';
    import {
        userName as userNameReg,
        userPassword as userPasswordReg
    } from '@/utils/reg';
    import {
        setCookie
    } from "@/utils/utils";

    export default {
        data() {
            return {
                type: 'login',
                userName: localStorage.getItem('name'),
                userPassword: null,
                reUserPassword: null,
                userNameTip: null,
                userPasswordTip: null,
                reUserPasswordTip: null,
                isSavePassword: false
            }
        },
        created() {},
        watch: {
            userName(newVal) {
                if (!this.userName) {
                    this.userNameTip = '账号不能为空';
                    return;
                }
                if (!userNameReg.test(this.userName)) {
                    this.userNameTip = '至少六位数组字母下划线';
                    return;
                }

                this.userNameTip = null;
            },
            userPassword(newVal) {
                if (!this.userPassword) {
                    this.userPasswordTip = '密码不能为空';
                    return;
                }
                if (!userPasswordReg.test(this.userPassword)) {
                    this.userPasswordTip = '至少六位非空字符';
                    return;
                }
                this.userPasswordTip = null;
            },
            reUserPassword(newVal) {
                if (this.reUserPassword !== this.userPassword) {
                    this.reUserPasswordTip = '两次输入密码不一致';
                    return;
                }
                this.reUserPasswordTip = null
            }
        },
        computed: {
            isLogin() {
                return this.type === 'login';
            },
            isLoginDisable() {
                if (!this.userName || !this.userPassword) {
                    return true;
                }
                if (this.userNameTip || this.userPasswordTip) {
                    return true;
                }
                return false;
            },
            isRegisterDisable() {

                if (!this.userName || !this.userPassword || !this.reUserPassword) {
                    return true;
                }
                if (this.userNameTip || this.userPasswordTip || this.reUserPasswordTip) {
                    return true;
                }
                return false;
            },
        },
        methods: {
            changeType() {
                if (this.type === 'login') {
                    this.type = 'register';
                } else {
                    this.type = 'login';
                }
            },
            forgetPassword() {
                this.$alert('请联系QQ: 2351988538', '找回密码', {
                    confirmButtonText: '确定'
                }).catch(() => {});
            },
            async login() {
                if(this.isLoginDisable) return;

                let result = await userAPI.login(this.userName, SHA256(this.userPassword).toString());

                if (result && result.data) {

                    switch (result.data.code) {
                        case 0:
                            this.$message({
                                message: '登陆成功',
                                type: 'success'
                            });

                            localStorage.setItem('name', this.userName);

                            // 防止子域名不能设置同机子域名cookie
                            setCookie('token', result.data.data.jwt);
                            localStorage.setItem('jwt', result.data.data.jwt);

                            window.open(window.location.origin, '_self');
                            break;
                        case 501:
                            this.$message({
                                message: '用户不存在',
                                type: 'error'
                            });
                            break;
                        case 301:
                            this.$message({
                                message: '密码错误',
                                type: 'error'
                            });
                            break;
                        default:
                            break;
                    }
                    return;
                } else {
                    this.$message({
                        message: '登陆失败',
                        type: 'error'
                    });
                    return;
                }
            },
            async register() {
                let result = await userAPI.register(this.userName, SHA256(this.userPassword).toString());

                if (result && result.data) {
                    switch (result.data.code) {
                        case 0:
                            this.$message({
                                message: '注册成功',
                                type: 'success'
                            });
                            localStorage.setItem('name', this.userName);
                            break;
                        case 502:
                            this.$message({
                                message: '用户已存在',
                                type: 'error'
                            });
                            break;
                        case 700:
                            this.$message({
                                message: '参数不合法',
                                type: 'error'
                            });
                            break;
                        default:
                            break;
                    }
                } else {
                    this.$message({
                        message: '注册失败',
                        type: 'error'
                    });
                    return;
                }
            },
            onEnterPassword(){
                if(!this.isLogin) return;

                this.login();
            }
        },
        components: {
            ErrorTip,
        }
    }
</script>

<style lang="scss">
    @import "@/assets/style/variable.scss";

    .sign-container {
        width: 400px;
        position: fixed;
        top: calc(50% - 250px);
        left: calc(50% - 200px);
        padding: 100px 50px;
        background-color: $bgwhite;
        border-radius: 4px;

        #login-button {
            width: 100%;
            margin-top: 24px;
        }

        .button-span {
            display: inline-block;
            cursor: pointer;
            padding: 12px 0;
            color: $primary;
        }
    }
</style>