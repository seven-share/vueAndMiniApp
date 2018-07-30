<template>
    <div class="table-page" ref="tablePage">
        <div class="toolbar">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="handle-table">
            <el-table :data="users" size='mini' highlight-current-row @selection-change="selChange" style="width: 100%;">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="id" label="编号" width="100" sortable>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
                </el-table-column>
                <el-table-column prop="age" label="年龄" width="100" sortable>
                </el-table-column>
                <el-table-column prop="birth" label="生日" width="120">
                </el-table-column>
                <el-table-column prop="addr" label="地址" min-width="180">
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="toolbar">
            <el-button class="del-btn" type="danger" @click="batchRemove" :disabled="this.sel.length===0">批量删除</el-button>
            <el-pagination class="pagination" background layout="prev, pager, next" :total="total" :page-size="20" @current-change="handleCurrentChange">
            </el-pagination>
        </div>

        <div class="editPage">
            <el-dialog :title="showTitle" :visible.sync="editFormVisible" :close-on-click-modal="false">
                <el-form :model="editForm" label-width="80px" ref="editForm">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="editForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="editForm.sex">
                            <el-radio class="radio" :label="1">男</el-radio>
                            <el-radio class="radio" :label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
                    </el-form-item>
                    <el-form-item label="生日">
                        <!-- <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker> -->
                        <el-date-picker v-model="editForm.birth" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input type="textarea" v-model="editForm.addr"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="editFormVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="editSubmit">提交</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {
    getUserByPage,
    removeUser,
    editUser,
    batchRemoveUser,
    addUser
} from "@/api/api";
import { formatDate } from "@/utils/dateFormat";
export default {
    data() {
        return {
            filters: {
                name: ""
            },
            page: 1,
            users: [],
            sel: [],
            total: 100,
            showTitle: "",
            editFormVisible: false,
            editForm: {}
        };
    },

    components: {},

    methods: {
        getUsers: function() {
            getUserByPage(this.page).then(res => {
                this.users = res.data.users;
            });
        },
        handleAdd: function() {
            this.showTitle = "添加";
            this.editFormVisible = true;
        },
        selChange: function(val) {
            this.sel = val;
        },
        formatSex: function(row, column) {
            return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
        },
        handleEdit: function(index, row) {
            this.showTitle = "编辑";
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
            this.editForm.birth = new Date(this.editForm.birth);
        },
        editSubmit: function() {
            if (this.showTitle === "编辑") {
                this.$confirm("确认提交吗？", "提示", {}).then(() => {
                    let para = Object.assign({}, this.editForm);
                    para.birth =
                        !para.birth || para.birth == ""
                            ? ""
                            : formatDate(para.birth);
                    editUser(para).then(res => {
                        this.$message({
                            message: "提交成功",
                            type: "success"
                        });

                        this.editFormVisible = false;
                        this.editForm = {};
                        this.getUsers();
                    });
                });
            }
            if (this.showTitle === "添加") {
                this.$confirm("确认提交吗？", "提示", {}).then(() => {
                    let para = Object.assign({}, this.editForm);
                    para.birth =
                        !para.birth || para.birth == ""
                            ? ""
                            : formatDate(para.birth);
                    addUser(para).then(res => {
                        this.$message({
                            message: "提交成功",
                            type: "success"
                        });

                        this.editFormVisible = false;
                        this.editForm = {};
                        this.getUsers();
                    });
                });
            }
        },
        handleDel: function(index, row) {
            this.$confirm("确认删除该记录吗?", "提示", {
                type: "warning"
            })
                .then(() => {
                    let uid = row.id;
                    removeUser(uid).then(res => {
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                        this.getUsers();
                    });
                })
                .catch(() => {});
        },
        batchRemove: function() {
            var ids = this.sel.map(item => item.id);
            this.$confirm("确认删除选中记录吗？", "提示", {
                type: "warning"
            })
                .then(() => {
                    batchRemoveUser(ids).then(res => {
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                        this.getUsers();
                    });
                })
                .catch(() => {});
        },
        handleCurrentChange: function(currentPage) {
            this.page = currentPage;
            getUserByPage(this.page).then(res => {
                this.users = res.data.users;
                this.$refs.tablePage.scrollTo(0, 0);
            });
        }
    },
    mounted: function() {
        this.getUsers();
    },
    computed: {}
};
</script>
<style scoped>
.table-page {
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
}
.toolbar {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    background-color: #eaeaea;
    padding-top: 5px;
}
.toolbar .el-form {
    box-sizing: border-box;
    /* padding-top: 5px; */
    margin-left: 60px;
    height: 50px;
}
.del-btn {
    margin-left: 60px;
}
.pagination {
    float: right;
    margin-right: 60px;
}
</style>