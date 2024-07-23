<template>
  <div class="my-home-container">
    <P class="header-title">我的主页</P>
    <div class="my-home-main">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="70px"
        :hide-required-asterisk="true"
        class="demo-form"
      >
        <el-form-item label="用户名" prop="user_name">
          <el-input
            :disabled="editDisabled"
            v-model="form.user_name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="账户" prop="user_count">
          <el-input
            :disabled="editDisabled"
            v-model="form.user_count"
            placeholder="请输入账户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="pass">
          <el-select
            disabled
            v-model="form.user_auth"
            placeholder="请选择用户权限"
          >
            <el-option
              v-for="item in options"
              :key="item.user_auth"
              :label="item.user_auth_name"
              :value="item.user_auth"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="user_passd" v-if="!editDisabled">
          <el-input
            v-model="form.user_passd"
            disabled
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button
            type="primary"
            v-if="editDisabled"
            @click="btnSubmit('edit')"
            >编辑</el-button
          >
          <el-button v-if="!editDisabled" @click="btnSubmit('cancel')"
            >返回</el-button
          >
          <el-button
            type="primary"
            v-if="!editDisabled"
            @click="btnSubmit('sub')"
            >保存</el-button
          >
          <el-button v-if="!editDisabled" @click="editPassword" type="text"
            >修改密码</el-button
          >
        </el-form-item>
      </el-form>
      <el-dialog
        title="修改密码"
        :visible.sync="dialogVisible"
        width="30%"
        min-width="400px"
      >
        <PassWordEdit
          v-if="dialogVisible"
          :form="form"
          @handleClose="handleClose"
        />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  userQueryOne,
  updateUser,
  userAuth,
  addUser,
  checkUser,
} from "@/api/userManagement";
import PassWordEdit from "./passWordEdit";
export default {
  components: {
    PassWordEdit,
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        user_type: "",
        user_count: "",
        user_name: "",
        user_passd: "123456",
        user_type: 2,
      },
      options: [],
      rules: {
        user_name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        user_count: [
          { required: true, message: "请输入账户", trigger: "blur" },
        ],
        user_auth: [{ required: true, message: "请选择权限", trigger: "blur" }],
      },
      editDisabled: true,
    };
  },
  created() {
    this.getUserAuth();
    this.getInfo();
  },
  methods: {
    editPassword() {
      this.dialogVisible = !this.dialogVisible;
    },
    getInfo() {
      userQueryOne({
        user_name: this.$store.state.menuState.userInfo.user_name,
        user_count: this.$store.state.menuState.userInfo.user_count,
      }).then((res) => {
        const { code, data, message } = res;
        if (code == 1) {
          this.form = data[0];
        } else {
          this.$message.error(message);
        }
      });
    },
    getUserAuth() {
      userAuth({}).then((res) => {
        const { code, data, message } = res;
        console.log(data, "data");
        if (code == 1) {
          this.options = data;
        } else {
          this.$message.error(message);
        }
      });
    },
    btnSubmit(type) {
      if (type == "edit") {
        this.editDisabled = !this.editDisabled;
      } else if (type == "sub") {
        const loading = this.$loading({
          lock: true,
          text: "提交中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        updateUser(this.form)
          .then((res) => {
            loading.close();
            const { code, message } = res;
            if (code == 1) {
              this.$message.success("您的操作已成功！");
              this.$store.commit("menuState/getUserInfo", this.form);
              this.editDisabled = !this.editDisabled;
            } else {
              this.$message.error(message);
            }
          })
          .catch((e) => {
            loading.close();
          });
      } else if (type == "cancel") {
        this.editDisabled = !this.editDisabled;
      }
    },
    handleClose(data) {
      this.dialogVisible = !this.dialogVisible;
      if (data == "success") {
        window.sessionStorage.setItem("userToken", '');
        this.$confirm("您已重新修改密码，请重新登录系统！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$router.push({ name: "login" });
          })
          .catch(() => {
            this.$router.push({ name: "login" });
          });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.my-home-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 50%;
  height: 70%;
  min-width: 600px;
  background-image: url(../../assets/my_home.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  ::v-deep .el-select {
    width: 100%;
  }
  .header-title {
    text-align: center;
    font-family: STHeitiSC, STHeitiSC;
    font-weight: 500;
    font-size: 28px;
    color: #07f0fd;
    line-height: 29px;
    font-style: normal;
  }
  .my-home-main {
    width: 400px;
    margin: 0 auto;
  }
  ::v-deep .el-input__inner {
    background: transparent;
    border: 1px solid #07f0fd;
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
    border: 1px solid #07f0fd;
    color: #07f0fd;
  }
  ::v-deep .el-form-item__label {
    color: #c7c7c7;
  }
}
</style>
