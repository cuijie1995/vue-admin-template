<template>
  <div class="container">
    <div class="search">
      <div class="search_header">
        <el-input
          v-model="listQuery.cordno"
          placeholder="订单号"
          style="width: 150px;"
          class="filter-item"
        />
        <el-input
          v-model="listQuery.ccustorderno"
          placeholder="外贸合同号"
          style="width: 150px;"
          class="filter-item"
        />
        <el-date-picker
          v-model="listQuery.mindorderdate"
          placeholder="最早订单日期"
          type="date"
          style="width: 150px;"
          class="filter-item"
          value-format="yyyy-MM-dd"
        />
        <el-date-picker
          v-model="listQuery.maxdorderdate"
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
      :data="showCaseTable"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column label="结算单号" prop="cdocno" align="center" width="120px" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.cdocno }}</span>
        </template>
      </el-table-column>

      <el-table-column label="订单号" prop="cordno" align="center" width="120px" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.cordno }}</span>
        </template>
      </el-table-column>

      <el-table-column label="外贸合同号" align="center" prop="ccustorderno" width="160px">
        <template slot-scope="scope">
          <span>{{ scope.row.ccustorderno }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单日期" prop="dorderdate" align="center" width="160px">
        <template slot-scope="scope">
          <span>{{ scope.row.dorderdate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="业务类型" prop="cbusitype" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cbusitype }}</span>
        </template>
      </el-table-column>

      <el-table-column label="业务模式" align="center" prop="cbusimodelid" width="90px">
        <template slot-scope="scope">
          <span>{{ scope.row.cbusimodelid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单币别" prop="cordercurrency" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cordercurrency }}</span>
        </template>
      </el-table-column>

      <el-table-column label="发票类型" prop="cinvtype" align="center" width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.cinvtype }}</span>
        </template>
      </el-table-column>

      <el-table-column label="结算汇率" align="center" prop="nbalancerate" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.nbalancerate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结算金额" prop="nrecinvamt" align="center" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.nrecinvamt }}</span>
        </template>
      </el-table-column>

      <el-table-column label="应付金额" prop="nhk" align="center" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.nhk }}</span>
        </template>
      </el-table-column>

      <el-table-column label="结算类别" align="center" prop="cbalancetype">
        <template slot-scope="scope">
          <span>{{ scope.row.cbalancetype }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleUpdate(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageIndex"
      :limit.sync="listQuery.resultCount"
      @pagination="getStatement"
    />
  </div>
</template>

<script>
import { GetApbalance } from "../../api/erp";
import axios from "axios";
import Cookies from "js-cookie";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary

export default {
  directives: { waves },
  components: { Pagination },
  data() {
    return {
      showCaseTable: [],
      listLoading: true,
      total: 0,
      Keyword: "",
      listQuery: {
        clientId: "",
        resultCount: 10,
        pageIndex: 1,
        cdocno: "",
        cordno: "",
        ccustorderno: "",
        mindorderdate: "",
        maxdorderdate: "",
        cbusitype: ""
      },
      statementLists: null,
      statementid: ""
    };
  },
  mounted() {
    this.getStatement();
  },
  methods: {
    search() {
      GetApbalance(this.listQuery).then(response => {
        this.showCaseTable = response.result;
        this.total = response.totalCount;
      });
    },
    getStatement() {
      this.listLoading = true;
      let Token = localStorage.getItem("token2");

      this.listQuery.clientId = sessionStorage.getItem("id");
      axios.defaults.headers.common["Authorization"] = "Bearer " + Token;
      GetApbalance(this.listQuery).then(response => {
        // console.log(response);
        this.showCaseTable = response.result;
        this.total = response.totalCount;

        this.listLoading = false;
      });
    },

    handleUpdate(index, row) {
      localStorage.setItem("cbalancetype", row.cbalancetype);
      localStorage.setItem("cbusimodelid", row.cbusimodelid);
      localStorage.setItem("cbusitype", row.cbusitype);
      localStorage.setItem("ccustorderno", row.ccustorderno);
      localStorage.setItem("cdocno", row.cdocno);
      localStorage.setItem("cinvtype", row.cinvtype);
      localStorage.setItem("cordercurrency", row.cordercurrency);
      localStorage.setItem("cordno", row.cordno);
      localStorage.setItem("dorderdate", row.dorderdate);
      localStorage.setItem("nbalancerate", row.nbalancerate);
      localStorage.setItem("nhk", row.nhk);
      localStorage.setItem("nrecinvamt", row.nrecinvamt);
      localStorage.setItem("statementid", row.zR_FIN_APBALANCEOID);
      this.$router.push("accountdetail");
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

.el-pagination {
  text-align: center;
  margin-top: 20px;
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