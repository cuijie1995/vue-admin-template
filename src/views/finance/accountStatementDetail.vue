<template>
  <div class="app-container">
    <div class="header">
      <el-button type="primary" @click="back()">返回</el-button>
    </div>
    <div class="con">
      <el-row>
        <el-col :span="6">
          <div>结算单号：{{cdocno | filterNull}}</div>
        </el-col>
        <el-col :span="6">
          <div>订单号：{{cordno | filterNull}}</div>
        </el-col>
        <el-col :span="6">
          <div>外贸合同号：{{ccustorderno | filterNull}}</div>
        </el-col>
        <el-col :span="6">
          <div>订单日期：{{dorderdate | filterNull}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div>业务类型：{{cbusitype | filterNull}}</div>
        </el-col>
        <el-col :span="6">
          <div>业务模式：{{cbusimodelid | filterNull}}</div>
        </el-col>
        <el-col :span="6">
          <div>订单币别：{{cordercurrency | filterNull}}</div>
        </el-col>
        <el-col :span="6">
          <div>发票类型：{{cinvtype | filterNull}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div>结算汇率：{{nbalancerate | filterNull}}</div>
        </el-col>
        <el-col :span="6">
          <div>结算金额：{{nrecinvamt | filterNull}}</div>
        </el-col>
        <el-col :span="6">
          <div>应付金额：{{nhk | filterNull}}</div>
        </el-col>
        <el-col :span="6">
          <div>结算类别：{{cbalancetype | filterNull}}</div>
        </el-col>
      </el-row>
    </div>
    <h2>应收/应付明细表</h2>
    <el-table
      v-loading="listLoading"
      :data="apbalanceD1sLists"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-bottom: 50px"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column label="应收科目" prop="cacctype" align="center" fixed width="90px">
        <template slot-scope="scope">
          <span>{{ scope.row.cacctype }}</span>
        </template>
      </el-table-column>

      <el-table-column label="订单号" prop="cordno" align="center" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.cordno }}</span>
        </template>
      </el-table-column>

      <el-table-column label="日期" align="center" prop="ddocdate" width="140px">
        <template slot-scope="scope">
          <span>{{ scope.row.ddocdate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="应收原币金额" prop="naccamt" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.naccamt }}</span>
        </template>
      </el-table-column>

      <el-table-column label="应收人民币金额" prop="nacapamtrmb" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nacapamtrmb }}</span>
        </template>
      </el-table-column>

      <el-table-column label="汇率" align="center" prop="nacaprate">
        <template slot-scope="scope">
          <span>{{ scope.row.nacaprate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="应结算金额" prop="nsettledamt" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nsettledamt }}</span>
        </template>
      </el-table-column>

      <el-table-column label="结算余额" prop="cbalanceamt" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cbalanceamt }}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否已开票" align="center" prop="cinvflag">
        <template slot-scope="scope">
          <span>{{ scope.row.cinvflag }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="cremark" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cremark }}</span>
        </template>
      </el-table-column>
    </el-table>
    <h2>型号详情表</h2>
    <el-table
      v-loading="listLoading"
      :data="showCaseTable"
      border
      fit
      highlight-current-row
      style="width: 100%"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column label="型号" prop="cspec" align="center" fixed width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.cspec }}</span>
        </template>
      </el-table-column>

      <el-table-column label="品名" prop="cpartname" align="center" fixed width="200px">
        <template slot-scope="scope">
          <span>{{ scope.row.cpartname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="单位" align="center" prop="ctransunit" width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.ctransunit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" prop="ccustomsamount" align="center" width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.ccustomsamount }}</span>
        </template>
      </el-table-column>

      <el-table-column label="币别" prop="cordercurrency" align="center" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.cordercurrency }}</span>
        </template>
      </el-table-column>

      <el-table-column label="增值率" align="center" prop="nvatrate">
        <template slot-scope="scope">
          <span>{{ scope.row.nvatrate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="增值税" prop="nvalueaddedtaxamt" align="center" width="140px">
        <template slot-scope="scope">
          <span>{{ scope.row.nvalueaddedtaxamt }}</span>
        </template>
      </el-table-column>

      <el-table-column label="关税率" prop="ncustomesratE1" align="center" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.ncustomesratE1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="关税" align="center" prop="nactcustomesamt" width="125px">
        <template slot-scope="scope">
          <span>{{ scope.row.nactcustomesamt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单数量" prop="nordsettleqty" align="center" width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.nordsettleqty }}</span>
        </template>
      </el-table-column>

      <el-table-column label="结算数量" prop="nsettleqty" align="center" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.nsettleqty }}</span>
        </template>
      </el-table-column>

      <el-table-column label="含税单价" align="center" prop="ntaxprice" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.ntaxprice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发票单价" align="center" prop="ninvprice" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.ninvprice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报关金额" align="center" prop="ntaxamt" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.ntaxamt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结算金额" align="center" prop="nbillingamt" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.nbillingamt }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="text-right"
      ref="taskPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize"
      :total="taskTotal"
      layout="sizes, total, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>
<script>
import axios from "axios";
import { GetApbalanceDetailed } from "../../api/erp";
export default {
  filters: {
    filterNull(val) {
      console.log(val);
      if (val !== "null") {
        return val;
      } else {
        return "--";
      }
    }
  },
  data() {
    return {
      currentPage: 1,
      taskTotal: 0,
      pageSize: 10,
      caseTable: [],
      handCaseTable: [],
      showCaseTable: [],
      listLoading: true,
      statementid: "",
      apbalanceD1sLists: null,
      cbalancetype: "",
      cbusimodelid: "",
      cbusitype: "",
      ccustorderno: "",
      cdocno: "",
      cinvtype: "",
      cordercurrency: "",
      cordno: "",
      dorderdate: "",
      nbalancerate: "",
      nhk: "",
      nrecinvamt: ""
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.listLoading = true;
      this.cbalancetype = localStorage.getItem("cbalancetype");
      this.cbusimodelid = localStorage.getItem("cbusimodelid");
      this.cbusitype = localStorage.getItem("cbusitype");
      this.ccustorderno = localStorage.getItem("ccustorderno");
      this.cdocno = localStorage.getItem("cdocno");
      this.cinvtype = localStorage.getItem("cinvtype");
      this.cordercurrency = localStorage.getItem("cordercurrency");
      this.cordno = localStorage.getItem("cordno");
      this.dorderdate = localStorage.getItem("dorderdate");
      this.nbalancerate = localStorage.getItem("nbalancerate");
      this.nhk = localStorage.getItem("nhk");
      this.nrecinvamt = localStorage.getItem("nrecinvamt");

      this.statementid = localStorage.getItem("statementid");

      let Token = localStorage.getItem("token2");
      axios.defaults.headers.common["Authorization"] = "Bearer " + Token;
      GetApbalanceDetailed(this.statementid).then(response => {
        this.apbalanceD1sLists = response.apbalanceD1s;
        this.caseTable = response.apbalanceD2s;
        this.taskTotal = response.apbalanceD2s.length;
        this.arrSlice(this.caseTable, this.pageSize);
        this.showCaseTable = this.handCaseTable[0];
        this.listLoading = false;
      });
    },
    back() {
      this.$router.go(-1);
    },
    arrSlice(arr, size) {
      this.handCaseTable = [];
      for (var i = 0; i < Math.ceil(arr.length / size); i++) {
        var start = i * size;
        var end = start + size;
        this.handCaseTable.push(arr.slice(start, end));
      }
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.arrSlice(this.caseTable, this.pageSize);
      this.showCaseTable = this.handCaseTable[0];
      var maxPage = Math.ceil(this.taskTotal / size);
      if (this.currentPage > maxPage) this.currentPage = maxPage;
      else this.showCaseTable = this.handCaseTable[this.currentPage - 1];
    },
    handleCurrentChange(current) {
      this.currentPage = current;
      this.showCaseTable = this.handCaseTable[this.currentPage - 1];
    }
  }
};
</script>
<style lang="scss">
.el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  font-size: 12px;
}

.header {
  text-align: right;
  margin-bottom: 15px;
}

.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
<style scoped>
h2 {
  text-align: center;
  margin-bottom: 10px;
}
.con {
  margin-bottom: 25px;
  font-size: 14px;
  font-weight: 600;
}
.el-button {
  cursor: pointer;
}
</style>