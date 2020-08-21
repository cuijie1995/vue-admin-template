<template>
  <div class="container">
    <div class="search">
      <div class="search_header">
        <el-input
          v-model="listQuery.cspec"
          placeholder="型号"
          style="width: 150px;"
          class="filter-item"
        />

        <el-input
          v-model="listQuery.cpartname"
          placeholder="品名"
          style="width: 150px;"
          class="filter-item"
        />

        <el-date-picker
          v-model="listQuery.mindputindate"
          placeholder="最早入库日期"
          type="date"
          style="width: 150px;"
          class="filter-item"
          value-format="yyyy-MM-dd"
        />
        <el-date-picker
          v-model="listQuery.maxdputindate"
          placeholder="最晚入库日期"
          type="date"
          style="width: 150px;"
          class="filter-item"
          value-format="yyyy-MM-dd"
        />
      </div>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="showCaseTable"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column label="型号" prop="cspec" align="center" fixed width="300px">
        <template slot-scope="scope">
          <span>{{ scope.row.cspec }}</span>
        </template>
      </el-table-column>

      <el-table-column label="品名" prop="cpartname" align="center" fixed width="145px">
        <template slot-scope="scope">
          <span>{{ scope.row.cpartname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="供应商" align="center" prop="ccontactname" width="330px">
        <template slot-scope="scope">
          <span>{{ scope.row.ccontactname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单号" prop="cordno" align="center" width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.cordno }}</span>
        </template>
      </el-table-column>

      <el-table-column label="收货单号" prop="cdocno" align="center" width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.cdocno }}</span>
        </template>
      </el-table-column>

      <el-table-column label="品牌" align="center" prop="cbrand" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.cbrand }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产地" prop="coriginal" align="center" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.coriginal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入库日期" prop="dputindate" align="center" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.dputindate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="单位" prop="cclinchunit" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cclinchunit }}</span>
        </template>
      </el-table-column>

      <el-table-column label="数量" align="center" prop="nqty">
        <template slot-scope="scope">
          <span>{{ scope.row.nqty }}</span>
        </template>
      </el-table-column>
      <el-table-column label="箱数" prop="nrcvcartons" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nrcvcartons }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所在仓库" align="center" prop="cwarehousename">
        <template slot-scope="scope">
          <span>{{ scope.row.cwarehousename }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageIndex"
      :limit.sync="listQuery.resultCount"
      @pagination="getList"
    />
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import waves from "@/directive/waves"; // waves directiv
import { GetStocks } from "../../api/erp";
import Pagination from "@/components/Pagination"; // secondary

export default {
  directives: { waves },
  components: { Pagination },
  data() {
    return {
      listLoading: true,
      token: "",
      total: 0,
      listQuery: {
        clientId: "",
        resultCount: 10,
        pageIndex: 1,
        cspec: "",
        cpartname: "",
        ccontactname: "",
        cordno: "",
        cdocno: "",
        mindputindate: "",
        maxdputindate: ""
      },
      showCaseTable: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      let Token = localStorage.getItem("token2");
      this.listQuery.clientId = sessionStorage.getItem("id");
      axios.defaults.headers.common["Authorization"] = "Bearer " + Token;
      GetStocks(this.listQuery).then(response => {
        this.showCaseTable = response.result;
        this.total = response.totalCount;

        this.listLoading = false;
      });
    },
    search() {
      this.listLoading = true;
      let Token = localStorage.getItem("token2");
      this.listQuery.clientId = sessionStorage.getItem("id");
      axios.defaults.headers.common["Authorization"] = "Bearer " + Token;
      GetStocks(this.listQuery).then(response => {
        this.showCaseTable = response.result;
        this.total = response.totalCount;

        this.listLoading = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding: 20px !important;
}
.search {
  margin-bottom: 10px !important;
}
.search .el-select {
  width: 20%;
}
.container .el-table {
  font-size: 12px !important;
}

.container .search .el-input {
  margin-right: 10px;
  width: 20% !important;
}
.search_header {
  display: inline;
}
</style>
<style>
.search .el-input__inner {
  height: 30px !important;
  line-height: 30px !important;
}
.search .el-select .el-input.el-input--suffix {
  width: 100% !important;
}
.search .el-input--suffix.is-focus {
  width: 100% !important;
}
</style>