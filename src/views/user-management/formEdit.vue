<!--
 * @desc: 
 * @Author: Huang Qian
 * @Date: 2024-05-23 16:17:22
-->
<template>
  <div class="form-container">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="70px"
      class="demo-form"
    >
      <el-form-item label="用户名" prop="user_name">
        <el-input
          v-model="form.user_name"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="账户" prop="user_count">
        <el-input
          v-model="form.user_count"
          placeholder="请输入账户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="user_auth">
        <el-select v-model="form.user_auth" placeholder="请选择用户权限">
          <el-option
            v-for="item in options"
            :key="item.user_auth"
            :label="item.user_auth_name"
            :value="item.user_auth"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item align="center">
        <el-button
          type="primary"
          v-if="formType == 'add'"
          @click="btnSubmit('add')"
          >立即创建</el-button
        >
        <el-button
          type="primary"
          v-if="formType == 'edit'"
          @click="btnSubmit('edit')"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
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
export default {
  props: {
    formType: {
      type: String,
      default: "",
    },
    formList: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
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
    };
  },
  created() {
    this.getUserAuth();
    if (this.formType != "add") {
      this.getInfo();
    }
  },
  methods: {
    getInfo() {
      userQueryOne({
        user_name: this.formList.user_name,
        user_count: this.formList.user_count,
      }).then((res) => {
        const { code, data, message } = res;
        if (code == 1) {
          this.form = data[0];
        } else {
          this.$message.error(message);
        }
      });
    },
    btnSubmit(type) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (type == "add") {
            checkUser({
              user_name: this.form.user_name,
              user_count: this.form.user_count,
            }).then((res) => {
              const { code, data, message } = res;
              if (code == 1 && data[0].num == 0) {
                this.submitForm(type);
              } else {
                this.$message.error("用户名或账户已存在！");
              }
            });
          } else {
            this.submitForm(type);
          }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm(type) {
      let url = type == "add" ? addUser : updateUser;
      const loading = this.$loading({
        lock: true,
        text: "提交中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      url(this.form).then((res) => {
        loading.close();
        const { code, message } = res;
        if (code == 1) {
          this.$message.success("您的操作已成功！");
          this.$emit("handleClose");
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
  },
};
</script>
<style lang="less" scoped>
.form-container {
  ::v-deep .el-form-item__label {
    color: #e0f1f5;
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
  ::v-deep .el-button--primary {
    color: #000000 !important;
    background-color: #07f0fd !important;
    border-color: #07f0fd;
  }
  ::v-deep .el-select {
    width: 100%;
  }
  ::v-deep .el-select-dropdown {
    border: 1px solid #07f0fd !important;
    border-radius: 4px;
    background-color: #16273e !important;
  }
}
</style>
