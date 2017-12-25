<template>
  <div class="home">
    <el-row>
      <el-col :span="18" class="info-list">
        <InfoCard 
          left-color="#2D8CF0"
          icon-class="el-icon-share"
          :number="60000"
          description="今日订单额"
          number-color="#2D8CF0">
        </InfoCard>
        <InfoCard 
          left-color="#64D572"
          icon-class="el-icon-star-on"
          :number="2"
          description="今日新增学员"
          number-color="#64D572">
        </InfoCard>
        <InfoCard 
          left-color="#FFB800"
          icon-class="el-icon-setting"
          :number="3"
          description="今日预约人数"
          number-color="#FFB800">
        </InfoCard>
        <InfoCard 
          left-color="#FF0300"
          icon-class="el-icon-circle-check"
          :number="30000"
          description="今日总销售额"
          number-color="#FF0300">
        </InfoCard>
      </el-col>
      <el-col :span="6">
        &nbsp;
      </el-col>
    </el-row>
    <el-row class="charts">
      <el-col :span="14">
        <div ref="chart1" class="main" style="height:400px;"></div>
      </el-col>
      <el-col :span="10">
        <div ref="chart2" class="main" style="height:400px;"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getOrdersCountByDate } from 'api/order'
import InfoCard from 'components/infoCard/info-card.vue'

export default {
  methods: {
    // 获取当前校区、当天的订单额
    _getOrdersCountByDate () {
      const date = +new Date()
      getOrdersCountByDate(date).then(res => {
        console.log(res)
      })
    },
    // 南丁格尔图
    _drawNightingaleMap () {
      let chart2 = echarts.init(this.$refs.chart2)
      let option2 = {
        backgroundColor: '#F2F2F2',
        title: {
          text: '本月各校区总销售额',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '本月销售额',
            type: 'pie',
            radius: '55%',
            data: [
                {value: 235, name: '九亭校区'},
                {value: 274, name: '七宝校区'},
                {value: 310, name: '泗泾校区'},
                {value: 335, name: '浦东校区'},
                {value: 400, name: '华泾校区'}
            ],
            roseType: 'angle',
            itemStyle: {
              normal: {
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      chart2.setOption(option2)
    },
    // 堆叠区域图
    _drawStackAreaMap () {
      let chart1 = echarts.init(this.$refs.chart1)
      let option1 = {
        title: {
          text: '本周销售额'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['九亭校区', '七宝校区', '泗泾校区', '浦东校区', '华泾校区']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '九亭校区',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '七宝校区',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '泗泾校区',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '浦东校区',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '华泾校区',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {normal: {}},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
      chart1.setOption(option1)
    }
  },
  mounted () {
    this._getOrdersCountByDate()
    this._drawStackAreaMap()
    this._drawNightingaleMap()
  },
  components: {
    InfoCard
  }
}
</script>

<style lang="scss" scoped>
.home {
  .info-list {
    display: flex;
  }
  .charts {
    margin-top: 32px;
  }
}

</style>
