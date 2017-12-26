<template>
  <div class="home">
    <el-row>
      <el-col :span="18" class="info-list">
        <InfoCard 
          left-color="#2D8CF0"
          icon-class="el-icon-share"
          :number="ordersCount"
          description="今日订单额"
          number-color="#2D8CF0">
        </InfoCard>
        <InfoCard 
          left-color="#64D572"
          icon-class="el-icon-star-on"
          :number="studentsCount"
          description="今日新增学员"
          number-color="#64D572">
        </InfoCard>
        <InfoCard 
          left-color="#FFB800"
          icon-class="el-icon-setting"
          :number="auditionsCount"
          description="今日预约人数"
          number-color="#FFB800">
        </InfoCard>
        <InfoCard 
          left-color="#FF0300"
          icon-class="el-icon-circle-check"
          :number="totalSales"
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
import {
  getOrdersCountByDate,
  getTotalSalesByDate,
  getTotalSalesByCurrentMonth,
  getTotalSalesByWeekday
} from 'api/order'
import {mapGetters} from 'vuex'
import {getStudentsCountByDate} from 'api/student'
import {getAuditionsCountByDate} from 'api/audition'
import {OK_CODE} from 'api/config'
import InfoCard from 'components/infoCard/info-card.vue'

export default {
  data () {
    return {
      ordersCount: 0,
      studentsCount: 0,
      auditionsCount: 0,
      totalSales: 0,
      chart1: '',
      chart2: ''
    }
  },
  created () {
    this._getOrdersCountByDate()
    this._getStudentsCountByDate()
    this._getAuditionsCountByDate()
    this._getTotalSalesByDate()
  },
  computed: {
    ...mapGetters([
      'campus'
    ])
  },
  methods: {
    // 获取当前校区、当天的订单额
    _getOrdersCountByDate () {
      const date = +new Date()
      getOrdersCountByDate(date, this.campus).then(res => {
        if (res.code === OK_CODE) {
          this.ordersCount = res.count
        }
      })
    },
    // 获取当前校区，当天的学员数
    _getStudentsCountByDate () {
      const date = +new Date()
      getStudentsCountByDate(date, this.campus).then(res => {
        if (res.code === OK_CODE) {
          this.studentsCount = res.count
        }
      })
    },
    // 获取当前校区，当天的预约人数
    _getAuditionsCountByDate () {
      const date = +new Date()
      getAuditionsCountByDate(date, this.campus).then(res => {
        if (res.code === OK_CODE) {
          this.auditionsCount = res.count
        }
      })
    },
    // 获取当前校区，当天的总销售额
    _getTotalSalesByDate () {
      const date = +new Date()
      getTotalSalesByDate(date, this.campus).then(res => {
        console.log(res)
        if (res.code === OK_CODE) {
          this.totalSales = res.count
        }
      })
    },
    // 获取本月各校区总销售额
    _getTotalSalesByCurrentMonth () {
      getTotalSalesByCurrentMonth().then(res => {
        if (OK_CODE === res.code) {
          let chart2Data = this._formatCharts2Data(res.curMonthorders, res.curMonthRenews)
          this._drawNightingaleMap(chart2Data)
        }
      })
    },
    // 获取本周每天销售额
    _getTotalSalesByWeekday () {
      getTotalSalesByWeekday().then(res => {
        const weekdayTotalSales = res.weekdayTotalSales
        const series = weekdayTotalSales.map(week => {
          return {
            name: week.name,
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: week.data
          }
        })
        const legend = weekdayTotalSales.map(week => {
          return week.name
        })
        this._drawStackAreaMap(series, legend)
      })
    },
    // 南丁格尔图
    _drawNightingaleMap (data) {
      this.chart2 = echarts.init(this.$refs.chart2)
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
        series: [
          {
            name: '本月销售额',
            type: 'pie',
            radius: '55%',
            data: data,
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
      this.chart2.setOption(option2)
    },
    // 堆叠区域图
    _drawStackAreaMap (series, legend) {
      this.chart1 = echarts.init(this.$refs.chart1)
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
          data: legend
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
        series: series
      }
      this.chart1.setOption(option1)
    },
    // 当单总订单额， 当月总续费数
    _formatCharts2Data (curMonthorders, curMonthRenews) {
      let totalData = {}
      let curMonthTotalSales = []
      curMonthorders.forEach(order => {
        if (!totalData[order.campus]) {
          totalData[order.campus] = []
          totalData[order.campus].push(order.revenue)
        } else {
          totalData[order.campus].push(order.revenue)
        }
      })
      curMonthRenews.forEach(renew => {
        if (!totalData[renew.campus]) {
          totalData[renew.campus] = []
          totalData[renew.campus].push(renew.renewFee)
        } else {
          totalData[renew.campus].push(renew.renewFee)
        }
      })
      Object.keys(totalData).forEach(data => {
        let dataObj = {}
        dataObj.value = totalData[data].reduce((prev, next) => {
          return prev + next
        })
        dataObj.name = data
        curMonthTotalSales.push(dataObj)
      })
      return curMonthTotalSales
    }
  },
  mounted () {
    this._getTotalSalesByCurrentMonth()
    this._getTotalSalesByWeekday()
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
