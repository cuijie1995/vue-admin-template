<template>
  <div class="customer_container">
    <div class="filter-container">
      <!-- <el-input
        v-model="listQuery.Keyword"
        placeholder="中文名称/名称缩写"
        style="width: 200px;"
        class="filter-item"
      />

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="search">查找</el-button>-->
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >添加</el-button>
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
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column type="selection" width="40" align="center"></el-table-column>
      <el-table-column label="中文名称" prop="clientNameCn：" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.clientNameCn }}</span>
        </template>
      </el-table-column>

      <el-table-column label="英文名称" prop="clientNameEn" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.clientNameEn }}</span>
        </template>
      </el-table-column>

      <el-table-column label="名称缩写" align="center" prop="abbreviation">
        <template slot-scope="scope">
          <span>{{ scope.row.abbreviation }}</span>
        </template>
      </el-table-column>

      <el-table-column label="国内地址" align="center" prop="addressCn">
        <template slot-scope="scope">
          <span>{{ scope.row.addressCn }}</span>
        </template>
      </el-table-column>

      <el-table-column label="传真号" align="center" prop="faxNo">
        <template slot-scope="scope">
          <span>{{ scope.row.faxNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="办事处" align="center" prop="registered0ffice">
        <template slot-scope="scope">
          <span>{{ scope.row.registered0ffice }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="page"
      :limit.sync="listQuery.MaxResultCount"
      @pagination="getList"
    />

    <CreateCustomer :dialogCus="dialogCus" :customerForm="customerForm" @update="getList"></CreateCustomer>
  </div>
</template>

<script>
import {
  getEndCustomer,
  CreateOrUpdateEndCustomer,
  deleteEndCustomer,
  BatchDeleteEndCustomer,
  getUpdate
} from "../../../api/base";
import axios from "axios";
import Cookies from "js-cookie";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary
import { stringify } from "querystring";
import CreateCustomer from "./createCustomer";

export default {
  name: "customer",
  components: { Pagination, CreateCustomer },
  directives: { waves },
  data() {
    return {
      dialogCus: {
        show: false,
        title: "",
        option: "create"
      },
      value: "",
      list: null,
      total: 0,
      listLoading: false,
      page: 1,
      listQuery: {
        SkipCount: 0,
        MaxResultCount: 10,
        Keyword: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      customerForm: {
        id: "",
        clientNameCn: "",
        clientNameEn: "",
        abbreviation: "",
        addressCn: "",
        addressEn: "",
        phoneNo: "",
        faxNo: "",
        registered0ffice: "",
        remark: ""
      },
      rules: {
        clientNameCn: [{ required: true, message: "必填项", trigger: "blur" }],
        abbreviation: [{ required: true, message: "必填项", trigger: "blur" }],
        phoneNo: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      customerid: ""
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(value) {
      if (value) {
        this.page = value.page;
        this.listQuery.SkipCount = (value.page - 1) * 10;
      }
      this.listLoading = false;
      let token = Cookies.get("Token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      getEndCustomer(this.listQuery).then(response => {
        this.list = response.result.items;
        this.total = response.result.totalCount;
      });
    },
    handleCreate() {
      this.dialogCus = {
        show: true,
        title: "新增终端用户",
        option: "create"
      };
      this.customerForm = {
        clientNameCn: "",
        clientNameEn: "",
        abbreviation: "",
        addressCn: "",
        addressEn: "",
        phoneNo: "",
        faxNo: "",
        registered0ffice: "",
        remark: ""
      };
    },
    handleUpdate(index, row) {
      this.dialogCus = {
        show: true,
        title: "修改终端用户",
        option: "update"
      };

      this.customerid = row.id;
      this.getCustomerUpadate(this.customerid);
    },
    getCustomerUpadate(customerid) {
      if (this.customerid) {
        getUpdate(this.customerid).then(response => {
          this.customerForm = response.result.endCustomer;
        });
      } else {
      }
    },
    deleteRow(index, row) {
      let str = row.id;
      let token = Cookies.get("Token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

      this.$confirm("确认删除吗？？？", "提示", {
        confirmButtonText: "取消",
        confirmButtonText: "确定"
      })
        .then(() => {
          deleteEndCustomer(str)
            .then(() => {
              this.getList();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
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
          BatchDeleteEndCustomer(JSON.stringify(arr))
            .then(response => {
              this.getList();
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
    // search() {
    //   getEndCustomer(this.listQuery).then(response => {
    //     console.log(response)
    //     this.list = response.result.items;
    //   });
    // }
  }
};
</script>
<style lang="scss">
.customer_container {
  padding: 20px;
  // .el-input__inner {
  //   line-height: 30px !important;
  //   height: 30px !important;
  // }

  // .add .el-form-item__content {
  //   line-height: 0.5;
  // }

  // .add .el-form-item__label {
  //   font-size: 8px;
  //   line-height: 30px;
  //   margin-bottom: 8px;
  // }

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
}
</style>
<style scoped>
</style>