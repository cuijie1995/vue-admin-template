<template>
  <div class="add_product">
    <div class="AddProduct">
      <el-dialog
        :title="dialog.title"
        :visible.sync="dialog.show"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
      >
        <el-form
          :model="ProductForm"
          :rules="rules"
          ref="ProductForm"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="型号：" prop="specification">
            <el-input v-model="ProductForm.specification"></el-input>
          </el-form-item>
          <el-form-item label="名称：" prop="productName">
            <el-input v-model="ProductForm.productName"></el-input>
          </el-form-item>
          <el-form-item label="品牌：" prop="brand">
            <el-input v-model="ProductForm.brand"></el-input>
          </el-form-item>
          <el-form-item label="产地：" prop="origin">
            <el-select
              v-model="ProductForm.origin"
              filterable
              placeholder="请选择产地"
              default-first-option
            >
              <el-option
                v-for="(codeData,index) in codeDatas2"
                :key="index"
                :label="codeData.codeDataName"
                :value="codeData.codeDataID"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物料编号：" prop="materialNumber">
            <el-input v-model="ProductForm.materialNumber"></el-input>
          </el-form-item>
          <el-form-item label="描述：" prop="specRemark">
            <el-input type="textarea" v-model="ProductForm.specRemark"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog.show = false">取消</el-button>
          <el-button type="primary" @click="AddProduct()">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { GetAllCode, getCodeDetail } from "../../api/base";
import { MaterialPoolCreate } from "../../api/Importorder";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  props: {
    dialog: Object,
    ProductForm: Object
  },
  name: "createProduct",
  data() {
    return {
      codeDatas2: null,
      codes: [],
      rules: {
        // 添加物料
        specification: [
          { required: true, message: "必填项", trigger: "blur" },
          { max: 255, message: "长度不能超过255个字符", trigger: "blur" }
        ],
        productName: [
          { required: true, message: "必填项", trigger: "blur" },
          { max: 255, message: "长度不能超过255个字符", trigger: "blur" }
        ],
        brand: [
          { required: true, message: "必填项", trigger: "blur" },
          {
            min: 1,
            max: 255,
            message: "长度在1~255个字符之间",
            trigger: "blur"
          }
        ],
        origin: [
          {
            min: 1,
            max: 255,
            message: "长度在1~255个字符之间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    // 获得代码表
    GetAllCode()
      .then(response => {
        this.codes = response.result;
        this.codes.forEach(val => {
          let codeID = val.codeID;
          if (codeID === "Code_Origin") {
            getCodeDetail({ CodeTypeId: codeID })
              .then(response => {
                this.codeDatas2 = response.result.codeDatas;
              })
              .catch(() => {});
          }
        });
      })
      .catch(data => {});
  },
  methods: {
    AddProduct(ProductForm) {
      this.$nextTick(() => {
        this.$refs["ProductForm"].clearValidate(); // this.$refs.adduserform.resetFields();
      });
      this.$refs["ProductForm"].validate(valid => {
        if (valid) {
          let token = Cookies.get("Token");
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          MaterialPoolCreate({ materialPool: this.ProductForm }).then(
            response => {
              this.dialog.show = false;
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
.el-select,
.el-textarea {
  width: 90%;
}
</style>
<style lang="scss">
.AddProduct {
  .el-dialog {
    width: 33%;
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
    width: 80px !important;
  }
}
</style>