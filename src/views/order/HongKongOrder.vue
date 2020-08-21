<template>
  <div class="hongkongorder_content">
    <div v-if="orderid" class="title" style="text-align: right;padding-right: 10%;">
      <el-button type="success" @click="back()">返回</el-button>
    </div>

    <div class="one">
      <div style="margin-bottom: 5px;">
        <el-row style="padding-left: 2%;">
          <el-col :span="1">
            <i class="el-icon-folder"></i>
          </el-col>
          <el-col :span="3" style=" margin-top: 2px;">
            <p sort="title" class="title">香港订单</p>
          </el-col>
        </el-row>
      </div>
      <div class="form">
        <el-form
          :model="order"
          :rules="rules"
          ref="order"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="币别：" prop="currency">
                <el-select
                  v-model="order.currency"
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
            <el-col :span="12">
              <el-form-item label="客户订单号：" prop="clientOrderNo">
                <el-input v-model="order.clientOrderNo" placeholder="请输入客户订单号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item label="供应商：" prop="orderSupplierId">
                <el-select
                  v-model="order.orderSupplierId"
                  filterable
                  placeholder="请选择供应商"
                  default-first-option
                >
                  <el-option
                    v-for="(item,index) in list"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="3">
              <el-button type="primary" class="el-icon-plus" @click="handleSupplier">新增供应商</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" v-model="order.remark" placeholder="请输入内容" autosize></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
          <el-col :span="20" style=" text-align: right; padding-right: 20px">
            <el-button type="primary" class="el-icon-plus" @click="handleProduct()">新增产品</el-button>
            <el-button type="warning" @click="Download">下载模板</el-button>

            <el-upload
              class="upload-demo"
              action="2222"
              :multiple="true"
              :auto-upload="false"
              :before-upload="doUploads"
              :on-change="Upload"
              name="file"
              :file-list="listFile"
              :show-file-list="false"
            >
              <el-button size="small" type="primary">导入模板</el-button>
            </el-upload>
          </el-col>
        </el-row>
      </div>
      <div class="showProduct">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-table :data="order.orderDetails" border style="width: 100%">
              <el-table-column fixed prop="spec" label="型号" width="160">
                <template slot-scope="{row,$index}">
                  <el-popover width="400" trigger="click">
                    <el-input placeholder="请输入型号" slot="reference" v-model="row.spec"></el-input>
                    <el-table
                      :data="ProductLists"
                      id="table"
                      @row-click="(row,column,event)=>{pooltableclick(row,column,event,$index)}"
                    >
                      <el-table-column width="80" prop="productName" label="名称"></el-table-column>
                      <el-table-column width="80" prop="materialNumber" label="料号"></el-table-column>
                      <el-table-column width="80" prop="specification" label="规格"></el-table-column>
                      <el-table-column width="80" prop="brand" label="品牌"></el-table-column>
                      <el-table-column width="80" prop="origin" label="产地"></el-table-column>
                    </el-table>

                    <pagination
                      v-show="Ptotal>0"
                      :total="Ptotal"
                      :page.sync="page"
                      :limit.sync="listQuery.MaxResultCount"
                      @pagination="getProduct"
                    />
                  </el-popover>
                </template>
              </el-table-column>

              <el-table-column fixed prop="productName" label="品名" width="160">
                <template slot-scope="{row,$index}">
                  <el-popover width="400" trigger="click">
                    <el-input placeholder="请输入名称" slot="reference" v-model="row.productName"></el-input>
                    <el-table
                      :data="ProductLists"
                      id="table"
                      @row-click="(row,column,event)=>{pooltableclick(row,column,event,$index)}"
                    >
                      <el-table-column width="80" prop="productName" label="名称"></el-table-column>
                      <el-table-column width="80" prop="materialNumber" label="料号"></el-table-column>
                      <el-table-column width="80" prop="specification" label="规格"></el-table-column>
                      <el-table-column width="80" prop="brand" label="品牌"></el-table-column>
                      <el-table-column width="80" prop="origin" label="产地"></el-table-column>
                    </el-table>

                    <pagination
                      v-show="Ptotal>0"
                      :total="Ptotal"
                      :page.sync="page"
                      :limit.sync="listQuery.MaxResultCount"
                      @pagination="getProduct"
                    />
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="brand" label="品牌" width="160">
                <template slot-scope="{row,$index}">
                  <el-popover width="400" trigger="click">
                    <el-input placeholder="请输入品牌" slot="reference" v-model="row.brand"></el-input>
                    <el-table
                      :data="ProductLists"
                      id="table"
                      @row-click="(row,column,event)=>{pooltableclick(row,column,event,$index)}"
                    >
                      <el-table-column width="80" prop="productName" label="名称"></el-table-column>
                      <el-table-column width="80" prop="materialNumber" label="料号"></el-table-column>
                      <el-table-column width="80" prop="specification" label="规格"></el-table-column>
                      <el-table-column width="80" prop="brand" label="品牌"></el-table-column>
                      <el-table-column width="80" prop="origin" label="产地"></el-table-column>
                    </el-table>

                    <pagination
                      v-show="Ptotal>0"
                      :total="Ptotal"
                      :page.sync="page"
                      :limit.sync="listQuery.MaxResultCount"
                      @pagination="getProduct"
                    />
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="origin" label="产地" width="120px">
                <template slot-scope="{row}">
                  <el-select
                    v-model="row.origin"
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
                </template>
              </el-table-column>
              <el-table-column prop="unit" label="单位" width="110px">
                <template slot-scope="{row}">
                  <el-select v-model="row.unit" filterable placeholder="请选择单位" default-first-option>
                    <el-option
                      v-for="(codeData,index) in codeDatas5"
                      :key="index"
                      :label="codeData.codeDataName"
                      :value="codeData.codeDataID"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="quantity" label="数量" width="110px">
                <template slot-scope="{row,$index}">
                  <el-input
                    placeholder="请输入"
                    v-model="row.quantity"
                    @change="(value)=>{quantity(value,$index)}"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="单价" width="110px">
                <template slot-scope="{row,$index}">
                  <el-input
                    placeholder="请输入"
                    v-model="row.price"
                    @change="(value)=>{pricechange(value,$index)}"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="总价" width="110px">
                <template slot-scope="{row,$index}">
                  <el-input
                    placeholder="请输入"
                    v-model="row.amount"
                    @change="filter(scope.$index,$event)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="boxAmount" label="件数" width="110px">
                <template slot-scope="{row}">
                  <el-input placeholder="请输入" v-model="row.boxAmount"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="netWeight" label="净重" width="110px">
                <template slot-scope="{row}">
                  <el-input placeholder="请输入" v-model="row.netWeight"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="grossWeight" label="毛重" width="110px">
                <template slot-scope="{row}">
                  <el-input placeholder="请输入" v-model="row.grossWeight"></el-input>
                </template>
              </el-table-column>

              <el-table-column fixed="right" label="操作" width="60px">
                <template slot-scope="scope">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    @click="deleteRow(scope.$index, order.orderDetails)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-button type="primary" style="margin-top: 15px;margin-left: 20px;" @click="addRow">增加一行</el-button>
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
        <el-form ref="SupplierForm" :model="order.mention" :rules="rules" label-width="85px">
          <el-row>
            <el-col :span="10">
              <el-form-item label="送货方式:" prop="mentionType">
                <el-select v-model="order.mention.mentionType" placeholder="请选择送货方式">
                  <el-option
                    v-for="(codeData,index) in codeDatas3"
                    :key="index"
                    :label="codeData.codeDataName"
                    :value="codeData.codeDataID"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <div class="first" v-if="order.mention.mentionType==='1'">
            <el-row>
              <el-col :span="10">
                <el-form-item label="送货地址:" prop="deliveryAddressId">
                  <el-select
                    v-model="order.mention.deliveryAddressId"
                    filterable
                    placeholder="请选择地址"
                    default-first-option
                  >
                    <el-option
                      v-for="(item,index) in AddressList"
                      :key="index"
                      :label="item.detailedAddress"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4" style="margin-left: 10px;margin-top:0;height:40px">
                <el-button type="primary" class="el-icon-plus" @click="handleAdress">新建地址</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="送货时间:" prop="deliveryDete">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="order.mention.deliveryDete"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="备注:" prop="remark">
                  <el-input
                    type="textarea"
                    v-model="order.mention.remark"
                    autosize
                    placeholder="请输入备注"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <div class="second" v-if="order.mention.mentionType==='2' ">
            <el-row>
              <el-col :span="10">
                <el-form-item label="快递服务商:" prop="courierCompany">
                  <el-input v-model="order.mention.courierCompany" placeholder="请输入快递服务商"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="快递单号:" prop="courierNo">
                  <el-input v-model="order.mention.courierNo" placeholder="请输入快递单号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="备注:" prop="remark">
                  <el-input
                    type="textarea"
                    v-model="order.mention.remark"
                    autosize
                    placeholder="请输入备注"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <div class="third" v-if="order.mention.mentionType==='3'">
            <el-row>
              <el-col :span="10">
                <el-form-item label="提货地址:" prop="deliveryAddressId">
                  <el-select
                    v-model="order.mention.deliveryAddressId"
                    filterable
                    placeholder="请选择地址"
                    default-first-option
                  >
                    <el-option
                      v-for="(item,index) in AddressList"
                      :key="index"
                      :label="item.detailedAddress"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4" style="margin-left: 10px;margin-top:0;height:40px">
                <el-button type="primary" class="el-icon-plus" @click="handleAdress">新建地址</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="提货时间:" prop="deliveryDete">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="order.mention.deliveryDete"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="备注:" prop="remark">
                  <el-input
                    type="textarea"
                    v-model="order.mention.remark"
                    autosize
                    placeholder="请输入备注"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
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
        <el-form ref="CustomerForm" :model="order.delivery" :rules="rules" label-width="85px">
          <el-row>
            <el-col :span="10">
              <el-form-item label="收货方式:" prop="mentionType">
                <el-select v-model="order.delivery.mentionType" placeholder="请选择收货方式">
                  <el-option
                    v-for="(codeData,index) in codeDatas7"
                    :key="index"
                    :label="codeData.codeDataName"
                    :value="codeData.codeDataID"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <div class="first" v-if="order.delivery.mentionType==='1'">
            <el-row>
              <el-col :span="10">
                <el-form-item label="提货仓库:" prop="warehouseId">
                  <el-select
                    v-model="order.delivery.warehouseId"
                    filterable
                    placeholder="请选择地址"
                    default-first-option
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
              <el-col :span="6" style="margin-left: 45px;margin-top:0;height:40px">
                <el-button type="primary" class="el-icon-plus" @click="handleWarehouse()">新增仓库</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="提货人姓名:" prop="consignorName">
                  <el-input v-model="order.delivery.consignorName" placeholder="请输入提货人姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证:" prop="consignorCardNo">
                  <el-input v-model="order.delivery.consignorCardNo" placeholder="请输入身份证"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="提货人电话:" prop="consignorPhoneNo">
                  <el-input v-model="order.delivery.consignorPhoneNo" placeholder="请输入提货人电话"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="提货时间:" prop="deliveryDete">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="order.delivery.deliveryDete"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="备注:" prop="remark">
                  <el-input
                    type="textarea"
                    v-model="order.delivery.remark"
                    autosize
                    placeholder="请输入备注"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <div class="second" v-if="order.delivery.mentionType==='2'">
            <el-row>
              <el-col :span="10">
                <el-form-item label="送货时间:" prop="deliveryDete">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="order.delivery.deliveryDete"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="送货地址:" prop="deliveryAddressId">
                  <el-select
                    v-model="order.delivery.deliveryAddressId"
                    filterable
                    placeholder="请选择地址"
                    default-first-option
                  >
                    <el-option
                      v-for="(item,index) in AddressList"
                      :key="index"
                      :label="item.detailedAddress"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="margin-left: 45px;margin-top:0;height:40px">
                <el-button type="primary" class="el-icon-plus" @click="handleAdress">新建地址</el-button>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="联系人:" prop="consignorName">
                  <el-input v-model="order.delivery.consignorName" placeholder="请输入联系人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话:" prop="consignorPhoneNo">
                  <el-input v-model="order.delivery.consignorPhoneNo" placeholder="请输入联系电话"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="备注:" prop="remark">
                  <el-input
                    type="textarea"
                    v-model="order.delivery.remark"
                    autosize
                    placeholder="请输入备注"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <div class="third" v-if="order.delivery.mentionType==='3'">
            <el-row>
              <el-col :span="10">
                <el-form-item label="送货时间:" prop="deliveryDete">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="order.delivery.deliveryDete"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="送货地址:" prop="deliveryAddressId">
                  <el-select
                    v-model="order.delivery.deliveryAddressId"
                    filterable
                    placeholder="请选择地址"
                    default-first-option
                  >
                    <el-option
                      v-for="(item,index) in AddressList"
                      :key="index"
                      :label="item.detailedAddress"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="margin-left: 45px;margin-top:0;height:40px">
                <el-button type="primary" class="el-icon-plus" @click="handleAdress">新建地址</el-button>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="联系人:" prop="consignorName">
                  <el-input v-model="order.delivery.consignorName" placeholder="请输入联系人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话:" prop="consignorPhoneNo">
                  <el-input v-model="order.delivery.consignorPhoneNo" placeholder="请输入联系电话"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-form-item label="备注:" prop="remark">
                  <el-input
                    type="textarea"
                    v-model="order.delivery.remark"
                    autosize
                    placeholder="请输入备注"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
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
        <div class="up">供应商发票</div>
        <el-upload
          class="upload-demo"
          action="2222"
          :multiple="true"
          :auto-upload="false"
          :before-upload="doUpload"
          :on-change="uploadOk"
          name="file"
          :file-list="order.fileList"
          :show-file-list="false"
        >
          <el-button size="small" type="primary">上传附件</el-button>
        </el-upload>

        <el-table ref="multipleTable" :data="EnclosureList" border style="width: 40%">
          <el-table-column label="文件名称" align="center" prop="enclosureName">
            <template slot-scope="scope">
              <span @click="downLoad(scope.$index, scope.row)" class="download_name">
                {{ scope.row.enclosureName }}
                <span class="download">点击下载查看</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="100"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="delRow(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="footer">
      <el-button icon="el-icon-copy-document" size="small" @click="keep">保存</el-button>
      <el-button type="primary" icon="el-icon-upload2" size="small" @click="submission">提交</el-button>
    </div>
    <CreateProduct :dialog="dialog" :ProductForm="ProductForm" @update="getProduct"></CreateProduct>
    <CreateAddress :dialogs="dialogs" :AddressForm="AddressForm" @update="getAddress"></CreateAddress>
    <CreateWarehouse :dialogw="dialogw" :WarehouseForm="WarehouseForm" @update="getWareHouse"></CreateWarehouse>
    <CreateSupplier :dialogss="dialogss" :form="form" @update="getList"></CreateSupplier>
  </div>
