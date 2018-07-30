<template>
    <div class="container">
        <div class="header">
            <div class="logo" :class="collapseStatus?'logo-collapse-width':'logo-width'">
                {{collapseStatus?'V': sysName}}
            </div>

            <div class="arrow" @click.prevent="collapseMenu">
                <i class="el-icon-d-arrow-left"></i>
            </div>

            <div class="userinfo">
                <div class="to-right">
                    <div class="tools">
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                <el-badge is-dot class="item">
                                    <i class="el-icon-message"></i>
                                </el-badge>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>未读消息</el-dropdown-item>
                                <el-dropdown-item>已读消息</el-dropdown-item>
                                <el-dropdown-item divided>全部</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                <el-badge is-dot class="item">
                                    <i class="el-icon-setting"></i>
                                </el-badge>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>待处理</el-dropdown-item>
                                <el-dropdown-item>错误日志</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="avatar">
                        <img :src="this.sysUserAvatar" />
                    </div>
                    <el-dropdown class="my-name">
                        <span class="el-dropdown-link">
                            {{sysUserName}}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>个人信息</el-dropdown-item>
                            <el-dropdown-item @click.native="fdLogout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <div class="main">
            <div :class="collapseStatus?'aside-collapse':'aside'">
                <el-menu :default-active="$route.path" :collapse="collapseStatus" background-color="#606266" text-color="#fff" active-text-color="#409EFF" :collapse-transition='false' :router="true">
                    <nav-item v-for="(item,index) in navList" :item='item' :navIndex='String(index)' :key="index"></nav-item>
                    <!-- <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item> -->
                </el-menu>
            </div>
            <div class="main-container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import avatar from "@/assets/admin.jpg";
import { mapActions } from "vuex";
import {constantRouterMap} from '@/router'
import navItem from '@/components/navItem'
import store from '@/vuex'
import {filterShow} from '@/utils/permission'

export default {
    data() {
        return {
            sysName: "VUEADMIN",
            sysUserName: "管理员",
            sysUserAvatar: avatar,
            collapseStatus:false,
        };
    },

    components: {
        navItem
    },

    methods: {
        ...mapActions(["logout"]),
        collapseMenu:function(){
            this.collapseStatus=!this.collapseStatus
        },
        fdLogout:function(){
            this.logout().then(()=>{
                this.$router.push('/login')
            })
        }
    },
    computed:{
        navList:function(){
            let list;
            list=filterShow(constantRouterMap,store.getters.scope)
            return list
        }
    }
};
</script>
<style scoped>
.container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
}
.container .header {
    height: 60px;
    width: 100%;
    line-height: 60px;
    background: #606266;
    color: #fff;
    display: flex;
}
.container .header .logo {
    height: 60px;
    box-sizing: border-box;
    font-size: 22px;
    padding-left: 20px;
    padding-right: 20px;
    border-color: rgba(238, 241, 146, 0.3);
    border-right-width: 1px;
    border-right-style: solid;
}
.container .header .logo-width {
    width: 240px;
}
.container .header .logo-collapse-width {
    width: 64px;
}
.container .header .arrow {
    padding: 0px 23px;
    line-height: 60px;
    cursor: pointer;
}
.container .header .userinfo {
    flex: 1;
}
.container .header .userinfo .to-right {
    padding-right: 35px;
    float: right;
    display: flex;
}
.container .header .userinfo .to-right .tools {
    display: flex;
    margin-right: 80px;
}
.container .header .userinfo .to-right .tools .el-dropdown {
    height: 40px;
    width: 40px;
    margin-right: 10px;
    font-size: 24px;
    color: #fff;
    cursor: pointer;
}
.container .header .userinfo .to-right .tools .el-dropdown .item {
    height: 30x;
    line-height: 30px;
}
.container .header .userinfo .to-right .avatar {
    height: 60px;
}
.container .header .userinfo .to-right .avatar img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 10px 0px 0px;
}
.container .header .userinfo .to-right .my-name {
    cursor: pointer;
    color: #fff;
    height: 40px;
}
.container .main {
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
}
.container .main .aside {
    height: 100%;
    width: 240px;
    background-color: #606266;
}
.container .main .aside-collapse{
    height: 100%;
    width: 64px;
    background-color: #606266;
}
.container .main .aside .el-menu{
    border-right: none;
}
.container .main .main-container{
    flex: 1;
    height: 100%;
    overflow: hidden;
}
</style>