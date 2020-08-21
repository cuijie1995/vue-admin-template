<template>
  <div class="main">
    <div class="header">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-row>
              <el-col :span="13">
                <div class="span">
                  <span>可用额度</span>
                  <br />
                  <br />
                  <span>{{syed}}元</span>
                </div>
              </el-col>
              <el-col :span="10">
                <span class="svg-container">
                  <svg-icon icon-class="edu" style="width: 7em;height: 7em;" />
                </span>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-row>
              <el-col :span="13">
                <div class="span">
                  <span>月业务量</span>
                  <br />
                  <br />
                  <span>{{ccustomsamount}}</span>
                </div>
              </el-col>
              <el-col :span="10">
                <span class="svg-container">
                  <svg-icon icon-class="yewuliang" style="width: 7em;height: 7em;" />
                </span>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-row>
              <el-col :span="13">
                <div class="span">
                  <span>订单数量</span>
                  <br />
                  <br />
                  <span>暂存订单：{{saveorder}}条</span>
                  <br />
                  <span>已提交订单：{{suborder}}条</span>
                  <br />
                  <span>已报关：{{cstorder}}条</span>
                </div>
              </el-col>
              <el-col :span="10">
                <span class="svg-container">
                  <svg-icon icon-class="dingdan" style="width: 7em;height: 7em;" />
                </span>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="12">
         
            <el-table :data="rateLists" style="width: 100%;font-size:8px;" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
              <el-table-column prop="ccurrency" label="银行汇率">
                <template slot-scope="scope">
                  <img :src="require('../../assets/images/' + scope.row.ccurrency + '.jpg')" />
                  <span>{{ scope.row.ccurrency }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="nbuysinks" label="现汇卖出价">
                <template slot-scope="scope">
                  <span>{{ scope.row.nbuysinks }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="tratedate" label="汇率时间">
                <template slot-scope="scope">
                  <span>{{ scope.row.tratedate }}</span>
                </template>
              </el-table-column>
            </el-table>
        
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-table :data="CstRateLists" style="width: 100%;font-size:8px" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
              <el-table-column prop="ccurrency" label="海关汇率">
                <template slot-scope="scope">
                  <img :src="require('../../assets/images/' + scope.row.ccurrency + '.jpg')" />
                  <span>{{ scope.row.ccurrency }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="ncustomsrate" label="本月汇率" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.ncustomsrate }}</span>
                </template>
              </el-table-column>
               <el-table-column prop="nmonth" label="月份" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.nmonth }}</span>
                </template>
              </el-table-column>
               <el-table-column prop="nyear" label="年份" align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.nyear }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <Rate></Rate>
        </el-col>
      </el-row>
    </div>
  
  </div>
</template>
<script>
import {
  Getexchangerates,
  GetRateNow,
  GetCstRate,
  GetHomeData
} from "../../api/erp";
import Cookies from "js-cookie";
import axios from "axios";
import Rate from "./rate";


export default {
  components: {
    Rate
  },
  data() {
    return {
      ccustomsamount: "",
      cstorder: "",
      saveorder: "",
      suborder: "",
      syed: "",
      rateLists: [],
      CstRateLists:[]
    };
  },
  mounted() {
    this.getData();
    this.getRate();
    this.getCst();
  },
  methods: {
    getData() {
      let token = localStorage.getItem("token2")
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      let clientId = sessionStorage.getItem("id")
      
      GetHomeData(clientId).then(response => {
        this.ccustomsamount = response.ccustomsamount;
        this.cstorder = response.cstorder;
        this.saveorder = response.saveorder;
        this.suborder = response.suborder;
        this.syed = response.syed;
      });
    },
    getRate() {
      let token = localStorage.getItem("token2")
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      GetRateNow().then(response => {
        this.rateLists = response;
      });
    },
    getCst() {
      GetCstRate().then(response => {
        this.CstRateLists = response;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./BI.css";
</style>