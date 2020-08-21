<template>
  <div class="add_warehouse">
    <div class="AddWarehouse">
      <el-dialog
        :title="dialogw.title"
        :visible.sync="dialogw.show"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
      >
        <el-form
          :model="WarehouseForm"
          :rules="rules"
          ref="WarehouseForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="仓库名称：" prop="name">
            <el-input v-model="WarehouseForm.name"></el-input>
            <br />
          </el-form-item>
          <el-form-item label="仓库地址：" prop="address">
            <el-input v-model="WarehouseForm.address"></el-input>
            <br />
          </el-form-item>
          <el-form-item label="联系人:" prop="contacts">
            <el-input v-model="WarehouseForm.contacts"></el-input>
            <br />
          </el-form-item>
          <el-form-item label="联系电话:" prop="phoneNo">
            <el-input v-model="WarehouseForm.phoneNo"></el-input>
            <br />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogw.show = false">取消</el-button>
          <el-button type="primary" @click="AddWarehouse()">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { GetAllCode } from "../../api/base";
import { WarehouseCreate } from "../../api/Importorder";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  props: {
    dialogw: Object,
    WarehouseForm: Object
  },
  name: "createWarehouse",
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "必填项", trigger: "blur" },
          { max: 20, message: "长度不能超过20个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "必填项", trigger: "blur" },
          { max: 200, message: "长度不能超过200个字符", trigger: "blur" }
        ],
        contacts: [
          { required: true, message: "必填项", trigger: "blur" },
          { max: 20, message: "长度不能超过20个字符", trigger: "blur" }
        ],
        phoneNo: [
          { required: true, message: "必填项", trigger: "blur" },
          { max: 50, message: "长度不能超过50个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    AddWarehouse(WarehouseForm) {
      this.$nextTick(() => {
        this.$refs["WarehouseForm"].clearValidate();
      });
      let name = localStorage.getItem("tenantName");
      let id = localStorage.getItem("tenantId");
      this.$refs["WarehouseForm"].validate(valid => {
        if (valid) {
          let token = Cookies.get("Token");
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          WarehouseCreate({ warehouse: this.WarehouseForm }).then(response => {
            this.dialogw.show = false;
            // 自动刷新所添加的内容
            this.$emit("update");
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 20px;
}

.el-input {
  width: 70%;
}
</style>
<style lang="scss">
.AddWarehouse {
  .el-dialog {
    width: 33%;
  }

  .el-dialog__title {
    font-weight: 600;
  }

  .el-dialog__header {
    padding: 10px 0 0 30px;
  }

  .el-dialog__body {
    padding: 20px;
  }

  label.el-form-item__label {
    font-size: 12px;
    width: 90px !important;
  }
}
</style>