<template>
  <div class="code">
    <div style="text-align:center" class="title">
      <h2>代码详情表</h2>
    </div>
    <el-button type="primary" @click="back()">返回</el-button>
    <el-table
      :data="codeDatas"
      border
      style="width: 100%"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="codeDataID" label="编号" width="80" align="center" fixed></el-table-column>
      <el-table-column prop="codeDataName" label="名称" width="150" align="center" fixed></el-table-column>
      <el-table-column prop="customColumn1" label="自定义1" width="150" align="center"></el-table-column>
      <el-table-column prop="customColumn2" label="自定义2" width="150" align="center"></el-table-column>
      <el-table-column prop="customColumn3" label="自定义3" width="150" align="center"></el-table-column>
      <el-table-column prop="customColumn4" label="自定义4" width="150" align="center"></el-table-column>
      <el-table-column prop="customColumn5" label="自定义5" width="150" align="center"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getCodeDetail } from "@/api/base";
export default {
  name:"codeDetail",
  data() {
    return {
      codeid: "",
      CodeTypeId: "",
      codeDatas: []
    };
  },
  mounted() {
    this.getCodeDetail();
  },
  methods: {
    getCodeDetail() {
      this.codeid = sessionStorage.getItem("codeid");
      if (this.codeid) {
        getCodeDetail({ CodeTypeId: this.codeid }).then(response => {
          this.codeDatas = response.result.codeDatas;
        });
      }
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.code {
  width: 85.5%;
  margin: 0 auto;
  margin-top: 80px;
}
.el-table {
  font-size: 12px !important;
}
.title {
  display: inline-block;
  width: 90%;
}
.el-button {
  line-height: 0.5;
  margin-bottom: 15px;
}
</style>