<template>
  <div class="code">
    <el-table
      :data="codes"
      border
      style="width: 100%"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="codeID" label="编号" align="center" ></el-table-column>
      <el-table-column prop="codeName" label="名称" align="center" width="90px"></el-table-column>
      <el-table-column prop="customColumnName1" label="自定义1" align="center"></el-table-column>
      <el-table-column prop="customColumnName2" label="自定义2" align="center"></el-table-column>
      <el-table-column prop="customColumnName3" label="自定义" align="center"></el-table-column>
      <el-table-column prop="customColumnName4" label="自定义4" align="center"></el-table-column>
      <el-table-column prop="customColumnName5" label="自定义5" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="100px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleUpdate(scope.$index, scope.row)">详情表</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { GetAllCode } from "@/api/base";
export default {
  name: "code",
  data() {
    return {
      codes: [],
      codeDatas: [],
      codeid: ""
    };
  },
  mounted() {
    GetAllCode()
      .then(response => {
        this.codes = response.result;
      })
      .catch(data => {});
  },
  methods: {
    handleUpdate(index, row) {
      sessionStorage.setItem("codeid", row.codeID);
      this.$router.push({ path: "/code-detail" });
    }
  }
};
</script>
<style scoped>
.code {
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
}
.el-table {
  font-size: 10px;
}
.el-main {
  line-height: 30px;
}
</style>
