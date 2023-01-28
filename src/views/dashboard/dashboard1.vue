<template>
  <div class="dashboard-container">
    <a-row :gutter="{ xs: 4, sm: 6, md: 8 }">
      <a-col :span="6" v-for="item in cards" :key="item.title">
        <a-card>
          <div class="icon-row">
            <div class="custom-icon">
              <svg-icon :icon-id="item.icon" :style="`color: ${item.iconColor};font-size: 18px`" />
              <div class="custom-icon-text">{{ item.title }}</div>
            </div>
            <span class="time-unit">{{ item.unit }}</span>
          </div>
          <ul class="trend-block">
            <li class="trend-count" :class="{ ascension: item.trend >= 0, descension: item.trend < 0 }">
              {{ `${item.trend >= 0 ? '+' : ''}${item.trend * 100}%` }}
            </li>
            <li :class="{ up: item.trend >= 0, down: item.trend < 0 }">
              {{ `${item.trend >= 0 ? '▲' : '▼'}` }}
            </li>
          </ul>
          <div class="num-show">
            {{ `${item.style === 'amount' ? '￥ ' : ''}${item.data}` }}
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="{ xs: 4, sm: 6, md: 8 }" class="height-set">
      <a-col :span="12">
        <a-card title="访问量">
          <div id="bar-chart"></div>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="区域排行">
          <div v-for="(item, index) in progressRanking" :key="item.name" class="progress-row">
            <div class="ranking-wrapper">
              <span class="ranking" :class="`rank${index + 1}`">{{ index + 1 }}</span>
              {{ item.name }}
            </div>
            <a-progress :percent="item.percent * 100" :show-info="false" :class="`progress-${index + 1}`" />
            <div class="progress-desc">转化率：{{ (item.percent * 100).toFixed(2) }}%</div>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="{ xs: 4, sm: 6, md: 8 }" class="height-set">
      <a-col :span="12">
        <a-card title="销售额">
          <div id="line-chart"></div>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="访问来源">
          <div id="pie-chart"></div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import { dataSan } from '@/utils/dataCheck'

