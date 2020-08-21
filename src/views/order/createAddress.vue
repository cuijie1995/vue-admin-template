<template>
  <div class="add_address">
    <div class="AddAddress">
      <el-dialog
        title="新增地址"
        :visible.sync="dialogs.show"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
      >
        <el-form
          :model="AddressForm"
          :rules="rules"
          ref="AddressForm"
          label-width="85px"
          class="demo-ruleForm"
        >
          <el-form-item label="地区：" prop="province">
            <el-select
              v-model="AddressForm.province"
              placeholder="省"
              size="mini"
              filterable
              default-first-option
              @change="getOptions(AddressForm.province,'2')"
            >
              <el-option
                v-for="(item,index) in ProvinceLists"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              v-model="AddressForm.city"
              placeholder="市"
              size="mini"
              filterable
              default-first-option
              @change="getOptions(AddressForm.city,'3')"
            >
              <el-option
                v-for="(item,index) in CityLists"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              v-model="AddressForm.area"
              placeholder="区"
              size="mini"
              filterable
              default-first-option
            >
              <el-option
                v-for="(item,index) in AreaLists"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址：" prop="detailedAddress">
            <el-input v-model="AddressForm.detailedAddress"></el-input>
          </el-form-item>
          <el-form-item label="联系人：" prop="contacts">
            <el-input v-model="AddressForm.contacts"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="phoneNo">
            <el-input v-model="AddressForm.phoneNo"></el-input>
          </el-form-item>

          <el-row>
            <el-col :span="15">
              <el-form-item label="收货仓库：" prop="warehouse">
                <el-select
                  v-model="AddressForm.warehouse"
                  placeholder="请选择仓库"
                  filterable
                  default-first-option
                  style="width: 60% !important"
                >
                  <el-option
                    v-for="(item,index) in WarehouseList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" class="el-icon-plus" @click="handleWarehouse()">新增仓库</el-button>
            </el-col>
          </el-row>

          <el-form-item label="收货公司:" prop="company">
            <el-input v-model="AddressForm.company"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogs.show = false">取消</el-button>
          <el-button type="primary" @click="AddAddress()">保存</el-button>
        </div>
      </el-dialog>
    </div>
    <CreateWarehouse :dialogw="dialogw" :WarehouseForm="WarehouseForm" @update="getWareHouse"></CreateWarehouse>
  </div>
</template>
<script>
import { GetAllCode } from "../../api/base";
import {
  DeliveryAddressCreate,
  region,
  WarehouseId
} from "../../api/Importorder";
import axios from "axios";
import Cookies from "js-cookie";

import CreateWarehouse from "./createWarehouse";

export default {
  name: "createAddress",
  props: {
    dialogs: Object,
    AddressForm: Object
  },
  components: {
    CreateWarehouse
  },
  data() {
    return {
      value: "",
      tenantName: "",
      tenantId: "",
      dialogFormVisible: false,
      rules: {
        // 新添地址
        province: [{ required: true, message: "必填项", trigger: "blur" }],
        city: [{ required: true, message: "必填项", trigger: "blur" }],
        area: [{ required: true, message: "必填项", trigger: "blur" }],
        detailedAddress: [
          { required: true, message: "必填项", trigger: "blur" }
        ],
        contacts: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      ProvinceLists: [],
      CityLists: [],
      AreaLists: [],
      WarehouseList: [],
      WarehouseForm: {
        name: "",
        address: "",
        contacts: "",
        phoneNo: ""
      },
      dialogw: {
        show: false,
        title: "",
        option: "create"
      }
    };
  },
  mounted() {
    this.getOptions("", "1");
    this.getWareHouse();
  },
  methods: {
    // 省市区联动
    getOptions(optid, type) {
      let token = Cookies.get("Token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      region(optid)
        .then(response => {
          if (type === "1") {
            this.ProvinceLists = response.result.options;
          } else if (type === "2") {
            this.CityLists = response.result.options;
          } else {
            this.AreaLists = response.result.options;
          }
        })
        .catch(() => {});
    },

    // 新增仓库
    handleWarehouse() {
      this.dialogw = {
        show: true,
        title: "新增仓库",
        option: "create"
      };
      this.WarehouseForm = {
        name: "",
        address: "",
        contacts: "",
        phoneNo: ""
      };
    },
    // 获的仓库
    getWareHouse() {
      WarehouseId({
        SkipCount: 0,
        MaxResultCount: 500,
        Sorting: "",
        FilterText: ""
      }).then(response => {
        this.WarehouseList = response.result.items;
      });
    },
    AddAddress(AddressForm) {
      this.$nextTick(() => {
        this.$refs["AddressForm"].clearValidate();
      });
      this.$refs["AddressForm"].validate(valid => {
        if (valid) {
          let token = Cookies.get("Token");
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          DeliveryAddressCreate({ deliveryAddress: this.AddressForm }).then(
            response => {
              this.dialogs.show = false;
              // 自动刷新所添加的内容
              this.$emit("update");
            }
          );
        }
      });
    }
  }
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 0px;
}

.el-input,
.el-textarea {
  width: 90%;
}

.el-select {
  width: 76% !important;
}

.el-select.el-select--mini {
  width: 23% !important;
}
</style>
<style lang="scss">
.AddAddress {
  .el-dialog {
    width: 38%;
  }

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

  .el-dialog__body {
    padding: 10px 20px 20px 20px;
  }

  label.el-form-item__label {
    font-size: 12px;
    width: 90px !important;
  }
}
</style>