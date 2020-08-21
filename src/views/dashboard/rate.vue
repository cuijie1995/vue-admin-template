<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="美元汇率" name="first">
        <div :id="id" :class="className" :style="{height:height,width:width}" />
      </el-tab-pane>
      <el-tab-pane label="英镑汇率" name="second">
        <Britain></Britain>
      </el-tab-pane>
      <el-tab-pane label="港币汇率" name="third">
        <HongKong></HongKong>
      </el-tab-pane>
      <el-tab-pane label="欧元汇率" name="fourth">
        <Euro></Euro>
      </el-tab-pane>
      <el-tab-pane label="日元汇率" name="fifth">
        <Japan></Japan>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
  import echarts from "echarts";
  import HongKong from "./HongKong";
  import Britain from "./Britain";
  import Euro from "./Euro";
  import Japan from "./Japan";
  import { Getexchangerates } from "../../api/erp";
  import Cookies from "js-cookie";
  import axios from "axios";

  export default {
    components: {
      HongKong,
      Britain,
      Euro,
      Japan
    },
    props: {
      className: {
        type: String,
        default: "chart"
      },
      id: {
        type: String,
        default: "chart"
      },
      width: {
        type: String,
        default: "80%"
      },
      height: {
        type: String,
        default: "400px"
      }
    },
    data() {
      return {
        chart: null,
        activeName: "first",
        arr1: null,
        arr2: null,
        name: "",
        num1: Number,
        num2: Number
      };
    },
    mounted() {
      let str1 = "";
      let str2 = "";
      this.initChart();
      let Token = localStorage.getItem("token2");
      axios.defaults.headers.common["Authorization"] = "Bearer " + Token;
      Getexchangerates().then(response => {
        response.forEach(val => {
          this.name = val.ccurrency;
          if (this.name == "美元") {
            str1 += val.nbuysinks + ",";
            str2 += val.tratedate + ",";


          }
        });
        str1 = str1.substring(0, str1.length - 1);
        str2 = str2.substring(0, str2.length - 1);
        this.arr1 = str1.split(",");
        this.arr2 = str2.split(",");

        let sum = 0;
        for (let i = 0; this.arr1.length > i; i++) {
          sum += this.arr1[i]
        }

        this.num1 = (sum.substring(0, 7) * 1.03).toFixed(1);
        this.num2 = (sum.substring(0, 7) * 0.97).toFixed(1);
        this.chart.setOption({
          xAxis: {
            type: "category",
            data: this.arr2
          },
          yAxis: {

            min: this.num1,
            max: this.num2,

          },
          series: [
            {
              name: "美元汇率",
              data: this.arr1
            }
          ]
        });
      });
    },
    beforeDestroy() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id));

        this.chart.setOption({
          title: {
            text: "美元汇率变化图",
            x: "center",
            y: "top",
            textAlign: "center"
          },
          tooltip: {
            trigger: "axis",
            backgroundColor: "red",
            textStyle: {
              color: "yellow",
              fontSize: "16px"
            },
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: []
            }
          ],
          yAxis: {
            type: "value",

            axisLine: {}
          },
          series: [
            {
              name: "美元汇率",
              type: "line",
              stack: "总量",
              label: {
                normal: {
                  show: true
                }
              },
              data: [],
              markPoint: {
                data: [
                  { type: "max", name: "最大值" },
                  { type: "min", name: "最小值" }
                ]
              },
              markLine: {
                data: [{ type: "average", name: "平均值" }]
              }
            }
          ]
        });
      },
      handleClick(tab, event) { }
    }
  };
</script>