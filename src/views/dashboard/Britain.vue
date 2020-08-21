<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from "echarts";
  import axios from "axios";
  import { Getexchangerates } from "../../api/erp";

  export default {
    props: {
      className: {
        type: String,
        default: "chart"
      },
      id: {
        type: String,
        default: "chart1"
      },
      width: {
        type: String,
        default: "900px"
      },
      height: {
        type: String,
        default: "400px"
      }
    },
    data() {
      return {
        chart: null,
        num1: Number,
        num2: Number
      };
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val);
        }
      }
    },
    mounted() {
      let str1 = "";
      let str2 = "";
      this.initChart();
      let Token = localStorage.getItem("token2");
      axios.defaults.headers.common["Authorization"] = "Bearer " + Token;
      Getexchangerates().then(response => {
        response.forEach(val => {
          if (val.ccurrency == "英镑") {
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
            max: this.num2
          },
          series: [
            {
              name: "英镑汇率",
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
            text: "英镑汇率变化图",
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
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
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
          yAxis:
          {
            type: "value",
            min: 8.5,
            max: 8.8

          }
          ,
          series: [
            {
              name: "英镑汇率",
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
      handleClick(tab, event) {
      }
    }
  };
</script>