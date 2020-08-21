<template>
  <div class="order">
    <div class="filter-container">
      <el-input
        v-model="listQuery.Keyword"
        placeholder="关键字"
        style="width: 200px;"
        class="filter-item"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="search">查找</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-delete"
        @click="BatchDelete"
      >批量删除</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="orderLists"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="币制" prop="currency" align="center" width="70">
        <template slot-scope="scope">
          <span>{{ scope.row.currency }}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户订单号" prop="clientOrderNo" align="center" width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.clientOrderNo }}</span>
        </template>
      </el-table-column>

      <el-table-column label="业务类型" align="center" prop="businessType" width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.businessType }}</span>
        </template>
      </el-table-column>

      <el-table-column label="供应商" align="center" prop="orderSupplier.name" width="150">
        <template slot-scope="scope">
          <span v-if=" scope.row.orderSupplier  ">{{ scope.row.orderSupplier.name }}</span>
          <span v-else>无</span>
        </template>
      </el-table-column>

      <el-table-column label="订单状态" align="center" prop="status" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.status | formatstatus }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注" align="center" prop="remark">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        prop="status"
        width="250"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.status == '1'">
            <el-button size="mini" type="primary" @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="success" @click="handleClick(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
          </div>
          <div v-if="scope.row.status == '2'">
            <el-button size="mini" type="success" @click="handleClick(scope.$index, scope.row)">查看</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,20, 30, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="currentTotal"
    ></el-pagination>
  </div>
</template>
<script>
import { GetAllCode } from "@/api/base";
import {
  getOrderMaster,
  deleteOrderMaster,
  BatchDeleteOrderMaster
} from "@/api/orderlist";
import axios from "axios";
import Cookies from "js-cookie";
import Pagination from "@/components/Pagination";

import waves from "@/directive/waves";
export default {
  filters: {
    formatstatus(str) {
      switch (str) {
        case "1":
          return "已保存";
          break;
        case "2":
          return "已提交";
          break;
        default:
          return "已保存";
      }
    }
  },
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      currentTotal: 0,
      orderid: "",
      orderLists: [
        // orderSupplier: {
        //   abbreviation: "",
        //   name: "",
        //   engName: "",
        //   address: "",
        //   contacts: "",
        //   phoneNumber: ""
        // }
      ],
      listLoading: true,
      listQuery: {
        SkipCount: 0,
        MaxResultCount: 10,
        Keyword: ""
      },
      multipleSelection: [],
      businessType: "",
      status: ""
    };
  },
  mounted() {
    this.getOrder();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //  获得订单列表
    getOrder() {
      this.listLoading = false;
      let token = Cookies.get("Token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      getOrderMaster().then(response => {
        this.orderLists = response.result.items;
        this.currentTotal = this.orderLists.length;
        this.orderLists.forEach(val => {
          this.status = val.status;
        });
      });
    },
    // 订单列表的删除
    deleteRow(index, row) {
      let str = row.id;
      let token = Cookies.get("Token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      this.$confirm("确认删除吗？？？", "提示", {
        confirmButtonText: "取消",
        confirmButtonText: "确定"
      })
        .then(() => {
          deleteOrderMaster(str)
            .then(() => {
              this.getOrder();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    // 订单列表的批量删除
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    BatchDelete() {
      let arr = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        arr.push(this.multipleSelection[i].id);
      }
      this.$confirm("确认批量删除吗？？？", "提示", {
        confirmButtonText: "取消",
        confirmButtonText: "确定"
      })
        .then(() => {
          BatchDeleteOrderMaster(JSON.stringify(arr)).then(response => {
            this.getOrder();
          });
        })
        .catch(() => {});
    },
    search() {},
    handleUpdate(index, row) {
      sessionStorage.setItem("orderid", row.id);
      localStorage.setItem("status", row.status);
      this.businessType = row.businessType;
      if (this.businessType == "出口") {
        this.$router.push({ path: "exportorder" });
      }
      if (this.businessType == "进口") {
        this.$router.push({ path: "importorder" });
      }
      if (this.businessType == "香港本地交货") {
        this.$router.push({ path: "hongkongorder" });
      }
      if (this.businessType == "境内本地交货") {
        this.$router.push({ path: "localorder" });
      }
    },
    handleClick(index, row) {
      sessionStorage.setItem("orderid", row.id);
      localStorage.setItem("status", row.status);
      localStorage.setItem("businessType", row.businessType);
      let num = 6;
      localStorage.setItem("num", num);

      this.$router.push({ path: "see" });
    }
  }
};
</script>

<style scoped lang="scss">
.order {
  margin: 20px;
}

.filter-container {
  margin-bottom: 10px;

  .el-button {
    padding: 7px 15px !important;
  }

  .el-input__inner {
    height: 30px !important;
    line-height: 30px !important;
  }
}
.el-button {
  padding: 9px 18px;
}
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
<style>
.order th.el-table_2_column_14.is-right.small-padding.fixed-width.is-leaf {
  text-align: center;
}
</style>