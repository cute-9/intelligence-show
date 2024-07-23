<!--
 * @desc: 
 * @Author: Huang Qian
 * @Date: 2024-07-10 14:26:18
-->
<template>
  <div class="file-container">
    <div style="position: relative; height: calc(100% - 10px)">
      <el-table
        :data="tableData"
        id="eq"
        style="width: 100%"
        height="calc(100% - 40px)"
      >
        <el-table-column
          type="index"
          label="序号"
          width="60"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column prop="eq_name" label="文件名称"> </el-table-column>
        <el-table-column prop="eq_address" label="文件地址"> </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="transmiss(scope.row)"
              >分析</el-button
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
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          eq_name: "工控机1",
          eq_address: "http://192.168.1.1:8080/file/1.txt",
        },
        {
          eq_name: "工控机2",
          eq_address: "http://192.168.1.1:8080/file/1.txt",
        },
        {
          eq_name: "工控机3",
          eq_address: "http://192.168.1.1:8080/file/1.txt",
        },
      ],
      isBackground: true,
      total: 0,
      currentPage: 1,
      pageSize: 20,
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    transmiss(data) {
      const loading = this.$loading({
        lock: true,
        text: "刷新中...",
        spinner: "el-icon-loading",
        target: document.querySelector("#eq"),
        background: "rgba(0, 0, 0, 0.5)",
      });
      setTimeout(() => {
        loading.close();
      }, 500);
    },
  },
};
</script>
<style lang="less" scoped>
.file-container {
  height: 100%;
  width: 100%;
}
::v-deep .el-button--primary {
  color: #000000;
  background-color: #70cf90;
  border-color: #70cf90;
}
.footer-pagination {
  // margin-top: 10px;
  text-align: center;
}
</style>
