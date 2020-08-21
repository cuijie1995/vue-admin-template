<template>
  <div class="add_customer">
    <div class="AddCustomer">
      <el-dialog
        :title="dialogCusex.title"
        :visible.sync="dialogCusex.show"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        :before-colse="closeDialog"
      >
        <el-form
          :model="customerFormex"
          :rules="rules"
          ref="customerFormex"
          label-width="90px"
          class="demo-ruleForm"
        >
          <el-form-item label="中文名称:" prop="clientNameCn">
            <el-input v-model="customerFormex.clientNameCn"></el-input>
          </el-form-item>
          <el-form-item label="英文名称:" prop="clientNameEn">
            <el-input v-model="customerFormex.clientNameEn"></el-input>
          </el-form-item>
          <el-form-item label="名称缩写:" prop="abbreviation">
            <el-input v-model="customerFormex.abbreviation"></el-input>
          </el-form-item>

          <el-form-item label="国内地址：" prop="addressCn">
            <el-input v-model="customerFormex.addressCn"></el-input>
          </el-form-item>

          <el-form-item label="国外地址：" prop="addressEn">
            <el-input v-model="customerFormex.addressEn"></el-input>
          </el-form-item>

          <el-row>
            <el-col :span="10">
              <el-form-item label="联系电话：" prop="phoneNo">
                <el-input style="width: 56%;" v-model="customerFormex.phoneNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="传真号：" prop="faxNo">
                <el-input style="width: 56%;" v-model="customerFormex.faxNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="办事处：" prop="registered0ffice">
            <el-input v-model="customerFormex.registered0ffice"></el-input>
          </el-form-item>
          <el-form-item label="描述：" prop="remark">
            <el-input type="textarea" v-model="customerFormex.remark"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogCusex.show = false">取消</el-button>
          <el-button type="primary" @click="createData()">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { CreateOrUpdateEndCustomer } from "../../api/base";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  props: {
    dialogCusex: Object,
    customerFormex: Object
  },
  name:"createCustomer",
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
    createData(customerFormex) {
      this.$nextTick(() => {
        this.$refs["customerFormex"].clearValidate();
      });
      this.$refs["customerFormex"].validate(valid => {
        if (valid) {
          let token = Cookies.get("Token");
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          CreateOrUpdateEndCustomer({ endCustomer: this.customerFormex }).then(
            response => {
              this.$message({
                message: "成功",
                type: "success"
              });

              this.dialogCusex.show = false;
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
  width: 70%;
}
</style>
<style lang="scss">
.AddCustomer {
  .el-dialog {
    width: 38%;
  }

  .el-dialog__title {
    font-weight: 600;
  }

  .el-dialog__header {
    padding: 10px 0 0 30px;
  }

  .el-dialog__body {
    padding: 10px 20px 20px 20px;
  }

  label.el-form-item__label {
    font-size: 12px;
    width: 90px !important;
  }
}
</style>