<template>
  <div class="current_container">
    <div class="search">
      <div class="search_header">
        <el-input
          v-model="listQuery.cdocno"
          placeholder="付款单号"
          style="width: 150px;"
          class="filter-item"
        />

        <el-input
          v-model="listQuery.ctransubject"
          placeholder="收款方"
          style="width: 150px;"
          class="filter-item"
        />

        <el-date-picker
          v-model="listQuery.mindtradedate"
          placeholder="最早付款日期"
          type="date"
          style="width: 150px;"
          class="filter-item"
          value-format="yyyy-MM-dd"
        />
        <el-date-picker
          v-model="listQuery.maxdtradedate"
          placeholder="最晚付款日期"
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
      <el-table-column label="付款单号" prop="cdocno" align="center" fixed width="120px">
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.$index, scope.row)">{{ scope.row.cdocno }}</span>
        </template>
      </el-table-column>

      <el-table-column label="付款日期" prop="dtradedate" align="center" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.dtradedate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="收款方" align="center" prop="ctransubject" width="220px">
        <template slot-scope="scope">
          <span>{{ scope.row.ctransubject }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收款银行" prop="cbanknamerec" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cbanknamerec }}</span>
        </template>
      </el-table-column>

      <el-table-column label="收款账号" prop="nrcvamt" align="center" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.nrcvamt }}</span>
        </template>
      </el-table-column>

      <el-table-column label="付款方式" align="center" prop="cpaytype">
        <template slot-scope="scope">
          <span>{{ scope.row.cpaytype }}</span>
        </template>
      </el-table-column>
      <el-table-column label="付款银行" prop="cbankserialno" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cbankserialno }}</span>
        </template>
      </el-table-column>

      <el-table-column label="分行名称" prop="cbranchname" align="center" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.cbranchname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="币别" align="center" prop="ccurrency">
        <template slot-scope="scope">
          <span>{{ scope.row.ccurrency }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" prop="nrealmoney" align="center" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.nrealmoney }}</span>
        </template>
      </el-table-column>

      <el-table-column label="已核销金额" prop="chargedamtbamt" align="center" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.chargedamtbamt }}</span>
        </template>
      </el-table-column>

      <el-table-column label="余额" align="center" prop="nblanamt" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.nblanamt }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
        width="90"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleUpdate(scope.$index, scope.row)">详情</el-button>
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
import axios from "axios";
import Cookies from "js-cookie";
import { GetBankTrans } from "../../api/erp";
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
        cdocno: "",
        mindtradedate: "",
        maxdtradedate: "",
        ctransubject: "",
        cbanknamerec: "",
        cbranchname: "",
        cbankserialno: ""
      },
      listLoading: true,
      showCaseTable: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    search() {
      this.listLoading = true;
      let Token = localStorage.getItem("token2");
      this.listQuery.clientId = sessionStorage.getItem("id");
      axios.defaults.headers.common["Authorization"] = "Bearer " + Token;
      GetBankTrans(this.listQuery).then(response => {
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
      GetBankTrans(this.listQuery).then(response => {
        this.showCaseTable = response.result;
        this.total = response.totalCount;

        this.listLoading = false;
      });
    },
    handleUpdate(index, row) {
      localStorage.setItem("cbanknamerec", row.cbanknamerec);
      localStorage.setItem("cbankserialno", row.cbankserialno);
      localStorage.setItem("cbranchname", row.cbranchname);
      localStorage.setItem("ccurrency", row.ccurrency);
      localStorage.setItem("cdocno", row.cdocno);
      localStorage.setItem("chargedamtbamt", row.chargedamtbamt);
      localStorage.setItem("cpaytype", row.cpaytype);
      localStorage.setItem("ctransubject", row.ctransubject);
      localStorage.setItem("dtradedate", row.dtradedate);
      localStorage.setItem("nblanamt", row.nblanamt);
      localStorage.setItem("nrcvamt", row.nrcvamt);
      localStorage.setItem("nrealmoney", row.nrealmoney);

      localStorage.setItem("bankoid", row.zR_FIN_BANKTRANSOID);
      this.$router.push("write");
    }
  }
};
</script>
<style lang="scss" scoped>
.current_container {
  padding: 20px;
}

.current_container .search {
  margin-bottom: 10px;
}

.current_container .el-table {
  font-size: 12px !important;
}

.current_container .search .el-input {
  margin-right: 10px;
  width: 20% !important;
}
.search_header {
  display: inline;
}
.el-button {
  cursor: pointer;
}
</style>
<style>
.current_container .search .el-input__inner {
  height: 30px;
  line-height: 30px;
}
</style>