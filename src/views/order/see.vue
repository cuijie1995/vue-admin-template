<template>
  <div class="see">
    <div style="text-align: right" v-if=" businessType == '进口' ">
      <h2 style="display: inline-block; margin-right: 40%;">进口订单详情</h2>
      <el-button type="success" @click="back()" style="margin-left: 10%;">返回</el-button>
    </div>
    <div style="text-align: right" v-if=" businessType == '出口' ">
      <h2 style="display: inline-block; margin-right: 40%;">出口订单详情</h2>
      <el-button type="success" @click="back()" style="margin-left: 10%;">返回</el-button>
    </div>
    <div style="text-align: right" v-if=" businessType == '香港本地交货' ">
      <h2 style="display: inline-block; margin-right: 40%;">香港订单详情</h2>
      <el-button type="success" @click="back()" style="margin-left: 10%;">返回</el-button>
    </div>
    <div style="text-align: right" v-if=" businessType == '境内本地交货' ">
      <h2 style="display: inline-block; margin-right: 40%;">境内订单详情</h2>
      <el-button type="success" @click="back()" style="margin-left: 10%;">返回</el-button>
    </div>
    <div class="one">
      <div style="margin-bottom: 5px;">
        <el-row style="padding-left: 2%;">
          <el-col :span="1">
            <i class="el-icon-folder"></i>
          </el-col>
          <el-col :span="3" style=" margin-top: 2px;">
            <p sort="title" class="title">订单</p>
          </el-col>
        </el-row>
      </div>
      <div class="form">
        <el-row>
          <el-col :span="10">
            <el-row>
              <el-col :span="5" style="padding-left: 12px;">
                <span>币别：</span>
              </el-col>
              <el-col :span="17">{{order.currency}}</el-col>
            </el-row>
          </el-col>
          <el-col :span="10">
            <el-row>
              <el-col :span="6">
                <span>客户订单号：</span>
              </el-col>
              <el-col :span="17">{{order.clientOrderNo}}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <div>
          <el-row>
            <el-col :span="2">
              <span>供应商：</span>
            </el-col>
            <el-col :span="17">{{order.orderSupplierName}}</el-col>
          </el-row>
        </div>
        <div v-if=" businessType == '出口' ">
          <el-row>
            <el-col :span="2">
              <span>终端客户：</span>
            </el-col>
            <el-col :span="17">{{order.endCustomerName}}</el-col>
          </el-row>
        </div>

        <div>
          <el-row>
            <el-col :span="2" style="padding-left: 12px;">
              <span>备注：</span>
            </el-col>
            <el-col :span="17">{{order.remark}}</el-col>
          </el-row>
        </div>
      </div>
    </div>

    <div class="two">
      <div style="  margin-bottom: 5px;">
        <el-row style="padding-left: 2%;">
          <el-col :span="1">
            <i class="el-icon-folder-opened"></i>
          </el-col>
          <el-col :span="3" style=" margin-top: 2px;">
            <p sort="title" class="title">订单详情</p>
          </el-col>
        </el-row>
      </div>
      <div class="seeProduct">
        <el-table :data="order.orderDetails" border style="width: 100%">
          <el-table-column fixed prop="spec" label="型号" width="160"></el-table-column>
          <el-table-column fixed prop="productName" label="品名" width="160"></el-table-column>
          <el-table-column prop="brand" label="品牌" width="160"></el-table-column>
          <el-table-column prop="origin" label="产地" width="120px"></el-table-column>
          <el-table-column prop="unit" label="单位" width="110px"></el-table-column>
          <el-table-column prop="quantity" label="数量" width="110px"></el-table-column>
          <el-table-column prop="price" label="单价" width="110px"></el-table-column>
          <el-table-column prop="amount" label="总价" width="110px"></el-table-column>
          <el-table-column prop="boxAmount" label="件数" width="110px"></el-table-column>
          <el-table-column prop="netWeight" label="净重" width="110px"></el-table-column>
          <el-table-column prop="grossWeight" label="毛重" width="110px"></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="three">
      <div style="margin-bottom: 5px;">
        <el-row style="padding-left: 2%;">
          <el-col :span="1">
            <i class="el-icon-document-checked"></i>
          </el-col>
          <el-col :span="3" style=" margin-top: 2px;">
            <p sort="title" class="title">供货商交货方式</p>
          </el-col>
        </el-row>
      </div>

      <div class="select">
        <div>
          <el-row>
            <el-col :span="2">
              <span class="name">送货方式：</span>
            </el-col>
            <el-col :span="17">{{order.mention.mentionName}}</el-col>
          </el-row>
        </div>

        <div class="first" v-if="order.mention.mentionType==='1'">
          <div>
            <el-row>
              <el-col :span="2">
                <span class="name">送货地址：</span>
              </el-col>
              <el-col :span="17">{{order.mention.deliveryAddressName}}</el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :span="2">
                <span class="name">送货时间：</span>
              </el-col>
              <el-col :span="17">{{order.mention.deliveryDete}}</el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :span="2">
                <span class="name">备注：</span>
              </el-col>
              <el-col :span="17">{{order.mention.remark}}</el-col>
            </el-row>
          </div>
        </div>

        <div class="second" v-if="order.mention.mentionType==='2' ">
          <div>
            <el-row>
              <el-col :span="2">
                <span class="name">快递服务商：</span>
              </el-col>
              <el-col :span="17">{{order.mention.courierCompany}}</el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :span="2">
                <span class="name">快递单号：</span>
              </el-col>
              <el-col :span="17">{{order.mention.courierNo}}</el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :span="2">
                <span class="name">备注：</span>
              </el-col>
              <el-col :span="17">{{order.mention.remark}}</el-col>
            </el-row>
          </div>
        </div>

        <div class="three" v-if="order.mention.mentionType==='3'">
          <div>
            <el-row>
              <el-col :span="2">
                <span class="name">提货地址：</span>
              </el-col>
              <el-col :span="17">{{order.mention.deliveryAddressName}}</el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :span="2">
                <span class="name">提货时间：</span>
              </el-col>
              <el-col :span="17">{{order.mention.deliveryDete}}</el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :span="2">
                <span class="name">备注：</span>
              </el-col>
              <el-col :span="17">{{order.mention.remark}}</el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>

    <div class="four">
      <div style="  margin-bottom: 5px;">
        <el-row style="padding-left: 2%;">
          <el-col :span="1">
            <i class="el-icon-document-checked"></i>
          </el-col>
          <el-col :span="3" style=" margin-top: 2px;">
            <p sort="title" class="title">客户收货方式</p>
          </el-col>
        </el-row>
      </div>

      <div class="select">
        <div>
          <el-row>
            <el-col :span="2">
              <span class="name">收货方式：</span>
            </el-col>
            <el-col :span="17">{{order.delivery.mentionName}}</el-col>
          </el-row>
        </div>

        <div class="first" v-if="order.delivery.mentionType==='1'">
          <div>
            <el-row>
              <el-col :span="2">
                <span class="name">提货仓库：</span>
              </el-col>
              <el-col :span="17">{{order.delivery.warehouseName}}</el-col>
            </el-row>
          </div>

          <el-row>
            <el-col :span="8">
              <div>
                <el-row>
                  <el-col :span="7">
                    <span class="name">提货人姓名：</span>
                  </el-col>
                  <el-col :span="17">{{order.delivery.consignorName}}</el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-row>
                  <el-col :span="6">
                    <span class="name">身份证：</span>
                  </el-col>
                  <el-col :span="17">{{order.delivery.consignorCardNo}}</el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div>
                <el-row>
                  <el-col :span="7">
                    <span class="name">提货人电话：</span>
                  </el-col>
                  <el-col :span="17">{{order.delivery.consignorPhoneNo}}</el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-row>
                  <el-col :span="6">
                    <span class="name">提货时间：</span>
                  </el-col>
                  <el-col :span="17">{{order.delivery.deliveryDete}}</el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <div>
            <el-row>
              <el-col :span="7">
                <span class="name">备注：</span>
              </el-col>
              <el-col :span="17">{{order.delivery.remark}}</el-col>
            </el-row>
          </div>
        </div>

        <div class="second" v-if="order.delivery.mentionType==='2'">
          <div>
            <el-row>
              <el-col :span="7">
                <span class="name">送货时间：</span>
              </el-col>
              <el-col :span="17">{{order.delivery.deliveryDete}}</el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :span="7">
                <span class="name">送货地址：</span>
              </el-col>
              <el-col :span="17">{{order.delivery.deliveryAddressName}}</el-col>
            </el-row>
          </div>

          <el-row>
            <el-col :span="8">
              <div>
                <el-row>
                  <el-col :span="7">
                    <span class="name">联系人：</span>
                  </el-col>
                  <el-col :span="17">{{order.delivery.consignorName}}</el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-row>
                  <el-col :span="7">
                    <span class="name">联系电话：</span>
                  </el-col>
                  <el-col :span="17">{{order.delivery.consignorPhoneNo}}</el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <div>
            <el-row>
              <el-col :span="7">
                <span class="name">备注：</span>
              </el-col>
              <el-col :span="17">{{order.delivery.remark}}</el-col>
            </el-row>
          </div>
        </div>

        <div class="three" v-if="order.delivery.mentionType==='3'">
          <div>
            <el-row>
              <el-col :span="7">
                <span class="name">送货时间：</span>
              </el-col>
              <el-col :span="17">{{order.delivery.deliveryDete}}</el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :span="7">
                <span class="name">送货地址：</span>
              </el-col>
              <el-col :span="17">{{order.delivery.deliveryAddressName}}</el-col>
            </el-row>
          </div>

          <el-row>
            <el-col :span="8">
              <div>
                <el-row>
                  <el-col :span="7">
                    <span class="name">联系人：</span>
                  </el-col>
                  <el-col :span="17">{{order.delivery.consignorName}}</el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-row>
                  <el-col :span="7">
                    <span class="name">联系电话：</span>
                  </el-col>
                  <el-col :span="17">{{order.delivery.consignorPhoneNo}}</el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <div>
            <el-row>
              <el-col :span="7">
                <span class="name">备注：</span>
              </el-col>
              <el-col :span="17">{{order.delivery.remark}}</el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>

    <div class="five">
      <div style="  margin-bottom: 5px;">
        <el-row style="padding-left: 2%;">
          <el-col :span="1">
            <i class="el-icon-folder-add"></i>
          </el-col>
          <el-col :span="3" style=" margin-top: 2px;">
            <p sort="title" class="title">附件资料</p>
          </el-col>
        </el-row>
      </div>
      <div class="selects">
        <h3 class="up">供应商发票</h3>
        <el-table ref="multipleTable" :data="EnclosureList" border style="width: 40%">
          <el-table-column label="文件名称" align="center" prop="enclosureName">
            <template slot-scope="scope">
              <span @click="downLoad(scope.$index, scope.row)" class="download_name">
                {{ scope.row.enclosureName }}
                <span class="download">点击下载查看</span>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import {
  GetAllCode,
  getCodeDetail,
  GetById,
  ByIdEndCustomer
} from "../../api/base";
import {
  importorder,
  WarehouseId,
  UploadIForm,
  GetEnclosuresByKey,
  ForEdit,
  ByIdAddress,
  ByIdWarehouse,
  DownLoadEnclosure
} from "../../api/Importorder";
import { GetForEdit } from "@/api/orderlist";
import axios from "axios";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      readonly: true,
      EnclosureList: null,
      codeDatas1: [],
      codeDatas5: [],
      codeDatas2: [],
      codeDatas3: [],
      codeDatas7: [],
      codes: [],
      value: "",
      // 第一部分表单
      order: {
        id: "",
        currency: "",
        clientOrderNo: "",
        orderSupplierId: "",
        orderSupplierName: "",
        endCustomerId: "",
        endCustomerName: "",
        remark: "",
        orderDetails: [
          {
            spec: "",
            productName: "",
            brand: "",
            unit: "",
            quantity: "",
            price: "",
            amount: "",
            boxAmount: "",
            netWeight: "",
            grossWeight: "",
            origin: "",
            materialNo: ""
          }
        ],
        mention: {
          mentionType: "",
          mentionName: "",
          deliveryAddressId: "",
          deliveryAddressName: "",
          deliveryDete: "",
          courierCompany: "",
          courierNo: "",
          warehouseId: "",
          warehouseName: "",
          address: "",
          remark: ""
        },
        delivery: {
          mentionType: "",
          mentionName: "",
          warehouseId: "",
          warehouseName: "",
          consignorName: "",
          consignorCardNo: "",
          consignorPhoneNo: "",
          deliveryDete: "",
          courierCompany: "",
          Settlement: "",
          transtype: "",
          deliveryAddressId: "",
          deliveryAddressName: "",
          remark: ""
        },
        status: "",
        fileList: []
      },
      textarea: "",
      orderid: "",
      num: "",
      click: "",
      listLoading: false,
      multipleSelection: [],
      businessType: ""
    };
  },
  mounted() {
    // this.order.businessType = "进口";
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
          if (codeID === "Code_Currency") {
            getCodeDetail({ CodeTypeId: codeID })
              .then(response => {
                this.codeDatas1 = response.result.codeDatas;
              })
              .catch(() => {});
          }
          if (codeID === "Code_Origin") {
            getCodeDetail({ CodeTypeId: codeID })
              .then(response => {
                this.codeDatas2 = response.result.codeDatas;
              })
              .catch(() => {});
          }
          if (codeID === "Code_Unit") {
            getCodeDetail({ CodeTypeId: codeID })
              .then(response => {
                this.codeDatas5 = response.result.codeDatas;
              })
              .catch(() => {});
          }
          if (codeID === "Code_DeliveryType") {
            getCodeDetail({ CodeTypeId: codeID })
              .then(response => {
                this.codeDatas7 = response.result.codeDatas;
              })
              .catch(() => {});
          }
          if (codeID === "Code_MentionType") {
            getCodeDetail({ CodeTypeId: codeID })
              .then(response => {
                this.codeDatas3 = response.result.codeDatas;
              })
              .catch(() => {});
          }
        });
      })
      .catch(() => {});
    this.getOrderEdit();
  },
  methods: {
    // 修改时获取到相对应的id
    getOrderEdit() {
      this.orderid = sessionStorage.getItem("orderid");

      if (this.orderid) {
        GetForEdit(this.orderid).then(response => {
          this.order = response.result.orderMaster;
          this.businessType = this.order.businessType;
          let deliveryId =
            response.result.orderMaster.delivery.deliveryAddressId;
          let mentionId = response.result.orderMaster.mention.deliveryAddressId;
          let warehouseId1 = response.result.orderMaster.delivery.warehouseId;
          let warehouseId2 = response.result.orderMaster.mention.warehouseId;
          if (
            response.result.orderMaster.orderSupplierId !=
            "00000000-0000-0000-0000-000000000000"
          ) {
            GetById(response.result.orderMaster.orderSupplierId).then(
              response => {
                this.order.orderSupplierName = response.result.name;
              }
            );
          }
          if (deliveryId != "00000000-0000-0000-0000-000000000000") {
            ByIdAddress(deliveryId).then(response => {
              this.order.delivery.deliveryAddressName =
                response.result.detailedAddress;
            });
          }
          if (mentionId != "00000000-0000-0000-0000-000000000000") {
            ByIdAddress(mentionId).then(response => {
              this.order.mention.deliveryAddressName =
                response.result.detailedAddress;
            });
          }
          if (warehouseId1 != "00000000-0000-0000-0000-000000000000") {
            ByIdWarehouse(warehouseId1).then(response => {
              this.order.delivery.warehouseName = response.result.name;
            });
          }
          if (warehouseId2 != "00000000-0000-0000-0000-000000000000") {
            ByIdWarehouse(warehouseId2).then(response => {
              this.order.mention.warehouseName = response.result.name;
            });
          }
          if (
            response.result.orderMaster.endCustomerId !=
            "00000000-0000-0000-0000-000000000000"
          ) {
            ByIdEndCustomer(response.result.orderMaster.endCustomerId).then(
              response => {
                this.order.endCustomerName =
                  response.result.endCustomer.clientNameCn;
              }
            );
          }
          if (response.result.orderMaster.mention.mentionType == "1") {
            this.order.mention.mentionName = "供应商送货";
          }
          if (response.result.orderMaster.mention.mentionType == "2") {
            this.order.mention.mentionName = "物流快递";
          }
          if (response.result.orderMaster.mention.mentionType == "3") {
            this.order.mention.mentionName = "上门提货";
          }
          if (response.result.orderMaster.delivery.mentionType == "1") {
            this.order.delivery.mentionName = "自提";
          }
          if (response.result.orderMaster.delivery.mentionType == "2") {
            this.order.delivery.mentionName = "快递";
          }
          if (response.result.orderMaster.delivery.mentionType == "3") {
            this.order.delivery.mentionName = "专车";
          }
          GetEnclosuresByKey(this.orderid).then(response => {
            this.EnclosureList = response.result;
          });
        });
      } else {
      }
      sessionStorage.removeItem("orderid");
    },
    back() {
      this.$router.go(-1);
    },
    downLoad(index, row) {
      DownLoadEnclosure(row.id).then(response => {
        const url = URL.createObjectURL(response);
        const fileName = row.enclosureName;
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();
        //释放内存
        window.URL.revokeObjectURL(link.href);
      });
    }
  }
};
</script>
<style scoped lang="scss">
.see {
  padding-top: 25px;
}

