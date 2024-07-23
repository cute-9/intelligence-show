<!--
 * @desc: 
 * @Author: Huang Qian
 * @Date: 2024-05-20 17:50:21
-->
<template>
  <div class="task-management">
    <div class="right-header">
      <el-button
        type="primary"
        size="medium"
        class="left-btn"
        @click="add('add')"
        >新增用户</el-button
      >
      <div class="right-search">
        <div class="search">
          <el-input
            placeholder="请输入用户名"
            v-model="searchUserName"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="btnSearch"
            ></el-button>
          </el-input>
        </div>
      </div>
    </div>
    <el-table
      id="table"
      :data="tableData"
      style="width: 100%"
      height="calc(100% - 150px)"
    >
      <el-table-column
        type="index"
        label="序号"
        width="60"
        :index="indexMethod"
      >
      </el-table-column>
      <el-table-column prop="user_name" label="管理名"> </el-table-column>
      <el-table-column prop="user_count" label="角色"> </el-table-column>
      <el-table-column prop="user_auth" label="禁用">
        <template slot-scope="scope">
          <el-switch
            active-color="#13ce66"
            v-model="scope.row.user_disabled"
            >on</el-switch
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="reset(scope.row)"
            >重置密码</el-button
          >
          <span style="padding: 10px">|</span>
          <el-button type="text" size="small" @click="add('edit', scope.row)"
            >修改</el-button
          >
          <span style="padding: 10px">|</span>
          <el-button type="text" size="small" @click="deleteData(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="footer-pagination"
      :background="isBackground"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[5, 10, 20]"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      min-width="400px"
    >
      <FormEdit
        :formType="formType"
        :formList="formList"
        @handleClose="handleClose"
        v-if="dialogVisible"
      /> </el-dialog
    >
  </div>
</template>
<script>
import FormEdit from "./formEdit.vue";
import { getInfoUser, updateUser, deleteUser } from "@/api/userManagement";
export default {
  components: {
    FormEdit,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      searchUserName: "",
      dialogVisible: false,
      dialogTitle: "",
      isBackground: true,
      formType: "",
      total: 0,
      tableData: [
        {
          user_disabled: false,
        },
        {
          user_disabled: true,
        },
        {
          user_disabled: false,
        },
      ],
      formList: {},
    };
  },
  created() {
    // this.getInfo();
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getInfo();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getInfo();
    },
    // 新增、编辑弹窗
    add(type, data) {
      this.formType = type;
      this.dialogVisible = true;
      this.dialogTitle = type == "add" ? "新增" : "编辑";
      this.formList = data;
    },
    // 获取表格数据
    getInfo() {
      const loading = this.$loading({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)",
        target: document.querySelector("#table"),
      });
      getInfoUser({
        page: this.currentPage,
        size: this.pageSize,
      })
        .then((res) => {
          const { code, data, message } = res;
          loading.close();
          if (code == 1) {
            this.tableData = data.list;
            this.total = data.total;
          } else {
            this.$message.error(message);
          }
        })
        .catch((e) => {
          loading.close();
        });
    },
    handleClose() {
      this.dialogVisible = false;
      this.getInfo();
    },
    // 重置密码
    reset(data) {
      this.$confirm("此操作将重置用户密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          data.user_passd = "123456";
          updateUser(data).then((res) => {
            const { code, data, message } = res;
            if (code == 1) {
              this.$message.success("您的操作已成功");
              this.getInfo();
            } else {
              this.$message.error("您的操作已成功");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置密码操作",
          });
        });
    },
    // 删除数据
    deleteData(data) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const loading = this.$loading({
            lock: true,
            text: "删除中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.5)",
          });
          deleteUser({
            user_name: data.user_name,
            user_count: data.user_count,
          })
            .then((res) => {
              loading.close();
              const { code, data, message } = res;
              if (code == 1) {
                this.$message.success("您的操作已成功");
                this.getInfo();
              } else {
                this.$message.error(message);
              }
            })
            .catch((e) => {
              loading.close();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除操作",
          });
        });
    },
    // 搜索
    btnSearch() {
      getInfoUser({ page: 1, size: 20, user_name: this.searchUserName }).then(
        (res) => {
          const { code, data, message } = res;
          if (code == 1) {
            this.tableData = data.list;
          } else {
            this.$message.error(message);
          }
        }
      );
    },
  },
};
</script>
<style lang="less" scoped>
::v-deep .el-table::before {
  height: 0px;
}
.task-management {
  width: 100%;
  height: 100%;
  // border: 1px solid #ccc;
  .left-btn {
    margin-left: 10px;
  }
  .right-header {
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background-color: rgba(50, 62, 83, 0.25) !important;
    margin-bottom: 10px;
    .right-search {
      width: 450px;
      display: flex;
      justify-content: flex-end;
      margin-right: 20px;
      .search {
        width: 300px;
        ::v-deep .el-input__inner {
          background: transparent;
          border: 1px solid #70cf90;
          color: #c7c7c7;
        }
        /* 谷歌 */
        ::v-deep .el-input__inner::-webkit-input-placeholder {
          color: #7c89a3;
          // font-size: 18px;
        }
        /* 火狐 */
        ::v-deep .el-input__inner:-moz-placeholder {
          color: #7c89a3;
          // font-size: 18px;
        }
        /*ie*/
        ::v-deep .el-input__inner:-ms-input-placeholder {
          // font-size: 18px;
          color: #7c89a3;
        }
        ::v-deep .el-input-group__append,
        .el-input-group__prepend {
          background: transparent;
          border: 1px solid #70cf90;
          color: #70cf90;
        }
      }
    }
  }
  ::v-deep .el-button--primary {
    color: #000;
    background-color: #70cf90;
    border-color: #70cf90;
  }
  ::v-deep .el-button--warning {
    color: #db9835;
    background-color: transparent;
    border-color: #db9835;
  }
  ::v-deep .el-button--danger {
    color: #000;
    background-color: c1393a;
    border-color: #c1393a;
  }
  .el-button--text {
    border-color: transparent;
    color: #70cf90;
  }
}
.footer-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
