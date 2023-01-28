<template>
  <div class="dashboard-container">
    <div class="cards-row">
      <div class="card-wrapper">
        <a-card>
          <div class="card-title">
            <div class="title-text">{{ cards[0].title }}</div>
            <a-tooltip>
              <template slot="title"> 提示信息 </template>
              <a-icon type="info-circle" />
            </a-tooltip>
          </div>
          <p class="card-data">
            {{ dataSan(cards[0].data) }}
          </p>
          <ul class="trend-row">
            <li>周同比</li>
            <li :class="{ up: cards[0].yoyWeek >= 0, down: cards[0].yoyWeek < 0 }">
              {{ `${cards[0].yoyWeek >= 0 ? '▲' : '▼'}` }}
            </li>
            <li>
              {{ `${cards[0].yoyWeek * 100}%` }}
            </li>
            <li>日环比</li>
            <li :class="{ up: cards[0].yoyDaily >= 0, down: cards[0].yoyDaily < 0 }">
              {{ `${cards[0].yoyDaily >= 0 ? '▲' : '▼'}` }}
            </li>
            <li>
              {{ `${cards[0].yoyDaily * 100}%` }}
            </li>
          </ul>
        </a-card>
      </div>
      <div class="card-wrapper">
        <a-card>
          <div class="card-title">
            <div class="title-text">{{ cards[1].title }}</div>
            <a-tooltip>
              <template slot="title"> 提示信息 </template>
              <a-icon type="info-circle" />
            </a-tooltip>
          </div>
          <p class="card-data">
            {{ dataSan(cards[1].data) }}
          </p>
          <div id="card-line-chart" />
        </a-card>
      </div>
      <div class="card-wrapper">
        <a-card>
          <div class="card-title">
            <div class="title-text">{{ cards[2].title }}</div>
            <a-tooltip>
              <template slot="title"> 提示信息 </template>
              <a-icon type="info-circle" />
            </a-tooltip>
          </div>
          <p class="card-data">
            {{ dataSan(cards[2].data) }}
          </p>
          <div id="card-bar-chart" />
        </a-card>
      </div>
      <div class="card-wrapper">
        <a-card>
          <div class="card-title">
            <div class="title-text">{{ cards[3].title }}</div>
            <a-tooltip>
              <template slot="title"> 提示信息 </template>
              <a-icon type="info-circle" />
            </a-tooltip>
          </div>
          <p class="card-data">{{ cards[3].data * 100 }}%</p>
          <div class="progress-wrapper">
            <a-progress type="circle" :percent="cards[3].data * 100" :show-info="false" :width="50" />
          </div>
        </a-card>
      </div>
      <div class="card-wrapper">
        <a-card>
          <div class="card-title">
            <div class="title-text">{{ cards[4].title }}</div>
            <a-tooltip>
              <template slot="title"> 提示信息 </template>
              <a-icon type="info-circle" />
            </a-tooltip>
          </div>
          <p class="card-data">{{ cards[4].data * 100 }}%</p>
          <a-progress stroke-linecap="square" :percent="cards[4].data * 100" :show-info="false" style="height: 50px" />
        </a-card>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="left">
        <a-card title="数据简报" class="data-report-wrapper">
          <div v-for="item in reportData" :key="item.title" class="data-report-block">
            <div class="data-report-block-title">
              {{ item.title }}
            </div>
            <div class="data-report-block-data">
              {{ item.data }}
            </div>
            <div :class="{ ascension: item.percent >= 0, descension: item.percent < 0 }">
              {{ item.percent > 0 ? `+${item.percent * 100}` : `${item.percent * 100}` }}
            </div>
          </div>
        </a-card>
        <a-card title="业绩目标">
          <div id="achievement-chart"></div>
        </a-card>
        <a-card title="销售预测">
          <div id="sale-chart"></div>
        </a-card>
        <a-card title="销售漏斗">
          <div id="funnel-chart"></div>
        </a-card>
      </div>
      <div class="right">
        <a-card title="销售排名">
          <a-table :columns="salesColumn" :data-source="salesData" :pagination="false">
            <template slot="rank" slot-scope="text, record, index">
              <div class="ranking" :class="`rank${index + 1}`">{{ index + 1 }}</div>
            </template>
            <template slot="value" slot-scope="text">
              <span>{{ text.toFixed(2) }}万</span>
            </template>
            <template slot="percent" slot-scope="text, record, index">
              <a-progress :percent="text * 100" :class="`progress-${index + 1}`" />
            </template>
          </a-table>
        </a-card>
        <a-card title="快捷菜单">
          <div class="icon-wrapper">
            <div class="icon-block" v-for="item in iconMenu" :key="item.icon">
              <svg-icon :icon-id="item.icon" />
              <div>{{ item.name }}</div>
            </div>
          </div>
        </a-card>
        <a-card title="系统通知" style="height: 488px; overflow-y: auto">
          <a href="#" slot="extra"><a-icon type="right-circle" /> 全部</a>
          <ul class="notice-list">
            <li v-for="(item, index) in noticeList" :key="index">
              <div class="notice-title" @click.prevent="redirectTo(item)">{{ item.title }}</div>
              <div class="notice-time">
                <a-icon type="clock-circle" />
                <span> {{ item.postTime }}</span>
              </div>
            </li>
          </ul>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import { dataSan } from '@/utils/dataCheck'

