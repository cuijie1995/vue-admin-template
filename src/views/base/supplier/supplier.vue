<template>
  <div class="supplier_container">
    <div class="filter-container">
      <!-- <el-input
        v-model="Keyword"
        placeholder="供应商名称"
        style="width: 200px;"
        class="filter-item"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="search">查找</el-button>-->
      <!-- <router-link to="/create-update-supplier"> -->
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="add()"
      >添加</el-button>
      <!-- </router-link> -->

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
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="供应商名称" prop="name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="英文名称" align="center" prop="engName">
        <template slot-scope="scope">
          <span>{{ scope.row.engName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="简称" prop="abbreviation" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.abbreviation }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系人" align="center" prop="contacts">
        <template slot-scope="scope">
          <span>{{ scope.row.contacts }}</span>
        </template>
      </el-table-column>

      <el-table-column label="电话" align="center" prop="phoneNumber">
        <template slot-scope="scope">
          <span>{{ scope.row.phoneNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
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
  </div>
</template>

<script>
import {
  getSupplier,
  deleteSupplier,
  BatchDeleteSupplier,
  searchSupplier
} from "@/api/base";
import axios from "axios";
import Cookies from "js-cookie";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary

export default {
  components: { Pagination },
  directives: { waves },
  name: "supplier",
  data() {
    return {
      supplierid: "",
      list: null,
      total: 0,
      listLoading: true,
      Keyword: "",
      page: 1,
      listQuery: {
        SkipCount: 0,
        MaxResultCount: 10
      },
      tenantName: "",
      tenantId: "",
      supplier: "",
      multipleSelection: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(value) {
      if (value) {
        this.listQuery.page = value.page;
        this.listQuery.SkipCount = (value.page - 1) * 10;
      }
      this.listLoading = true;
      let token = Cookies.get("Token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      getSupplier(this.listQuery).then(response => {
        this.list = response.result.items;
        this.total = response.result.totalCount;
        this.listLoading = false;
      });
    },
    add() {
      this.$router.push({ path: "/createsupplier" });
    },
    handleUpdate(index, row) {
      sessionStorage.setItem("supplierid", row.id);
      this.$router.push({ path: "/updatesupplier" });
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
          deleteSupplier(str)
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
          BatchDeleteSupplier(JSON.stringify(arr)).then(response => {
            this.getList();
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss">
.supplier_container {
  padding: 20px;
  .el-form-item__label {
    font-size: 12px;
    text-align: right;
  }

  .el-input__inner {
    line-height: 30px;
    height: 30px;
  }

  .el-form-item {
    margin-bottom: 10px;
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
}
</style>