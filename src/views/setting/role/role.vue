<template>
  <div class="role_container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.Keyword"
        placeholder="名称/显示名/规范名/描述"
        style="width: 200px;"
        class="filter-item"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search">查找</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >添加</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column label="名称" prop="name" align="center">
        <template slot-scope="scope">
          <span
            style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap"
          >{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="显示名" prop="displayName" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.displayName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="规范名" align="center" prop="normalizedName">
        <template slot-scope="scope">
          <span>{{ scope.row.normalizedName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="描述" prop="description" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
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

    <div class="add">
      <el-dialog
        v-if="dialogStatus==='create'"
        title="创建新角色"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="角色详情" name="first">
              <el-form-item label="角色名：" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="显示名：" prop="displayName">
                <el-input v-model="ruleForm.displayName"></el-input>
              </el-form-item>

              <el-form-item label="规范名：" prop="normalizedName">
                <el-input v-model="ruleForm.normalizedName"></el-input>
              </el-form-item>

              <el-form-item label="描述：" prop="description">
                <el-input v-model="ruleForm.description"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="角色权限" name="second">
              <el-form-item style="text-align: left !important;height:280px" prop="permissions">
                <el-checkbox-group v-model="ruleForm.permissions">
                  <el-checkbox
                    :label="permission.name"
                    v-for="permission in permissionList"
                    :key="permission.name"
                  >{{permission.displayName}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="createData();dialogFormVisible = false">确定</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="edite">
      <el-dialog
        v-if="dialogStatus==='update'"
        title="修改角色"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="角色详情" name="first">
              <el-form-item label="角色名：" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="显示名：" prop="displayName">
                <el-input v-model="ruleForm.displayName"></el-input>
              </el-form-item>

              <el-form-item label="规范名：" prop="normalizedName">
                <el-input v-model="ruleForm.normalizedName"></el-input>
              </el-form-item>

              <el-form-item label="描述：" prop="description">
                <el-input v-model="ruleForm.description"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="角色权限" name="second">
              <el-form-item style="text-align: left !important;height:280px" prop="permissions">
                <el-checkbox-group v-model="ruleForm.permissions">
                  <el-checkbox
                    :label="permission.name"
                    v-for="permission in permissionList"
                    :key="permission.name"
                  >{{permission.displayName}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="updateData();dialogFormVisible = false">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getAllRole,
  createRole,
  getRole,
  updateRole,
  deleteRole,
  searchRole,
  GetPermissions
} from "@/api/role";
import axios from "axios";
import Cookies from "js-cookie";
import Pagination from "@/components/Pagination"; // secondary

export default {
  name:"role",
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      page: 1,
      listQuery: {
        SkipCount: 0,
        MaxResultCount: 10,
        Keyword: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      activeName: "first",
      ruleForm: {
        name: "",
        displayName: "",
        description: "",
        normalizedName: "",
        permissions: []
      },
      rules: {
        name: [
          { required: true, message: "必填项", trigger: "blur" },
          { min: 0, max: 32, message: "长度在0~32个字符之间", trigger: "blur" }
        ],
        displayName: [
          { required: true, message: "必填项", trigger: "blur" },
          { min: 0, max: 64, message: "长度在0~64个字符之间", trigger: "blur" }
        ],
        description: [
          {
            min: 0,
            max: 5000,
            message: "长度在0~5000个字符之间",
            trigger: "blur"
          }
        ]
      },
      roleid: "",
      permissionList: null,
      activeName: "first"
    };
  },
  created() {
    this.getList();
    this.GetAllPermissions();
  },
  methods: {
    handleClick(tab, event) {},
    GetAllPermissions() {
      GetPermissions().then(response => {
        this.permissionList = response.result.items;
      });
    },
    getList(value) {
      if (value) {
        this.page = value.page;
        this.listQuery.SkipCount = (value.page - 1) * 10;
      }
      this.listLoading = false;
      let token = Cookies.get("Token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      getAllRole(this.listQuery).then(response => {
        this.list = response.result.items;
        this.total = response.result.totalCount;
      });
    },
    handleCreate() {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields(); // this.$refs.adduserform.resetFields();
      });
      this.ruleForm = {
        name: "",
        displayName: "",
        description: "",
        normalizedName: "",
        permissions: []
      };
    },
    createData() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let token = Cookies.get("Token");
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          createRole(this.ruleForm).then(response => {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.getList();
          });
        }
      });
    },
    handleUpdate(index, row) {
      this.roleid = row.id;
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.getUpdateRole(this.roleid);
    },
    getUpdateRole(roleid) {
      if (this.roleid) {
        getRole(this.roleid).then(response => {
          this.ruleForm = response.result;
        });
      }
    },
    updateData() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          updateRole(this.ruleForm).then(() => {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.getList();
          });
        }
      });
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
          deleteRole(str)
            .then(() => {
              this.getList();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },

    search() {
      searchRole(this.listQuery).then(response => {
        this.list = response.result.items;
      });
    }
  }
};
</script>
<style lang="scss">
.role_container {
  padding: 20px;

  .el-dialog__header {
    border-bottom: 1px solid #e8eaec;
    padding: 14px 16px;
    line-height: 1;
  }

  .el-dialog__title {
    display: block;
    height: 25px;
    font-size: 14px;
    font-weight: 600;
  }

  .el-main {
    line-height: 0 !important;
  }

  .is-active {
    background: #ffffff !important;
  }

  .el-form-item__label {
    font-size: 12px;
    text-align: right;
  }

  .el-input__inner {
    line-height: 30px;
    height: 30px;
  }

  .el-dialog__body {
    padding-top: 10px;
  }

  .el-dialog {
    width: 38%;
  }

  .el-form-item__content {
    margin-left: 0 !important;
  }

  .el-form-item__label {
    text-align: left;
    line-height: 30px;
  }

  .el-tabs__header {
    margin: 0;
  }

  .el-form-item {
    margin: 0;
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

  .pagination-container {
    width: 70%;
  }
}
</style>