<template>
  <div class="create_supperlier">
    <div class="top">
      <div class="title">
        <h3>添加供应商信息</h3>
      </div>
      <el-button type="primary" @click="back()">返回</el-button>
    </div>
    <div class="create">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <el-form :model="form" ref="form" :rules="rules">
            <el-row>
              <el-col :span="8">
                <el-form-item label="名称:" :label-width="formLabelWidth" prop="name">
                  <el-input v-model="form.name" autocomplete="off" placeholder="供应商名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="地址:" :label-width="formLabelWidth" prop="address">
                  <el-input v-model="form.address" autocomplete="off" placeholder="供应商地址"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="简称:" :label-width="formLabelWidth" prop="abbreviation">
                  <el-input v-model="form.abbreviation" autocomplete="off" placeholder="供应商简称"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="英文名称:" :label-width="formLabelWidth" prop="engName">
                  <el-input v-model="form.engName" autocomplete="off" placeholder="供应商英文名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人:" :label-width="formLabelWidth" prop="contacts">
                  <el-input v-model="form.contacts" autocomplete="off" placeholder="供应商联系人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电话号码:" :label-width="formLabelWidth" prop="phoneNumber">
                  <el-input v-model="form.phoneNumber" autocomplete="off" placeholder="联系人电话"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item >
                <el-button size="small" class="add_bank" @click="add(editableTabsValue)">添加银行信息</el-button>
                <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
                  <el-tab-pane
                    v-for="(item,index) in form.banks"
                    :label="'银行信息'+ (index)"
                    :key="item.name"
                    :name="item.name"
                  >
                    <el-form :model="item" ref="item">
                      <div class="content">
                        <el-row>
                          <el-col :span="8">
                            <el-form-item label="收款人:" :label-width="formLabelWidth" prop="payee">
                              <el-input v-model="item.payee" autocomplete="off" placeholder="收款人"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item
                              label="银行名称:"
                              :label-width="formLabelWidth"
                              prop="bankName"
                            >
                              <el-input
                                v-model="item.bankName"
                                autocomplete="off"
                                placeholder="银行名称"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item
                              label="银行账户:"
                              :label-width="formLabelWidth"
                              prop="bankAccount"
                            >
                              <el-input
                                v-model="item.bankAccount"
                                autocomplete="off"
                                placeholder="银行账户"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>

                        <el-row>
                          <el-col :span="8">
                            <el-form-item
                              label="银行地址:"
                              :label-width="formLabelWidth"
                              prop="bankAddress"
                            >
                              <el-input
                                v-model="item.bankAddress"
                                autocomplete="off"
                                placeholder="银行地址"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="币制:" :label-width="formLabelWidth" prop="currency">
                              <el-select
                                v-model="item.currency"
                                filterable
                                placeholder="请选择币别"
                                default-first-option
                              >
                                <el-option
                                  v-for="(codeData,index) in codeDatas1"
                                  :key="index"
                                  :label="codeData.codeDataName"
                                  :value="codeData.codeDataID"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item
                              label="swiftCode:"
                              :label-width="formLabelWidth"
                              prop="swiftCode"
                            >
                              <el-input v-model="item.swiftCode" autocomplete="off"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>

                        <el-row>
                          <el-col :span="8">
                            <el-form-item label="iBan:" :label-width="formLabelWidth" prop="iBan">
                              <el-input v-model="item.iBan" autocomplete="off" placeholder="iBan"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="aba:" :label-width="formLabelWidth" prop="aba">
                              <el-input v-model="item.aba" autocomplete="off" placeholder="aba"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item
                              label="bankCode:"
                              :label-width="formLabelWidth"
                              prop="bankCode"
                            >
                              <el-input
                                v-model="item.bankCode"
                                autocomplete="off"
                                placeholder="bankCode"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                    </el-form>
                  </el-tab-pane>
                </el-tabs>
              </el-form-item>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="footer">
        <el-button @click="back">取消</el-button>
        <el-button type="primary" @click="createorupdateData()">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  createorupdateSupplier,
  GetForEdit,
  GetAllCode,
  getCodeDetail
} from "@/api/base";
import axios from "axios";
import Cookies from "js-cookie";
export default {
  name: "createSupplier",
  data() {
    return {
      supplierid: "",
      activeName: "first",
      form: {
        name: "",
        engName: "",
        abbreviation: "",
        address: "",
        contacts: "",
        phoneNumber: "",
        banks: [
          {
            payee: "",
            bankName: "",
            bankAccount: "",
            bankAddress: "",
            swiftCode: "",
            currency: "",
            iBan: "",
            aba: "",
            bankCode: ""
          }
        ]
      },
      tabIndex: 1,
      formLabelWidth: "80px",
      editableTabsValue: "0",
      tenantName: "",
      tenantId: "",
      supplier: "",
      codeDatas1: [],
      codes: [],
      rules: {
        name: [{ required: true, message: "必填项", trigger: "blur" }],
        address: [{ required: true, message: "必填项", trigger: "blur" }],
        abbreviation: [{ required: true, message: "必填项", trigger: "blur" }],
        phoneNumber: [{ message: "请输入手机号码", trigger: "blur" }]
      },
      arr: null
    };
  },
  mounted() {
    GetAllCode()
      .then(response => {
        this.codes = response.result;
        this.codes.forEach(val => {
          let codeID = val.codeID;
          if (codeID === "Code_Currency") {
            getCodeDetail({ CodeTypeId: codeID })
              .then(response => {
                this.codeDatas1 = response.result.codeDatas;
              })
              .catch(() => {});
          }
        });
      })
      .catch(() => {});
  },
  methods: {
    handleClick(tab, event) {},
    add(targetName) {
      let newTabName = this.tabIndex++ + "";
      this.form.banks.push({
        name: newTabName,
        payee: "",
        bankName: "",
        bankAccount: "",
        bankAddress: "",
        swiftCode: "",
        currency: "",
        iBan: "",
        aba: "",
        bankCode: ""
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.form.banks;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.$confirm("确认删除此信息吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.editableTabsValue = activeName;

          this.form.banks = tabs.filter(tab => tab.name !== targetName);
        })
        .catch(() => {});
    },
    createorupdateData() {
      let name = localStorage.getItem("tenantName");
      let id = localStorage.getItem("tenantId");
      this.$refs["form"].validate(valid => {
        if (name) {
          let token = Cookies.get("Token");
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          createorupdateSupplier({ supplier: this.form }).then(response => {
            this.$message({
              message: "供应商添加成功",
              type: "success"
            });
            this.$router.go(-1);
          });
        }
      });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style  scoped>
.create_supperlier {
  width: 80%;
  margin: 0 auto;
}

.footer {
  text-align: center;
  margin-top: 40px;
}

.title {
  display: inline-block;
  width: 80%;
  text-align: center;
  margin-left: 5%;
}

.el-form-item {
  margin-bottom: 0;
}

.top {
  margin-top: 30px;
}

.top .el-button {
  line-height: 0.5;
}
</style>
<style lang="scss">
.create_supperlier {
  .el-form-item__label {
    font-size: 12px;
    font-weight: 500;
  }

  .el-tabs__content {
    overflow: inherit;
    position: relative;
    margin-top: 15px;
  }

  .el-input__inner {
    height: 30px;
    line-height: 30px;
  }
  #tab-0,
  div#pane-0 {
    display: none;
  }

  div#tab-first,.add_bank{
    font-weight: 700;
  }
}
</style>