export default {
  name: 'Dashboard1',
  data() {
    return {
      cards: [],
      progressRanking: [
        {
          name: '浙江省',
          percent: 0.9,
        },
        {
          name: '上海市',
          percent: 0.9,
        },
        {
          name: '河南省',
          percent: 0.9,
        },
        {
          name: '江西省',
          percent: 0.8,
        },
        {
          name: '湖南省',
          percent: 0.7,
        },
        {
          name: '广东省',
          percent: 0.7,
        },
        {
          name: '福建省',
          percent: 0.4,
        },
        {
          name: '四川省',
          percent: 0.3,
        },
        {
          name: '江苏省',
          percent: 0.3,
        },
        {
          name: '山西省',
          percent: 0.1,
        },
      ],
    }
  },
  mounted() {
    this.getIconRowData()
    this.getBarChartData()
    this.getLineChartData()
    this.drawPieChart()
  },
  methods: {
    getIconRowData() {
      const fetch = new Promise(resolve => {
        const list = [
          {
            icon: 'icon-chart1',
            iconColor: '#67a9d8',
            title: '访问量',
            unit: '周',
            style: 'index',
            trend: 0.1,
            data: 2021,
          },
          {
            icon: 'icon-exchange-cny-line',
            iconColor: '#ac81dc',
            title: '销售额',
            unit: '周',
            style: 'amount',
            trend: -0.2,
            data: 2021,
          },
          {
            icon: 'icon-order',
            iconColor: '#e89886',
            title: '订单量',
            unit: '周',
            style: 'index',
            trend: 0.35,
            data: 2021,
          },
          {
            icon: 'icon-auction',
            iconColor: '#66d7a5',
            title: '成交额',
            unit: '月',
            style: 'amount',
            trend: -0.05,
            data: 2021,
          },
        ]
        resolve({ list })
      })
      fetch.then(res => {
        this.cards = res.list.map(item => {
          item.data = dataSan(item.data)
          return item
        })
      })
    },
    getBarChartData() {
      const fetch = new Promise(resolve => {
        const list = []
        for (let i = 1; i <= 12; i += 1) {
          list.push({
            key: i,
            id: i,
            name: `${i}月访问量`,
            data: Math.random() * 15000,
          })
        }
        resolve({ list })
      })
      fetch.then(res => {
        this.drawBarChart(
          res.list.map(item => {
            return item.data
          }),
        )
      })
    },
    drawBarChart(chartData) {
      const myChart = echarts.init(document.getElementById('bar-chart'))
      const option = {
        tooltip: {
          trigger: 'item',
        },
        xAxis: {
          type: 'category',
          data: Array(12)
            .fill('')
            .map((item, index) => {
              return `${index + 1}月`
            }),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: chartData,
            type: 'bar',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(35, 119, 245)',
                },
                {
                  offset: 0.6,
                  color: 'rgb(35, 119, 245)',
                },
                {
                  offset: 1,
                  color: 'rgb(130, 185, 234)',
                },
              ]),
            },
          },
        ],
      }
      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    getLineChartData() {
      const fetch = new Promise(resolve => {
        const list = []
        for (let i = 1; i <= 12; i += 1) {
          const data = Math.random() * 1500
          list.push({
            key: i,
            id: i,
            sum: data * 0.1,
            avg: data * 0.9,
          })
        }
        resolve({ list })
      })
      fetch.then(res => {
        this.drawLineChart(
          res.list.map(item => {
            return [item.sum, item.avg]
          }),
        )
      })
    },
    drawLineChart(chartData) {
      const myChart = echarts.init(document.getElementById('line-chart'))
      const option = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          data: ['当月销售额', '月均销售额'],
          right: 20,
        },
        xAxis: {
          type: 'category',
          data: Array(12)
            .fill('')
            .map((item, index) => {
              return `${index + 1}月`
            }),
        },
        yAxis: {
          type: 'value',
          name: '单位：元',
        },
        series: [
          {
            name: '当月销售额',
            data: chartData.map(item => {
              return item[0]
            }),
            type: 'line',
            stack: 'total',
            areaStyle: {},
          },
          {
            name: '月均销售额',
            data: chartData.map(item => {
              return item[1]
            }),
            type: 'line',
            stack: 'total',
            areaStyle: {},
          },
        ],
      }
      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    drawPieChart() {
      const myChart = echarts.init(document.getElementById('pie-chart'))
      const option = {
        title: {
          text: '访问来源',
          subtext: '全站来源统计',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: '搜索引擎' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' },
              { value: 300, name: '视频广告' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }
      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
  },
}
</script>

<style lang="less" scoped>
.dashboard-container {
  background: #f0f1f3;
  .ant-row {
    margin-bottom: 15px;
  }
  ::v-deep .ant-card-body {
    padding: 10px;
    .icon-row {
      display: flex;
      justify-content: space-between;
      .custom-icon {
        padding: 3px;
        text-align: center;
      }
      .time-unit {
        font-size: 12px;
        line-height: 12px;
      }
    }
    ul {
      list-style: none;
    }
    .trend-block {
      text-align: right;
      li {
        display: inline-block;
      }
      .trend-count {
        padding: 0 5px;
        border-radius: 3px;
        color: #fff;
        margin-right: 3px;
      }
      .ascension {
        background: #2da146;
      }
      .descension {
        background: #cc3151;
      }
      .up {
        color: #2da146;
      }
      .down {
        color: #cc3151;
      }
    }
    .num-show {
      font-size: 24px;
      font-weight: bold;
    }
  }
  ::v-deep .height-set .ant-card-body {
    height: 500px;
    position: relative;
    overflow: auto;
  }
  .progress-row {
    display: flex;
    margin-top: 15px;
    .ranking-wrapper,
    .progress-desc {
      width: 150px;
      text-align: center;
    }
    .ranking {
      display: inline-block;
      width: 28px;
      margin-right: 3px;
      padding: 3px 2px;
      border-radius: 50%;
      text-align: center;
    }
    .rank1 {
      color: #fa6099;
      background: #fde6e7;
    }
    .rank2 {
      color: #f1ad82;
      background: #fde7ce;
    }
    .rank3 {
      color: #50bede;
      background: #dcf5f5;
    }
    ::v-deep .ant-progress-inner {
      background: #fff;
    }
    ::v-deep .progress-1 .ant-progress-bg {
      background-color: #fa6099;
    }
    ::v-deep .progress-2 .ant-progress-bg {
      background-color: #ff9250;
    }
    ::v-deep .progress-3 .ant-progress-bg {
      background-color: #49bddc;
    }
  }
  #bar-chart {
    height: 100%;
  }
  #line-chart {
    height: 100%;
  }
  #pie-chart {
    height: 100%;
  }
}
</style>
