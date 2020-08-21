<template>
  <div class="add_customer">
    <div class="AddCustomer">
      <el-dialog
        :title="dialogCus.title"
        :visible.sync="dialogCus.show"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        :before-colse="closeDialog"
      >
        <el-form
          :model="customerForm"
          :rules="rules"
          ref="customerForm"
          label-width="90px"
          class="demo-ruleForm"
        >
          <el-form-item label="中文名称：" prop="clientNameCn">
            <el-input v-model="customerForm.clientNameCn"></el-input>
          </el-form-item>
          <el-form-item label="英文名称：" prop="clientNameEn">
            <el-input v-model="customerForm.clientNameEn"></el-input>
          </el-form-item>
          <el-form-item label="名称缩写：" prop="abbreviation">
            <el-input v-model="customerForm.abbreviation"></el-input>
          </el-form-item>

          <el-form-item label="国内地址：" prop="addressCn">
            <el-input v-model="customerForm.addressCn"></el-input>
          </el-form-item>

          <el-form-item label="国外地址：" prop="addressEn">
            <el-input v-model="customerForm.addressEn"></el-input>
          </el-form-item>

          <el-row>
            <el-col :span="12">
              <el-form-item label="联系电话：" prop="phoneNo">
                <el-input style="width: 100%;" v-model="customerForm.phoneNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="传真号：" prop="faxNo">
                <el-input style="width: 100%;" v-model="customerForm.faxNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="办事处：" prop="registered0ffice">
            <el-input v-model="customerForm.registered0ffice"></el-input>
          </el-form-item>
          <el-form-item label="描述：" prop="remark">
            <el-input type="textarea" v-model="customerForm.remark"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogCus.show = false">取消</el-button>
          <el-button type="primary" @click="createData()">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { CreateOrUpdateEndCustomer } from "../../../api/base";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  props: {
    dialogCus: Object,
    customerForm: Object
  },
  name: "createCustomer",
  data() {
    return {
      rules: {
        clientNameCn: [{ required: true, message: "必填项", trigger: "blur" }],
        abbreviation: [{ required: true, message: "必填项", trigger: "blur" }],
        phoneNo: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    createData(customerForm) {
      this.$nextTick(() => {
        this.$refs["customerForm"].clearValidate();
      });
      this.$refs["customerForm"].validate(valid => {
        if (valid) {
          let token = Cookies.get("Token");
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          CreateOrUpdateEndCustomer({ endCustomer: this.customerForm }).then(
            response => {
              this.$message({
                message: "成功",
                type: "success"
              });

              this.dialogCus.show = false;
              this.$emit("update");
            }
          );
        }
      });
    },
    closeDialog(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
          location.reload();
        })
        .catch(() => {});
    }
  }
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 10px;
}

.el-input,
.el-textarea {
  width: 100%;
}
</style>
  <style lang="scss">
.AddCustomer {
  .el-dialog {
    width: 38%;
  }
  .el-dialog__title {
    font-weight: 600;
    font-size: 14px;
  }

  .el-dialog__header {
    border-bottom: 1px solid #e8eaec;
    padding: 14px 16px;
    line-height: 1;
  }

  .el-dialog__body {
    padding: 10px 20px 20px 20px;
  }

  label.el-form-item__label {
    font-size: 12px;
    width: 90px !important;
    font-weight: 500;
  }
}
</style>