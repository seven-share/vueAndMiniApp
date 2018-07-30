<template>
    <el-submenu v-if="item.children && item.children.length" :index="navIndex">
        <!-- 创建菜单分组 -->
        <template slot="title">
            <i :class="item.iconCls" v-if="item.iconCls"></i>
            <span>{{item.name}}</span>
        </template>
        <!-- 递归调用自身，直到subItem不含有子节点 -->
        <nav-item v-for="(subItem,i) in item.children" :key="navIndex+'-'+i" :navIndex="navIndex+'-'+i" :item="subItem">
        </nav-item>
    </el-submenu>

    <!-- // 如果当前item不含有子节点 -->
    <el-menu-item v-else :index="item.path">
        <template slot="title">
            <span>{{item.name}}</span>
        </template>
    </el-menu-item>
</template>

<script>
export default {
    name: "navItem",
    props: ["item", "navIndex"],
    data() {
        return {};
    },

    components: {},

    methods: {}
};
</script>
<style scoped>
</style>