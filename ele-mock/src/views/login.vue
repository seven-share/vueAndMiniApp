<template>
    <div class="login-container">
        <el-form class="login-form" autoComplete="on" :model="loginForm" ref="loginForm" label-position="left">
            <h3 class="title">vue后台管理系统</h3>
            <el-form-item prop="username">
                <span class="icon-container">
                    <i class="el-icon-circle-check-outline"></i>
                </span>

                <el-input name="username" type="text" v-model="loginForm.username" placeholder="username" />
            </el-form-item>
            <el-form-item prop="password">
                <span class="icon-container">
                    <i class="el-icon-bell"></i>
                </span>
                <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" placeholder="password"></el-input>
                <span class="show-pwd" @click="showPwd">
                    <i class="el-icon-view"></i>
                </span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="loading" style="width:100%;" @click.native.prevent="handleLogin">
                    Sign in
                </el-button>
            </el-form-item>
            <div class="tips">
                <span style="margin-right:20px;">username: admin</span>
                <span> password: admin</span>
            </div>
            <div class="tips">
                <span style="margin-right:20px;">username: editor</span>
                <span> password: editor</span>
            </div>
        </el-form>
    </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
import { requestLogin } from "@/api/api";

import { mapActions } from "vuex";

export default {
    data() {
        return {
            loginForm: {
                username: "",
                password: ""
            },
            loading: false,
            pwdType: "password"
        };
    },
    methods: {
        ...mapActions(["initUser"]),
        showPwd() {
            if (this.pwdType === "password") {
                this.pwdType = "";
            } else {
                this.pwdType = "password";
            }
        },
        handleLogin() {
            if (
                this.loginForm.username.length == 0 ||
                this.loginForm.password.length < 5
            ) {
                this.$message({
                    showClose: true,
                    message: "请输入正确的用户名和密码",
                    type: "error"
                });
            } else {
                this.loading = true;
                const loginParams = {
                    username: this.loginForm.username,
                    password: this.loginForm.password
                };
                requestLogin(loginParams).then(res => {
                    this.loading = false;
                    const data=res.data;
                    if (res.status == 200) {
                        this.initUser(data);
                        this.$router.push({ path: "/table" });
                    }
                });
            }
            // this.$refs.loginForm.validate(valid => {
            //     if (valid) {
            //         this.loading = true;
            //         var loginParams = { username: this.loginForm.username, password: this.loginForm.password };
            //         requestLogin(loginParams).then(res=>{
            //             this.loading=false;
            //             const token=data.token
            //             if(res.status==200){
            //                 this.setToken(token)
            //                 this.$router.push({path:'/table'})
            //             }
            //         })
            //     } else {
            //         console.log("error submit!!");
            //         return false;
            //     }
            // });
        }
    }
};
</script>

<style>
.login-container {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    background-color: #2d3a4b;
}
.login-container .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 450px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
}
.login-container .login-form h3 {
    color: #fff;
    font-size: 24px;
    text-align: center;
}
.login-container .login-form .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}
.login-container .login-form .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
}
.login-container .login-form .icon-container {
    display: inline-block;
    box-sizing: border-box;
    padding: 6px 5px 6px 15px;
    color: #fff;
    height: 47px;
}
.login-container .login-form .el-input input {
    background: transparent;
    border: 0px;
    border-radius: 0px;
    padding: 12px 5px 12px 5px;
    color: #eee;
    height: 47px;
}
.login-container .login-form .el-input input::-webkit-input-placeholder {
    color: gray;
}
.login-container .login-form .show-pwd {
    color: #fff;
}
</style>
