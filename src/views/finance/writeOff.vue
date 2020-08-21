<template>
  <div class="container">
    <div class="search" style="text-align: right">
      <!-- 订单号：
      <el-input v-model="listQuery.Keyword" placeholder="用户名/姓/名称......" style="width: 200px;" class="filter-item" />
      开始日期：
      <el-date-picker type="date" placeholder="选择日期" class="filter-item"></el-date-picker>结束日期:
      <el-date-picker type="date" placeholder="选择日期" class="filter-item"></el-date-picker>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="search">查询</el-button>-->
      <el-button type="primary" @click="back()">返回</el-button>
    </div>

    <div class="con">
      <el-row>
        <el-col :span="6">
          <div>付款单号：{{cdocno | filterNull}}</div>
        </el-col>
        <el-col :span="5">
          <div>付款日期：{{dtradedate | filterNull}}</div>
        </el-col>
        <el-col :span="7">
          <div>收款方：{{ctransubject | filterNull}}</div>
        </el-col>
        <el-col :span="6">
          <div>收款银行：{{cbanknamerec | filterNull}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div>收款账号：{{nrcvamt | filterNull}}</div>
        </el-col>
        <el-col :span="5">
          <div>
            付款方式：
            {{cpaytype | filterNull}}
          </div>
        </el-col>
        <el-col :span="7">
          <div>付款银行：{{cbankserialno | filterNull}}</div>
        </el-col>
        <el-col :span="6">
          <div>分行名称：{{cbranchname | filterNull}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div>币别：{{ccurrency | filterNull}}</div>
        </el-col>
        <el-col :span="5">
          <div>金额：{{nrealmoney | filterNull}}</div>
        </el-col>
        <el-col :span="7">
          <div>已核销金额：{{chargedamtbamt | filterNull}}</div>
        </el-col>
        <el-col :span="6">
          <div>余额：{{nblanamt | filterNull}}</div>
        </el-col>
      </el-row>
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
      <el-table-column label="订单号" prop="cordno" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cordno }}</span>
        </template>
      </el-table-column>

      <el-table-column label="应收类别" align="center" prop="cacaptype">
        <template slot-scope="scope">
          <span>{{ scope.row.cacaptype }}</span>
        </template>
      </el-table-column>
      <el-table-column label="应收币别" prop="cacapcurrency" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cacapcurrency }}</span>
        </template>
      </el-table-column>

      <el-table-column label="单据日期" prop="ardate" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ardate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="到期日" align="center" prop="drecorddate">
        <template slot-scope="scope">
          <span>{{ scope.row.drecorddate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="核销日期" prop="ddocdate" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ddocdate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="核销金额" prop="nveramtorig" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nveramtorig }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="text-right"
      ref="taskPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,15, 20, 30, 40, 50]"
      :page-size="pageSize"
      :total="taskTotal"
      layout="sizes, total, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary
import { GetVerificattons } from "../../api/erp";

export default {
  filters: {
    filterNull(val) {
      if (val == "null") {
        var value = "--";
        val = value;
        return val;
      }
      if (val != "null") {
        return val;
      }
    }
  },
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      currentPage: 1,
      taskTotal: 0,
      pageSize: 15,
      caseTable: [],
      handCaseTable: [],
      showCaseTable: [],
      listLoading: true,
      listQuery: {
        Keyword: ""
      },
      bankoid: "",
      cbanknamerec: "",
      cbankserialno: "",
      cbranchname: "",
      ccurrency: "",
      cdocno: "",
      chargedamtbamt: "",
      cpaytype: "",
      ctransubject: "",
      dtradedate: "",
      nblanamt: "",
      nrcvamt: "",
      nrealmoney: ""
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    search() {
      searchUser(this.listQuery).then(response => {
        this.list = response.result.items;
      });
    },
    getDetail() {
      this.listLoading = true;
      this.cbanknamerec = localStorage.getItem("cbanknamerec");
      this.cbankserialno = localStorage.getItem("cbankserialno");
      this.cbranchname = localStorage.getItem("cbranchname");
      this.ccurrency = localStorage.getItem("ccurrency");
      this.cdocno = localStorage.getItem("cdocno");
      this.chargedamtbamt = localStorage.getItem("chargedamtbamt");
      this.cpaytype = localStorage.getItem("cpaytype");
      this.ctransubject = localStorage.getItem("ctransubject");
      this.dtradedate = localStorage.getItem("dtradedate");
      this.nblanamt = localStorage.getItem("nblanamt");
      this.nrcvamt = localStorage.getItem("nrcvamt");
      this.nrealmoney = localStorage.getItem("nrealmoney");

      this.oid = localStorage.getItem("bankoid");
      let Token = localStorage.getItem("token2");
      axios.defaults.headers.common["Authorization"] = "Bearer " + Token;
      GetVerificattons(this.oid).then(response => {
        this.caseTable = response;
        this.taskTotal = response.length;
        this.arrSlice(this.caseTable, this.pageSize);
        this.showCaseTable = this.handCaseTable[0];
        this.listLoading = false;
      });
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
    },
    back() {
      this.$router.go(-1);
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
.con {
  margin: 25px 0;
  font-size: 14px;
  font-weight: 600;
}
.search .el-date-editor,
.el-input {
  margin-right: 10px;
  width: 20% !important;
}
</style>
<style>
.search .el-input__inner {
  height: 30px;
  line-height: 30px;
}
</style>