</template>
<script>
import {
  GetAllCode,
  getSupplier,
  getEndCustomer,
  getCodeDetail,
  GetById,
  ByIdEndCustomer
} from "../../api/base";
import {
  Product,
  GetAddress,
  importorder,
  WarehouseId,
  UploadIForm,
  GetEnclosuresByKey,
  ForEdit,
  ByIdAddress,
  ByIdWarehouse,
  DeleteEnclosure,
  DeleteEnclosuresByKey,
  GetOrderTemp,
  UploadOrderList,
  DownLoadEnclosure
} from "../../api/Importorder";
import { GetForEdit } from "@/api/orderlist";
import axios from "axios";
import Cookies from "js-cookie";
import Pagination from "../../components/Pagination/orderPagination";
import CreateProduct from "../order/createProduct";
import CreateAddress from "../order/createAddress";
import CreateWarehouse from "../order/createWarehouse";
import CreateSupplier from "../order/createSupplier";
export default {
  name: "HongKongOrder",
  components: {
    Pagination,
    CreateProduct,
    CreateAddress,
    CreateWarehouse,
    CreateSupplier
  },
  data() {
    return {
      EnclosureList: null,
      EnclosureId: "",
      ProductForm: {
        specification: "",
        productName: "",
        brand: "",
        materialNumber: "",
        specRemark: "",
        origin: ""
      },
      AddressForm: {
        province: "",
        detailedAddress: "",
        contacts: "",
        phoneNo: "",
        company: "",
        warehouse: ""
      },
      WarehouseForm: {
        name: "",
        address: "",
        contacts: "",
        phoneNo: ""
      },
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
      dialog: {
        show: false,
        title: "",
        option: "create"
      },
      dialogs: {
        show: false,
        title: "",
        option: "create"
      },
      dialogw: {
        show: false,
        title: "",
        option: "create"
      },
      dialogss: {
        show: false,
        title: "",
        option: "create"
      },
      codeDatas1: [],
      codeDatas5: [],
      codeDatas2: [],
      codeDatas3: [],
      codeDatas7: [],
      codes: [],
      Ptotal: 0,
      page: 1,
      listQuery: {
        SkipCount: 0,
        MaxResultCount: 10,
        Sorting: "",
        FilterText: ""
      },
      value: "",
      // 第一部分表单
      order: {
        id: "",
        currency: "",
        clientOrderNo: "",
        orderSupplierId: "",
        orderSupplierName: "",
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
      rules: {
        // 进口订单提交
        currency: [{ required: true, message: "必填项", trigger: "blur" }],
        clientOrderNo: [
          { required: true, message: "必填项", trigger: "blur" },
          { min: 5, max: 20, message: "长度在5~20个字符之间", trigger: "blur" }
        ],
        orderSupplierName: [
          { required: true, message: "必填项", trigger: "blur" }
        ],
        businessType: [{ required: true, message: "必填项", trigger: "blur" }],
        orderDetails: [{ required: true, message: "必填项", trigger: "blur" }],
        mentionType: [{ required: true, message: "必填项", trigger: "blur" }],
        currency: [
          { min: 1, max: 5, message: "长度在1~5个字符之间", trigger: "blur" }
        ]
      },
      list: null,
      AddressList: [],
      WarehouseList: [],
      ProductLists: [],
      orderid: "",
      num: "",
      click: "",
      listLoading: false,
      listFile: []
    };
  },
  mounted() {
    this.order.businessType = "香港本地交货";
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
    this.getProduct();
    this.getList();
    this.getAddress();
    this.getWareHouse();
    this.getOrderEdit();
    this.getEdit();
  },
  methods: {
    // 添加供应商
    handleSupplier() {
      this.dialogss = {
        show: true,
        title: "新增供应商",
        option: "create"
      };
      this.form = {
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
      };
    },
    // 获得供应商
    getList() {
      this.listLoading = false;
      let token = Cookies.get("Token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      getSupplier({
        SkipCount: 0,
        MaxResultCount: 500,
        Sorting: "",
        FilterText: ""
      }).then(response => {
        this.list = response.result.items;
      });
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
    // 增加一行
    addRow() {
      this.order.orderDetails.push({
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
        origin: ""
      });
    },
    // 删除一行
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    // 添加产品
    handleProduct(index, row) {
      this.dialog = {
        show: true,
        title: "新增物料",
        option: "create"
      };

      this.ProductForm = {
        specification: "",
        productName: "",
        brand: "",
        materialNumber: "",
        specRemark: "",
        origin: ""
      };
    },
    // 获得添加的产品
    getProduct(value) {
      if (value) {
        this.listQuery.page = value.page;
        this.listQuery.SkipCount = (value.page - 1) * 10;
      }
      this.listLoading = false;
      let token = Cookies.get("Token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      Product(this.listQuery).then(response => {
        this.ProductLists = response.result.items;
        this.Ptotal = response.result.totalCount;
      });
    },
    pooltableclick(row, column, event, index) {
      this.$set(this.order.orderDetails[index], "productName", row.productName);
      this.$set(
        this.order.orderDetails[index],
        "materialNo",
        row.materialNumber
      );
      this.$set(this.order.orderDetails[index], "spec", row.specification);
      this.$set(this.order.orderDetails[index], "brand", row.brand);
      this.$set(this.order.orderDetails[index], "origin", row.origin);
    },
    quantity(value, index) {
      this.$set(
        this.order.orderDetails[index],
        "amount",
        this.order.orderDetails[index].price
          ? (value * this.order.orderDetails[index].price).toFixed(2)
          : 0
      );
    },
    pricechange(value, index) {
      this.$set(
        this.order.orderDetails[index],
        "amount",
        this.order.orderDetails[index].quantity
          ? (value * this.order.orderDetails[index].quantity).toFixed(2)
          : 0
      );
    },
    // 添加地址
    handleAdress() {
      this.dialogs = {
        show: true,
        title: "新增地址",
        option: "create"
      };

      this.AddressForm = {
        province: "",
        detailedAddress: "",
        contacts: "",
        phoneNo: "",
        company: "",
        warehouse: ""
      };
    },
    // 获得添加的地址
    getAddress() {
      this.listLoading = false;
      let token = Cookies.get("Token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      GetAddress({
        SkipCount: 0,
        MaxResultCount: 500,
        Sorting: "",
        FilterText: ""
      }).then(response => {
        this.AddressList = response.result.items;
      });
    },

    getEdit() {
      ForEdit().then(response => {
        this.order.id = response.result.orderMaster.id;
      });
    },
    // 第五部分 上传文件
    doUpload(files) {},
    uploadOk(val) {
      let fd = new FormData();
      fd.append("files", val.raw);
      fd.append("Id", this.order.id);
      UploadIForm(fd).then(response => {
        this.$message({
          message: "文件：" + val.raw.name + "上传成功",
          type: "success"
        });
        this.GetEnclosuresById();
      });
    },
    // 根据订单id查找上传的对应的附件
    GetEnclosuresById() {
      GetEnclosuresByKey(this.order.id).then(response => {
        this.EnclosureList = response.result;
      });
    },
    // 根据附件的id删除附件
    delRow(index, row) {
      this.EnclosureId = row.id;
      DeleteEnclosure(this.EnclosureId).then(response => {
        this.GetEnclosuresById();
      });
    },
    // 模板的下载
    //   GetOrderTemp
    Download() {
      GetOrderTemp().then(response => {
        const url = URL.createObjectURL(response);
        const fileName = "OrderList.xls";
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();
        //释放内存
        window.URL.revokeObjectURL(link.href);
      });
    },
    // 模板的导入
    doUploads(files) {},
    Upload(e) {
      let formData = new FormData();
      formData.append("files", e.raw);
      UploadOrderList(formData).then(response => {
        this.order.orderDetails = response.result;
      });
    },

    // 修改时获取到相对应的id
    getOrderEdit() {
      this.orderid = sessionStorage.getItem("orderid");
      this.num = localStorage.getItem("status");
      this.click = localStorage.getItem("num");
      localStorage.removeItem("num");
      localStorage.removeItem("status");
      if (this.orderid) {
        GetForEdit(this.orderid).then(response => {
          this.order = response.result.orderMaster;
          GetEnclosuresByKey(this.orderid).then(response => {
            this.EnclosureList = response.result;
          });
        });
      } else {
      }
      sessionStorage.removeItem("orderid");
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
    },
    // 添加、修改进口订单列表的提交
    submission() {
      this.$refs["order"].validate(valid => {
        if (valid) {
          let token = Cookies.get("Token");
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          this.order.status = "2";
          importorder({ OrderMaster: this.order }).then(response => {
            this.$message({
              message: "提交成功",
              type: "success"
            });

            this.$router.push("Orderlist");
          });
        }
      });
    },
    // 保存订单
    keep() {
      this.$refs["order"].validate(valid => {
        if (valid) {
          let token = Cookies.get("Token");
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          this.order.status = "1";
          importorder({ OrderMaster: this.order }).then(response => {
            this.$message({
              message: "保存成功",
              type: "success"
            });

            this.$router.push("Orderlist");
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
<style scoped lang="scss">
.hongkongorder_content {
  padding-top: 25px;
}

.hongkongorder_content .title {
  color: #000000;
  font-weight: 800;
  font-size: 16px;
}

.one,
.two,
.three,
.four {
  margin-bottom: 50px;
}

.el-textarea {
  width: 80%;
}
.one {
  .el-input {
    width: 80%;
  }
  .el-select {
    width: 80%;
  }
}
.two .el-table {
  .el-input {
    width: 98%;
  }
  .el-select {
    width: 98%;
  }
}
.three {
  .el-select {
    width: 80%;
  }
  .el-input {
    width: 80%;
  }
  .el-date-editor {
    width: 80%;
  }
  .el-textarea {
    width: 80%;
  }
}

.four {
  .el-select {
    width: 80%;
  }
  .el-input {
    width: 90%;
  }
  .el-date-editor {
    width: 80%;
  }
  .el-textarea {
    width: 80%;
  }
}
.showProduct {
  margin: 0 1%;
}

.el-form-item {
  margin-bottom: 15px !important;
}

.el-input {
  height: 30px;
}

.upload-demo {
  display: inline;
  margin-left: 1%;
}

i {
  margin-top: 0 !important;
}

.selects {
  width: 96%;
  padding-left: 5%;
}

.footer {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
}

.up {
  margin-bottom: 10px;
  font-size: 14px;
}

.selects .el-table {
  margin-top: 20px;
}

.selects ul {
  margin-top: 30px;
  width: 30%;
}

.selects ul li {
  border-bottom: 1px solid black;
}

.one .form {
  margin: 10px;
  padding: 15px;
  border: 1px solid rgb(238, 238, 238);
}

.three .select {
  padding: 20px;
  border: solid 1px #eee;
  padding-left: 30px;
  font-size: 12px;
  margin: 0 20px;
}

.four .select {
  padding: 20px;
  border: solid 1px #eee;
  padding-left: 30px;
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

.el-popover .el-table {
  font-size: 6px;
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
.hongkongorder_content {
  .el-upload-list__item {
    width: 30%;
    border-bottom: solid 1px #eee;
    border-radius: 0;
  }

  .el-form-item__label {
    width: 120px !important;
    line-height: 30px;
    color: #495060;
    font-weight: 500;
  }

  input.el-input__inner {
    height: 30px;
    line-height: 30px;
  }

  .el-table td,
  .el-table th.is-leaf {
    text-align: center !important;
  }

  .one .el-form-item__content,
  .three .el-form-item__content,
  .four .el-form-item__content {
    margin-left: 120px !important;
  }
}

.two,
.three,
.four {
  .el-form-item__content {
    margin-left: 0 !important;
    height: 30px;
    line-height: 30px;
  }
}
</style>