<template>
  <div class="ordertrack_detail">
    <el-row>
      <el-col :span="10">
        <h3>物流详情</h3>
        <div class="block">
          <el-timeline>
            <el-timeline-item
              v-for="(Logistic,index) in this.Logistics"
              :key="index"
              :timestamp="Logistic.ddocdate"
              placement="top"
            >
              <el-card>
                <p>{{Logistic.cdocno}}</p>
                <p>{{Logistic.ctype}}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-col>
      <el-col :span="10">
        <h3>结算详情</h3>
        <div class="block">
          <el-timeline>
            <el-timeline-item
              v-for="(Caoitalflow,index) in this.Caoitalflows"
              :key="index"
              :timestamp="Caoitalflow.ddocdate"
              placement="top"
            >
              <el-card>
                <p>{{Caoitalflow.cdocno}}</p>
                <p>{{Caoitalflow.cordno}}</p>
                <p>{{Caoitalflow.ctype}}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="back()">返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { GetOrderLogistics, GetOrderCaoitalflows } from "../../api/erp";
import axios from "axios";
export default {
  name: "orderTrackDetail",
  data() {
    return {
      Logistics: null,
      Caoitalflows: null
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      let order = localStorage.getItem("orderid");
      let Token = localStorage.getItem("token2");
      axios.defaults.headers.common["Authorization"] = "Bearer " + Token;
      GetOrderLogistics({ OrdOid: order }).then(response => {
        this.Logistics = response;
      });
      GetOrderCaoitalflows({ OrdOid: order }).then(response => {
        this.Caoitalflows = response;
      });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.ordertrack_detail .el-row {
  margin: 40px;
  font-size: 16px;
}
.ordertrack_detail h3 {
  margin-bottom: 15px;
  padding-left: 30px;
}
</style>
<style>
.ordertrack_detail .el-timeline-item__wrapper {
  padding-right: 28px;
}
.ordertrack_detail .el-timeline-item__content,
.ordertrack_detail .el-card.is-always-shadow {
  height: 105px;
}
</style>