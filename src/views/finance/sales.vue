<template>
  <div class="container">
    <div class="search">
      <div class="search_header">
        <el-input
          v-model="listQuery.cgivebatch"
          placeholder="发票号码"
          style="width: 150px;"
          class="filter-item"
        />

        <el-input
          v-model="listQuery.corderno"
          placeholder="订单号"
          style="width: 150px;"
          class="filter-item"
        />

        <el-date-picker
          v-model="listQuery.mindinvdate"
          placeholder="最早订单日期"
          type="date"
          style="width: 150px;"
          class="filter-item"
          value-format="yyyy-MM-dd"
        />
        <el-date-picker
          v-model="listQuery.maxdinvdate"
          placeholder="最晚订单日期"
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
      element-loading-text="加载中"
      :data="showCaseTable"
      border
      fit
      highlight-current-row
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      style="width: 100%;"
    >
      <el-table-column label="发票单号" prop="cinvno" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cinvno }}</span>
        </template>
      </el-table-column>

      <el-table-column label="订单号" prop="corderno" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.corderno }}</span>
        </template>
      </el-table-column>

      <el-table-column label="外贸合同号" align="center" prop="ccontractno">
        <template slot-scope="scope">
          <span>{{ scope.row.ccontractno }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单日期" prop="dinvdate" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dinvdate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="业务类型" prop="cbusitype" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cbusitype }}</span>
        </template>
      </el-table-column>

      <el-table-column label="业务模式" align="center" prop="cbusimode">
        <template slot-scope="scope">
          <span>{{ scope.row.cbusimode }}</span>
        </template>
      </el-table-column>

      <el-table-column label="发票类型" prop="cinvtype" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cinvtype }}</span>
        </template>
      </el-table-column>

      <el-table-column label="发票金额" align="center" prop="ninvamt">
        <template slot-scope="scope">
          <span>{{ scope.row.ninvamt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发票号码" prop="cgivebatch" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cgivebatch }}</span>
        </template>
      </el-table-column>

      <el-table-column label="开票银行" prop="creclaimbank" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.creclaimbank }}</span>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageIndex"
      :limit.sync="listQuery.resultCount"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { GetSalesInv } from "../../api/erp";
import axios from "axios";
import Cookies from "js-cookie";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary

export default {
  directives: { waves },
  components: { Pagination },

  data() {
    return {
      total: 0,
      listQuery: {
        clientId: "",
        resultCount: 10,
        pageIndex: 1,
        cgivebatch: "",
        corderno: "",
        ccontractno: "",
        cbusitype: "",
        cbusimode: "",
        mindinvdate: "",
        maxdinvdate: ""
      },
      showCaseTable: [],
      listLoading: true
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    search() {
      GetSalesInv(this.listQuery).then(response => {
        this.showCaseTable = response.result;
        this.total = response.totalCount;

        this.listLoading = false;
      });
    },
    getList() {
      this.listLoading = true;
      let Token = localStorage.getItem("token2");
      this.listQuery.clientId = sessionStorage.getItem("id");
      axios.defaults.headers.common["Authorization"] = "Bearer " + Token;
      GetSalesInv(this.listQuery).then(response => {
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
  padding: 20px;
}

.search {
  margin-bottom: 10px;
}

.container .el-table {
  font-size: 12px !important;
}

.search .el-input {
  margin-right: 10px;
  width: 20% !important;
}
.search_header {
  display: inline;
}
</style>
<style>
.search .el-input__inner {
  height: 30px;
  line-height: 30px;
}
</style>