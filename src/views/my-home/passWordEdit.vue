<!--
 * @desc: 
 * @Author: Huang Qian
 * @Date: 2024-06-07 15:17:28
-->
<template>
  <div>
    <div>
      <div v-if="passdVisible">
        <p style="color: #07f0fd">密码验证</p>
        <p>当前密码：</p>
        <el-input
          v-model="passWord"
          show-password
          placeholder="请输入当前账号密码"
        ></el-input>
        <p class="message">{{ message }}</p>
      </div>
      <div v-if="!passdVisible">
        <p style="color: #07f0fd">设置新密码</p>
        <p>新密码：</p>
        <el-input
          v-model="newPassd"
          show-password
          placeholder="请输入六位以上的新密码"
        ></el-input>
        <p class="message">{{ message }}</p>
        <p>确认新密码：</p>
        <el-input
          v-model="newPassds"
          show-password
          placeholder="请再次输入新密码"
        ></el-input>
        <p class="message">{{ newMessage }}</p>
      </div>
      <div class="btn">
        <el-button @click="handleClose"> 取消</el-button>
        <el-button type="primary" v-if="passdVisible" @click="next"
          >下一步</el-button
        >
        <el-button type="primary" v-if="!passdVisible" @click="submit"
          >确认</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { updateUser } from "@/api/userManagement";
export default {
  props: {
    form: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      passWord: "",
      message: "",
      newMessage: "",
      passdVisible: true,
      newPassd: "",
      newPassds: "",
    };
  },
  methods: {
    handleClose() {
      this.$emit("handleClose",'cancel');
    },
    next() {
      this.message = "";
      // console.log("sss");
      if (this.passWord === this.form.user_passd) {
        this.passdVisible = !this.passdVisible;
      } else {
        this.message = "密码验证失败！请重新输入当前账户密码！";
      }
    },
    submit() {
      this.newMessage = "";
      this.message = "";
      if (this.newPassd == "") {
        this.message = "请输入新密码";
        // this.newMessage = "请再次输入新密码";
        return;
      } else if (this.newPassds == "") {
        this.newMessage = "请再次输入新密码";
        return;
      } else if (this.newPassds != this.newPassd) {
        this.newMessage = "两次密码不一致";
        return;
      } else {
        let formData = JSON.parse(JSON.stringify(this.form));
        formData.user_passd = this.newPassd;
        console.log(formData, "formData");
        const loading = this.$loading({
          lock: true,
          text: "提交中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        updateUser(formData)
          .then((res) => {
            loading.close();
            const { code, message } = res;
            if (code == 1) {
              this.$message.success("您的操作已成功！");
              this.$emit("handleClose",'success');
            } else {
              this.$message.error(message);
            }
          })
          .catch((e) => {
            loading.close();
          });
      }
    },
  },
};
</script>
<style lang="less" scoped>
p {
  color: #c7c7c7;
}
.btn {
  height: 100px;
  text-align: right;
  line-height: 100px;
}
.message {
  color: red;
  font-size: 14px;
}
</style>