export default {
  name: 'Dashboard3',
  data() {
    return {
      cards: [
        {
          title: '月销售金额(元)',
          data: 120000,
          yoyWeek: 0.12,
          yoyDaily: -0.1,
        },
        {
          title: '月回款金额(元)',
          data: 100000,
        },
        {
          title: '本月成交订单',
          data: 1000,
        },
        {
          title: '完成销售目标',
          data: 0.75,
        },
        {
          title: '回款达成率',
          data: 0.8,
        },
      ],
      reportData: [],
      salesColumn: [
        {
          title: '排名',
          dataIndex: 'rank',
          key: 'rank',
          scopedSlots: { customRender: 'rank' },
          align: 'center',
          width: 55,
        },
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          width: 80,
        },
        {
          title: '销售金额',
          dataIndex: 'value',
          key: 'value',
          align: 'center',
          scopedSlots: { customRender: 'value' },
          width: 90,
        },
        {
          title: '完成目标',
          dataIndex: 'percent',
          key: 'percent',
          scopedSlots: { customRender: 'percent' },
        },
      ],
      salesData: [
        {
          name: '张小刚',
          value: 100,
          percent: 0.9,
        },
        {
          name: '李小红',
          value: 90,
          percent: 0.8,
        },
        {
          name: '王小明',
          value: 80,
          percent: 0.7,
        },
        {
          name: '周小伟',
          value: 70,
          percent: 0.65,
        },
        {
          name: '郭小涛',
          value: 60,
          percent: 0.5,
        },
        {
          name: '邵小婷',
          value: 55,
          percent: 0.5,
        },
        {
          name: '叶小福',
          value: 50,
          percent: 0.5,
        },
        {
          name: '郭千秋',
          value: 45,
          percent: 0.5,
        },
        {
          name: '姜小风',
          value: 42,
          percent: 0.5,
        },
        {
          name: '吴小夏',
          value: 40,
          percent: 0.5,
        },
      ],
      iconMenu: [
        {
          name: '客户管理',
          icon: 'icon-customer',
        },
        {
          name: '线索管理',
          icon: 'icon-l-idea',
        },
        {
          name: '商机管理',
          icon: 'icon-lendmoney',
        },
        {
          name: '联系人管理',
          icon: 'icon-a-Usermanagement-outlined',
        },
        {
          name: '写新跟进',
          icon: 'icon-pencil',
        },
        {
          name: '回款管理',
          icon: 'icon-purchasereturn',
        },
        {
          name: '发票管理',
          icon: 'icon-order1',
        },
        {
          name: '费用管理',
          icon: 'icon-file-invoice-dollar-solid',
        },
        {
          name: '报销管理',
          icon: 'icon-reimbursement-fill',
        },
        {
          name: '工作报告',
          icon: 'icon-report',
        },

        {
          name: '工单管理',
          icon: 'icon-a-reworkworkorder',
        },
        {
          name: '产品管理',
          icon: 'icon-product',
        },
      ],
      noticeList: [
        {
          title: '关于开展核实清理虚假备案专项工作的通知',
          postTime: '10-22 11:20:37',
        },
        {
          title: '关于开展核实清理虚假备案专项工作的通知',
          postTime: '10-22 11:20:37',
        },
        {
          title: '关于开展核实清理虚假备案专项工作的通知',
          postTime: '10-22 11:20:37',
        },
        {
          title: '关于开展核实清理虚假备案专项工作的通知',
          postTime: '10-22 11:20:37',
        },
        {
          title: '关于开展核实清理虚假备案专项工作的通知',
          postTime: '10-22 11:20:37',
        },
        {
          title: '关于开展核实清理虚假备案专项工作的通知',
          postTime: '10-22 11:20:37',
        },
        {
          title: '关于开展核实清理虚假备案专项工作的通知',
          postTime: '10-22 11:20:37',
        },
        {
          title: '关于开展核实清理虚假备案专项工作的通知',
          postTime: '10-22 11:20:37',
        },
        {
          title: '关于开展核实清理虚假备案专项工作的通知',
          postTime: '10-22 11:20:37',
        },
        {
          title: '关于开展核实清理虚假备案专项工作的通知',
          postTime: '10-22 11:20:37',
        },
        {
          title: '关于开展核实清理虚假备案专项工作的通知',
          postTime: '10-22 11:20:37',
        },
        {
          title: '关于开展核实清理虚假备案专项工作的通知',
          postTime: '10-22 11:20:37',
        },
      ],
    }
  },
  mounted() {
    this.getReportData()
    this.getCardLineChartData()
    this.getCardBarChartData()
    this.getAchiChartData()
    this.getSaleChartData()
    this.getFunnelChartData()
  },
  methods: {
    getReportData() {
      const fetch = new Promise(resolve => {
        const list = [
          {
            title: '新增客户',
            data: 500,
            percent: 0.159,
          },
          {
            title: '新增线索',
            data: 1200,
            percent: 0.159,
          },
          {
            title: '新增商机',
            data: 500,
            percent: -0.159,
          },
          {
            title: '新增订单',
            data: 500,
            percent: -0.159,
          },
          {
            title: '新增联系人',
            data: 500,
            percent: 0.159,
          },
          {
            title: '跟进次数',
            data: 1200,
            percent: 0.159,
          },
          {
            title: '处理任务',
            data: 500,
            percent: -0.159,
          },
          {
            title: '处理工单',
            data: 500,
            percent: 0.159,
          },
        ]
        resolve({ list })
      })
      fetch.then(res => {
        this.reportData = res.list
      })
    },
    getCardLineChartData() {
      const fetch = new Promise(resolve => {
        const list = []
        for (let i = 1; i <= 12; i += 1) {
          list.push({
            key: i,
            id: i,
            name: `${i}月金额`,
            data: Math.random() * 120000,
          })
        }
        resolve({ list })
      })
      fetch.then(res => {
        this.drawCardLineChart(
          res.list.map(item => {
            return item.data
          }),
        )
      })
    },
    drawCardLineChart(chartData) {
      const myChart = echarts.init(document.getElementById('card-line-chart'))
      const option = {
        grid: {
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        },
        xAxis: {
          show: false,
          type: 'category',
          data: Array(12)
            .fill('')
            .map((item, index) => {
              return `${index + 1}月`
            }),
        },
        yAxis: {
          show: false,
          type: 'value',
          name: '单位：元',
          axisLabel: {
            showMinLabel: true,
            showMaxLabel: true,
          },
        },
        series: [
          {
            name: '月回款金额',
            data: chartData,
            type: 'line',
            // stack: 'total',
            areaStyle: {
              color: '#ec8191',
            },
          },
        ],
      }
      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    getCardBarChartData() {
      const fetch = new Promise(resolve => {
        const list = []
        for (let i = 1; i <= 12; i += 1) {
          list.push({
            key: i,
            id: i,
            name: `${i}月订单`,
            data: Math.random() * 1200,
          })
        }
        resolve({ list })
      })
      fetch.then(res => {
        this.drawCardBarChart(
          res.list.map(item => {
            return item.data
          }),
        )
      })
    },
    drawCardBarChart(chartData) {
      const myChart = echarts.init(document.getElementById('card-bar-chart'))
      const option = {
        grid: {
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        },
        xAxis: {
          show: false,
          type: 'category',
          data: Array(12)
            .fill('')
            .map((item, index) => {
              return `${index + 1}月`
            }),
        },
        yAxis: {
          show: false,
          type: 'value',
          name: '单位：元',
          axisLabel: {
            showMinLabel: true,
            showMaxLabel: true,
          },
        },
        series: [
          {
            name: '月成交订单',
            data: chartData,
            type: 'bar',
            itemStyle: {
              color: '#73c0ee',
            },
          },
        ],
      }
      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    getAchiChartData() {
      const fetch = new Promise(resolve => {
        const list = []
        const actualValue = Math.random() * 3000000
        for (let i = 1; i <= 12; i += 1) {
          list.push({
            key: i,
            id: i,
            name: `${i}月业绩`,
            data: [actualValue * (Math.random() * (0.8 - 0.5) + 0.5), actualValue * (Math.random() * (1 - 0.8) + 0.8)],
          })
        }
        resolve({ list })
      })
      fetch.then(res => {
        this.drawAchiChart(
          res.list.map(item => {
            return item.data
          }),
        )
      })
    },
    drawAchiChart(chartData) {
      const myChart = echarts.init(document.getElementById('achievement-chart'))
      const option = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          bottom: 10,
        },
        xAxis: {
          show: true,
          type: 'category',
          axisTick: {
            show: false,
          },
          data: Array(12)
            .fill('')
            .map((item, index) => {
              return `${index + 1}月`
            }),
        },
        yAxis: {
          show: true,
          type: 'value',
          // axisLabel: {
          //   showMinLabel: true,
          //   showMaxLabel: true,
          // },
        },
        series: [
          {
            name: '目标金额',
            data: chartData.map(item => {
              return item[0]
            }),
            type: 'bar',
            itemStyle: {
              color: '#86c8f1',
            },
          },
          {
            name: '成交金额',
            data: chartData.map(item => {
              return item[1]
            }),
            type: 'bar',
            barGap: '0%',
            itemStyle: {
              color: '#a7d8a7',
            },
          },
        ],
      }
      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    getSaleChartData() {
      const fetch = new Promise(resolve => {
        const list = []
        const actualValue = Math.random() * 3000000
        for (let i = 1; i <= 12; i += 1) {
          list.push({
            key: i,
            id: i,
            name: `${i}月销售`,
            data: [actualValue * (Math.random() * (1 - 0.8) + 0.8), actualValue * (Math.random() * (0.8 - 0.5) + 0.5)],
          })
        }
        resolve({ list })
      })
      fetch.then(res => {
        this.drawSaleChart(
          res.list.map(item => {
            return item.data
          }),
        )
      })
    },
    drawSaleChart(chartData) {
      const myChart = echarts.init(document.getElementById('sale-chart'))
      const option = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          bottom: 10,
        },
        xAxis: {
          show: true,
          type: 'category',
          axisTick: {
            show: false,
          },
          data: Array(12)
            .fill('')
            .map((item, index) => {
              return `${index + 1}月`
            }),
        },
        yAxis: {
          show: true,
          type: 'value',
        },
        series: [
          {
            name: '预计销售金额',
            data: chartData.map(item => {
              return item[0]
            }),
            type: 'bar',
            itemStyle: {
              color: '#ef949c',
            },
          },
          {
            name: '概率金额',
            data: chartData.map(item => {
              return item[1]
            }),
            type: 'bar',
            barGap: '0%',
            itemStyle: {
              color: '#90aef3',
            },
          },
        ],
      }
      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    getFunnelChartData() {
      const fetch = new Promise(resolve => {
        const list = [
          {
            value: 500,
            name: '初步洽谈',
          },
          {
            value: 350,
            name: '深入沟通',
          },
          {
            value: 250,
            name: '产品报价',
          },
          {
            value: 150,
            name: '成交商机',
          },
          {
            value: 120,
            name: '流失商机',
          },
        ]
        resolve({ list })
      })
      fetch.then(res => {
        this.drawFunnelChart(res.list)
      })
    },
    drawFunnelChart(chartData) {
      const myChart = echarts.init(document.getElementById('funnel-chart'))
      const option = {
        tooltip: {
          trigger: 'item',
        },
        color: ['#7bd6d6', '#f7cd73', '#86c8f1', '#a7d8a7', '#f1959c'],
        series: [
          {
            type: 'funnel',
            left: '10%',
            width: '80%',
            maxSize: '80%',
            minSize: '20%',
            label: {
              position: 'inside',
              formatter: '{d}%',
              color: '#fff',
            },
            // itemStyle: {
            //   opacity: 0.5,
            //   borderColor: '#fff',
            //   borderWidth: 2
            // },
            data: chartData,
          },
          {
            type: 'funnel',
            left: '10%',
            width: '80%',
            maxSize: '80%',
            minSize: '20%',
            label: {
              position: 'right',
              formatter: '{b} {c}',
              color: '#666',
            },
            // itemStyle: {
            //   opacity: 0.5,
            //   borderColor: '#fff',
            //   borderWidth: 2
            // },
            data: chartData,
          },
        ],
      }
      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    redirectTo(notice) {
      console.log(notice)
    },
    dataSan(num) {
      return dataSan(num)
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
  ::v-deep .ant-card {
    margin-bottom: 15px;
  }
  ::v-deep .ant-card-head {
    padding: 0 10px;
    font-size: 14px;
    font-weight: 700;
  }
  ::v-deep .ant-card-extra {
    .day-unit {
      border-radius: 3px;
      width: 35px;
      height: 25px;
      text-align: center;
      background: #e7fde7;
      color: #39a559;
    }
    .week-unit {
      border-radius: 3px;
      width: 35px;
      height: 25px;
      text-align: center;
      background: #e4f5fd;
      color: #5989cc;
    }
    .month-unit {
      border-radius: 3px;
      width: 35px;
      height: 25px;
      text-align: center;
      background: #fdeaea;
      color: #e1583f;
    }
  }
  ::v-deep .ant-card-body {
    padding: 10px;
    .card-title {
      display: flex;
      justify-content: space-between;
      color: #41464b99;
      .title-text {
        font-size: 12px;
      }
      .time-unit {
        font-size: 12px;
        line-height: 12px;
      }
    }
    .card-data {
      font-size: 20px;
      font-weight: bold;
    }
    .trend-row {
      margin-top: 20px;
      display: flex;
      padding: 0;
      color: #41464b99;
      font-size: 12px;
      height: 36px;
      li {
        margin-right: 8px;
      }
      .up {
        font-size: 12px;
        color: #2da146;
      }
      .down {
        font-size: 12px;
        color: #cc3151;
      }
    }
    .progress-wrapper {
      text-align: right;
    }
    #card-bar-chart,
    #card-line-chart {
      height: 50px;
    }
  }
  ::v-deep .ant-table-tbody {
    .avatar-list {
      padding: 0;
      li {
        display: inline-block;
        img {
          width: 40px;
          height: 40px;
          border: 3px solid #fff;
          border-radius: 50%;
        }
      }
    }
    .status-tag {
      width: 25px;
      height: 25px;
      text-align: center;
      margin: 0 auto;
      border-radius: 3px;
    }
    .done {
      background: #fdeaea;
      color: #c4604c;
    }
    .undone {
      background: #e7fde7;
      color: #81cd89;
    }
  }
  .cards-row {
    display: flex;
    .card-wrapper {
      width: 20%;
      .ant-card {
        margin: 0 6px 15px;
      }
    }
    .card-wrapper:first-child {
      .ant-card {
        margin: 0 6px 15px 0;
      }
    }
    .card-wrapper:last-child {
      .ant-card {
        margin: 0 0 15px 6px;
      }
    }
  }
  .content-wrapper {
    display: flex;
    .left {
      width: 0;
      flex: 1;
      .data-report-wrapper {
        ::v-deep .ant-card-body {
          display: flex;
          flex-wrap: wrap;
        }
      }
      .data-report-block {
        width: 25%;
        text-align: center;
        padding: 20px 0;
        &-title {
          color: #41464b99;
        }
        &-data {
          color: #777977;
          font-size: 24px;
          font-weight: 700;
        }
        .ascension {
          font-size: 12px;
          color: #2da146;
        }
        .descension {
          font-size: 12px;
          color: #cc3151;
        }
      }
      #achievement-chart,
      #sale-chart,
      #funnel-chart {
        height: 400px;
      }
    }
    .right {
      width: 385px;
      margin-left: 15px;
      ::v-deep .progress-1 .ant-progress-bg {
        background-color: #e66e66;
      }
      ::v-deep .progress-2 .ant-progress-bg {
        background-color: #f3ad5d;
      }
      ::v-deep .progress-3 .ant-progress-bg {
        background-color: #70cccb;
      }
      ::v-deep .ant-table-thead > tr > th {
        font-size: 12px;
        color: #41464b99;
        background: #fff;
      }
      .ranking {
        width: 25px;
        height: 25px;
        color: #fff;
        font-weight: 700;
        background: #cccdcc;
        border-radius: 3px;
      }
      .rank1,
      .rank2,
      .rank3 {
        background: #f19d3a;
      }
      .icon-wrapper {
        display: flex;
        flex-wrap: wrap;
        .icon-block {
          cursor: pointer;
          width: 33%;
          padding: 16px 0;
          text-align: center;
          color: #41464b99;
          .svg-icon {
            font-size: 44px;
          }
        }
        .icon-block:hover {
          color: #188ffd;
        }
      }
      .notice-list {
        padding: 0;
        li {
          font-size: 12px;
          height: 45px;
          line-height: 45px;
          display: flex;
          justify-content: space-between;
          .notice-title {
            cursor: pointer;
          }
          .notice-title:hover {
            color: #188ffd;
          }
          .notice-time {
            color: #41464b99;
          }
        }
        li:not(:last-child) {
          border-bottom: 1px solid #f4f4f4;
        }
      }
    }
  }
}
</style>
