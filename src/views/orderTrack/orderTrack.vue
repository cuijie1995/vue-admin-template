<template>
  <div class="ordertrack_container">
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
          placeholder="最早下单日期"
          type="date"
          style="width: 150px;"
          class="filter-item"
          value-format="yyyy-MM-dd"
        />
        <el-date-picker
          v-model="listQuery.maxdorderdate"
          placeholder="最晚下单日期"
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
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="订单号" prop=" cordno" align="center" fixed width="115px">
        <template slot-scope="scope">
          <span @click="handleUpdate(scope.$index, scope.row)">{{ scope.row. cordno }}</span>
        </template>
      </el-table-column>

      <el-table-column label="外贸合同号" align="center" prop="ccustorderno" width="155px">
        <template slot-scope="scope">
          <span>{{ scope.row.ccustorderno }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下单日期" prop="dorderdate" align="center" width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.dorderdate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="订单状态" prop="corderstatus" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.corderstatus }}</span>
        </template>
      </el-table-column>

      <el-table-column label="收货状态" align="center" prop="creceivingstatus">
        <template slot-scope="scope">
          <span>{{ scope.row.creceivingstatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报关状态" prop="ccststatus" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ccststatus }}</span>
        </template>
      </el-table-column>

      <el-table-column label="到货状态" prop="csendstatus" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.csendstatus }}</span>
        </template>
      </el-table-column>

      <el-table-column label="结算状态" align="center" prop="cdeledstatus">
        <template slot-scope="scope">
          <span>{{ scope.row.cdeledstatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开票状态" prop="capstatus" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.capstatus }}</span>
        </template>
      </el-table-column>

      <el-table-column label="售票状态" prop="carstatus" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.carstatus }}</span>
        </template>
      </el-table-column>

      <el-table-column label="付款状态" align="center" prop="cfrexchangestatus">
        <template slot-scope="scope">
          <span>{{ scope.row.cfrexchangestatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收款状态" align="center" prop="nmakeinv">
        <template slot-scope="scope">
          <span>{{ scope.row.nmakeinv }}</span>
        </template>
      </el-table-column>
      <el-table-column label="完成情况" prop="nrecinv" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nrecinv }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click.native="handleUpdate(scope.$index, scope.row)"
          >查看</el-button>
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
import waves from "@/directive/waves"; // waves directive
import { GetOrderStatus } from "../../api/erp";
import Pagination from "@/components/Pagination"; // secondary

export default {
  directives: { waves },
  components: { Pagination },

  name: "orderTrack",
  data() {
    return {
      total: 0,
      listQuery: {
        clientId: "",
        resultCount: 10,
        pageIndex: 1,
        cordno: "",
        ccustorderno: "",
        mindorderdate: "",
        maxdorderdate: "",
        corderstatus: ""
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
      GetOrderStatus(this.listQuery).then(response => {
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
      GetOrderStatus(this.listQuery).then(response => {
        this.showCaseTable = response.result;
        this.total = response.totalCount;

        this.listLoading = false;
      });
    },
    handleUpdate(index, row) {
      localStorage.setItem("orderid", row.zR_ORD_MASTEROID);
      this.$router.push("ordertrackdetail");
    }
  }
};
</script>
<style lang="scss" scoped>
.ordertrack_container {
  padding: 20px;
}

.ordertrack_container .search {
  margin-bottom: 10px;
}

.ordertrack_container .el-table {
  font-size: 12px !important;
}

.ordertrack_container .el-input {
  margin-right: 10px;
}
.search_header {
  display: inline;
}
</style>
<style>
.ordertrack_container .search .el-input__inner {
  height: 30px;
  line-height: 30px;
}
</style>