.title {
  color: #000000;
  font-weight: 800;
  font-size: 16px;
}

i {
  margin-top: 0 !important;
}

.one,
.two,
.three,
.four {
  margin-bottom: 50px;
}

.seeProduct {
  width: 98% !important;
  margin: 0 1% !important;
}

.selects {
  width: 96%;
  padding-left: 5%;
}

.footer {
  text-align: center;
  margin-top: 50px;
}

.up {
  margin-bottom: 10px;
  font-size: 14px;
}

.selects .el-table {
  margin-top: 20px;
}

.one .form {
  margin: 10px;
  padding: 25px;
  padding-left: 75px;
  border: 1px solid rgb(238, 238, 238);
}

.three .select {
  padding: 20px;
  padding-left: 75px;
  border: solid 1px #eee;
  font-size: 12px;
  margin: 0 20px;
}

.four .select {
  padding: 20px;
  padding-left: 75px;
  border: solid 1px #eee;
  font-size: 12px;
  margin: 0 20px;
}

.five .selects {
  padding: 20px;
  border: solid 1px #eee;
  padding-left: 30px;
  font-size: 12px;
  margin: 0 20px 70px 20px;
}
.name {
  font-size: 13px;
  font-weight: 500;
  color: gray;
  padding-right: 10px;
}

.three .el-col.el-col-2 {
  text-align: right;
}
.four .el-col.el-col-6 {
  text-align: right;
}

.download {
  display: none;
  // opacity: 0;
}

.download_name {
  cursor: pointer;
}
.download_name:hover .download {
  display: inline;
  color: red;
  // opacity: 1;
}
</style>
<style lang="scss">
.see {
  .el-table td,
  .el-table th.is-leaf {
    text-align: center;
  }
}
</style>