<template>
  <div class="user_container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.Keyword"
        placeholder="用户名/姓/名称......"
        style="width: 200px;"
        class="filter-item"
      />

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="search">查找</el-button>
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
      <el-table-column label="用户名" prop="userName" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="邮箱" prop="emailAddress" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.emailAddress }}</span>
        </template>
      </el-table-column>

      <el-table-column label="名称" align="center" width="150px" prop="name">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="姓氏" align="center" width="120px" prop="surname">
        <template slot-scope="scope">
          <span>{{ scope.row.surname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否启用" align="center" width="80px" prop="isActive">
        <template slot-scope="scope">
          <span>{{ scope.row.isActive }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="180px"
      >
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

    <div class="adduser">
      <el-dialog
        v-if="dialogStatus==='create'"
        title="增加用户"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
      >
        <el-form
          :model="userForm"
          :rules="rules"
          ref="userForm"
          label-width="81px"
          class="demo-ruleForm"
        >
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户信息" name="first">
              <el-form-item label="用户名：" prop="userName">
                <el-input v-model="userForm.userName"></el-input>
              </el-form-item>
              <el-form-item label="名称：" prop="name">
                <el-input v-model="userForm.name"></el-input>
              </el-form-item>
              <el-form-item label="姓氏：" prop="surname">
                <el-input v-model="userForm.surname"></el-input>
              </el-form-item>
              <el-form-item label="邮箱：" prop="emailAddress">
                <el-input v-model="userForm.emailAddress"></el-input>
              </el-form-item>
              <el-form-item label="密码：" prop="password">
                <el-input v-model="userForm.password" show-password></el-input>
              </el-form-item>
              <el-form-item label="确认密码：" prop="confirmPassword">
                <el-input v-model="userForm.confirmPassword" show-password></el-input>
              </el-form-item>
              <el-form-item style="text-align: left !important;">
                <el-checkbox v-model="userForm.isActive">是否启用</el-checkbox>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="用户角色" name="second">
              <el-form-item style="text-align: left !important;height:259px">
                <el-checkbox-group v-model="userForm.roleNames">
                  <el-checkbox
                    :label="role.normalizedName"
                    v-for="role in roleLists"
                    :key="role.id"
                  >{{role.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="dialogStatus==='create'?createData():updateData();dialogFormVisible = false"
          >确定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="updateuser">
      <el-dialog
        v-if="dialogStatus==='update'"
        title="修改用户信息"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
      >
        <el-form
          :model="userForm"
          :rules="rules"
          ref="userForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户信息" name="first">
              <el-form-item label="用户名：" prop="userName">
                <br />
                <el-input v-model="userForm.userName"></el-input>
              </el-form-item>
              <el-form-item label="名称：" prop="name">
                <br />
                <el-input v-model="userForm.name"></el-input>
              </el-form-item>
              <el-form-item label="姓氏：" prop="surname">
                <br />
                <el-input v-model="userForm.surname"></el-input>
              </el-form-item>
              <el-form-item label="邮箱：" prop="emailAddress">
                <br />
                <el-input v-model="userForm.emailAddress"></el-input>
              </el-form-item>
              <el-form-item style="text-align: left !important;">
                <el-checkbox v-model="userForm.isActive">是否启用</el-checkbox>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="用户角色" name="second">
              <el-form-item style="text-align: left !important;height:299px">
                <el-checkbox-group v-model="userForm.roleNames">
                  <el-checkbox
                    :label="role.normalizedName"
                    v-for="role in roleLists"
                    :key="role.id"
                  >{{role.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="dialogStatus==='create'?createData():updateData();dialogFormVisible = false"
          >确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getAllUser,
  createUser,
  getUpdateUser,
  updateUser,
  deleteUser,
  searchUser,
  GetRoles
} from "@/api/user";
import axios from "axios";
import Cookies from "js-cookie";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary

export default {
  name: "user",
  components: { Pagination },
  directives: { waves },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.userForm.confirmPassword !== "") {
          this.$refs.userForm.validateField("confirmPassword");
        }
        callback();
      }
    };
    let validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userForm.password) {
        callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      list: null,
      total: 0,
      listLoading: true,
      page: 1,
      listQuery: {
        SkipCount: 0,
        MaxResultCount: 10,
        IsActive: null,
        Keyword: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      activeName: "first",
      userForm: {
        userName: "",
        name: "",
        surname: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
        IsActive: false,
        roleNames: []
      },
      rules: {
        userName: [
          { required: true, message: "必填项", trigger: "blur" },
          {
            min: 0,
            max: 256,
            message: "长度在0~256个字符之间",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "必填项", trigger: "blur" },
          { min: 0, max: 64, message: "长度在0~64个字符之间", trigger: "blur" }
        ],
        surname: [
          { required: true, message: "必填项", trigger: "blur" },
          { min: 0, max: 64, message: "长度在0~64个字符之间", trigger: "blur" }
        ],
        emailAddress: [
          { required: true, message: "必填项", trigger: "blur" },
          {
            type: "email",
            message: "不符合邮箱格式",
            trigger: ["blur", "change"]
          },
          {
            min: 0,
            max: 256,
            message: "长度在0~256个字符之间",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "必填项", trigger: "blur" },
          { min: 0, max: 32, message: "长度在0~32个字符之间", trigger: "blur" },
          { validator: validatePass }
        ],
        confirmPassword: [{ validator: validateConfirmPass }]
      },
      userid: "",
      roleLists: []
    };
  },
  created() {
    this.getList();
    this.getAllRoles();
  },
  methods: {
    handleClick(tab, event) {},
    getAllRoles() {
      GetRoles().then(response => {
        this.roleLists = response.result.items;
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
      getAllUser(this.listQuery).then(response => {
        this.list = response.result.items;
        this.total = response.result.totalCount;
      });
    },
    handleCreate() {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["userForm"].resetFields(); // this.$refs.adduserform.resetFields();
      });
      this.userForm = {
        userName: "",
        name: "",
        surname: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
        IsActive: false,
        roleNames: []
      };
    },
    createData() {
      this.$refs["userForm"].validate(valid => {
        if (valid) {
          let token = Cookies.get("Token");
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          createUser(this.userForm).then(response => {
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
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.userid = row.id;
      this.getUpdate(this.userid);
    },
    getUpdate(userid) {
      if (this.userid) {
        getUpdateUser(this.userid).then(response => {
          this.userForm = response.result;
        });
      } else {
      }
    },
    updateData() {
      this.$refs["userForm"].validate(valid => {
        if (valid) {
          updateUser(this.userForm).then(() => {
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
          deleteUser(str)
            .then(() => {
              this.getList();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    search() {
      searchUser(this.listQuery).then(response => {
        console.log(response);
        this.list = response.result.items;
      });
    }
  }
};
</script>
<style lang="scss">
.user_container {
  padding: 20px;
}
.user_container .adduser {
  .el-dialog__header {
    border-bottom: 1px solid #e8eaec;
    padding: 14px 16px;
    line-height: 1;
    font-size: 14px;
    font-weight: 600;
  }

  .el-main {
    line-height: 0 !important;
  }

  .is-active {
    background: #ffffff !important;
  }

  .el-form-item {
    margin-bottom: 0;
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
    padding-bottom: 0 !important;
  }

  .el-dialog {
    width: 35%;
  }

  .el-form-item__content {
    line-height: 0.5;
  }

  .el-form-item__label {
    text-align: right;
    font-size: 10px;
  }
}

.user_container .updateuser {
  .el-dialog__header {
    border-bottom: 1px solid #e8eaec;
    padding: 14px 16px;
    line-height: 1;
    font-size: 14px;
    font-weight: 600;
  }

  .el-main {
    line-height: 0 !important;
  }

  .is-active {
    background: #ffffff !important;
  }

  .el-form-item {
    margin-bottom: 0;
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
    padding-bottom: 0 !important;
  }

  .el-dialog {
    width: 35%;
  }

  .el-form-item__content {
    margin-left: 0 !important;
    line-height: 0.5;
  }

  .el-form-item__label {
    text-align: left;
    font-size: 10px;
  }
}

.user_container .filter-container {
  margin-bottom: 10px;

  .el-button {
    padding: 7px 15px !important;
  }

  .el-input__inner {
    height: 30px !important;
    line-height: 30px !important;
  }
}
</style>