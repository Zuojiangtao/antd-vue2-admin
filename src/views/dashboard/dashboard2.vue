<template>
  <div class="dashboard-container">
    <a-row :gutter="{ xs: 4, sm: 6, md: 8 }">
      <a-col :span="6" v-for="item in cards" :key="item.title">
        <a-card :title="item.title">
          <div slot="extra" :class="computeUnitClass(item.unit)">
            <span>{{ item.unit }}</span>
          </div>
          <div class="num-show">
            {{ item.data }}
          </div>
          <div v-if="!item.progress" class="trend-row">
            <ul v-for="(trend, index) in item.trend" :key="index">
              <li>
                {{ `${trend.dimension}${trend.trend * 100}%` }}
              </li>
              <li :class="{ up: trend.trend >= 0, down: trend.trend < 0 }">
                {{ `${trend.trend >= 0 ? '▲' : '▼'}` }}
              </li>
            </ul>
          </div>
          <a-progress v-else :percent="item.percent * 100" :strokeWidth="5" />
          <a-divider></a-divider>
          <div class="card-footer">
            <span>{{ item.dimension }}</span>
            <span>{{ item.dimensionNum }}</span>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="{ xs: 4, sm: 6, md: 8 }">
      <a-col :span="3" v-for="item in iconCards" :key="item.icon">
        <a-card class="icon-card" @click="clickIconCard(item)">
          <svg-icon :icon-id="item.icon" :style="`color: ${item.iconColor};font-size: 18px`" />
          <div class="custom-icon-text">{{ item.title }}</div>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="{ xs: 4, sm: 6, md: 8 }">
      <a-col :span="18">
        <a-card title="任务计划">
          <a slot="extra" href="#">更多</a>
          <a-table :columns="taskColumns" :data-source="taskData" :scroll="{ y: 440 }" :pagination="false">
            <template slot="collaborators" slot-scope="collaborators">
              <ul class="avatar-list">
                <li v-for="collaborator in collaborators" :key="collaborator.avatar">
                  <img :src="collaborator.avatar" :alt="collaborator.name" :title="collaborator.name" />
                </li>
              </ul>
            </template>
            <template slot="testers" slot-scope="testers">
              <ul class="avatar-list">
                <li v-for="tester in testers" :key="tester.avatar">
                  <img :src="tester.avatar" :alt="tester.name" :title="tester.name" />
                </li>
              </ul>
            </template>
            <template slot="status" slot-scope="status">
              <div class="status-tag" :class="status">
                {{ computeStatus(status) }}
              </div>
            </template>
          </a-table>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <div id="pie-chart"></div>
          <a-table :columns="pieColumns" :data-source="pieData" :scroll="{ y: 240 }" :pagination="false"> </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import { dataSan } from '@/utils/dataCheck'

export default {
  name: 'Dashboard2',
  data() {
    return {
      cards: [],
      iconCards: [
        {
          icon: 'icon-friend',
          iconColor: '#89c5e9',
          title: '用户',
        },
        {
          icon: 'icon-barchart',
          iconColor: '#8bc5de',
          title: '分析',
        },
        {
          icon: 'icon-shopping_cart',
          iconColor: '#e8a27f',
          title: '商品',
        },
        {
          icon: 'icon-order-rmb',
          iconColor: '#a686d2',
          title: '订单',
        },
        {
          icon: 'icon-creditcard',
          iconColor: '#fadc6c',
          title: '票据',
        },
        {
          icon: 'icon-email',
          iconColor: '#71e2df',
          title: '消息',
        },
        {
          icon: 'icon-tags',
          iconColor: '#e89bc4',
          title: '标签',
        },
        {
          icon: 'icon-shezhi1',
          iconColor: '#f3c583',
          title: '配置',
        },
      ],
      taskColumns: [
        {
          title: '任务说明',
          dataIndex: 'taskInfo',
          key: 'taskInfo',
        },
        {
          title: '模块',
          dataIndex: 'module',
          key: 'module',
          width: 180,
          align: 'center',
        },
        {
          title: '协作者',
          dataIndex: 'collaborators',
          key: 'collaborators',
          scopedSlots: { customRender: 'collaborators' },
          align: 'center',
        },
        {
          title: '测试者',
          dataIndex: 'testers',
          key: 'testers',
          scopedSlots: { customRender: 'testers' },
          align: 'center',
        },
        {
          title: '完成度',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' },
          width: 120,
          align: 'center',
        },
      ],
      taskData: [],
      pieColumns: [
        {
          title: '来源',
          dataIndex: 'resource',
          key: 'resource',
        },
        {
          title: '收入',
          dataIndex: 'income',
          key: 'income',
          sorter: (a, b) => a.income - b.income,
        },
        {
          title: '占比',
          dataIndex: 'percent',
          key: 'percent',
          sorter: (a, b) => a.percent - b.percent,
        },
      ],
      pieData: [],
    }
  },
  mounted() {
    this.getCardRowData()
    this.getTaskData()
    this.getPieChartData()
  },
  methods: {
    getCardRowData() {
      const fetch = new Promise(resolve => {
        const list = [
          {
            title: '访问量',
            unit: '日',
            style: 'index',
            progress: false,
            trend: [
              {
                trend: 0.3,
                dimension: '日同比',
              },
              {
                trend: 0.74,
                dimension: '周同比',
              },
            ],
            data: `77,756`,
            dimension: '总访问量',
            dimensionNum: `724,352`,
          },
          {
            title: '销售额',
            unit: '周',
            style: 'index',
            progress: true,
            percent: 0.7,

            data: `￥62,253`,
            dimension: '总销售额',
            dimensionNum: `￥553,778`,
          },
          {
            title: '订单量',
            unit: '周',
            style: 'index',
            progress: false,
            trend: [
              {
                trend: -0.79,
                dimension: '日同比',
              },
              {
                trend: -0.51,
                dimension: '周同比',
              },
            ],
            data: `88,684`,
            dimension: '转化率',
            dimensionNum: `38%`,
          },
          {
            title: '成交额',
            unit: '月',
            style: 'index',
            progress: false,
            trend: [
              {
                trend: -0.91,
                dimension: '月同比',
              },
              {
                trend: 0.2,
                dimension: '月同比',
              },
            ],
            data: `￥67,698`,
            dimension: '总成交额',
            dimensionNum: `￥724,352`,
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
    getTaskData() {
      const fetch = new Promise(resolve => {
        const list = [
          {
            taskInfo: '支付页面增加飞贷分期的选择',
            module: '支付',
            collaborators: [
              {
                name: '梅西的10号战衣',
                avatar: 'https://img1.baidu.com/it/u=299747326,3575916828&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
              {
                name: '汪汪队小队长',
                avatar: 'https://img2.baidu.com/it/u=1106463034,2606936611&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
              {
                name: '236561',
                avatar: 'https://img0.baidu.com/it/u=4056648604,4256358178&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
            ],
            testers: [
              {
                name: '梅西的10号战衣',
                avatar: 'https://img1.baidu.com/it/u=299747326,3575916828&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
              {
                name: '隐名不夜行',
                avatar: 'https://img1.baidu.com/it/u=2189186282,1400868752&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
            ],
            status: `done`,
          },
          {
            taskInfo: '新增banner轮播图广告',
            module: '广告',
            collaborators: [
              {
                name: '236561',
                avatar: 'https://img0.baidu.com/it/u=4056648604,4256358178&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
              {
                name: '隐名不夜行',
                avatar: 'https://img1.baidu.com/it/u=2189186282,1400868752&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
            ],
            testers: [
              {
                name: '218340',
                avatar: 'https://img0.baidu.com/it/u=3776733663,2660962337&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
            ],
            status: `undone`,
          },
          {
            taskInfo: '开发微信小程序',
            module: '营销',
            collaborators: [
              {
                name: '236561',
                avatar: 'https://img0.baidu.com/it/u=4056648604,4256358178&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
            ],
            testers: [
              {
                name: '汪汪队小队长',
                avatar: 'https://img2.baidu.com/it/u=1106463034,2606936611&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
            ],
            status: `done`,
          },
          {
            taskInfo: '支付页面增加支付宝支付',
            module: '支付',
            collaborators: [
              {
                name: '汪汪队小队长',
                avatar: 'https://img2.baidu.com/it/u=1106463034,2606936611&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
              {
                name: '隐名不夜行',
                avatar: 'https://img1.baidu.com/it/u=2189186282,1400868752&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
              {
                name: '梅西的10号战衣',
                avatar: 'https://img1.baidu.com/it/u=299747326,3575916828&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
            ],
            testers: [
              {
                name: '236561',
                avatar: 'https://img0.baidu.com/it/u=4056648604,4256358178&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
            ],
            status: `done`,
          },
          {
            taskInfo: '新增弹出框广告增强效果',
            module: '广告',
            collaborators: [
              {
                name: '218340',
                avatar: 'https://img0.baidu.com/it/u=3776733663,2660962337&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
              {
                name: '隐名不夜行',
                avatar: 'https://img1.baidu.com/it/u=2189186282,1400868752&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
            ],
            testers: [
              {
                name: '236561',
                avatar: 'https://img0.baidu.com/it/u=4056648604,4256358178&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
            ],
            status: `undone`,
          },
          {
            taskInfo: '新增微信支付',
            module: '支付',
            collaborators: [
              {
                name: '汪汪队小队长',
                avatar: 'https://img2.baidu.com/it/u=1106463034,2606936611&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
            ],
            testers: [
              {
                name: '梅西的10号战衣',
                avatar: 'https://img1.baidu.com/it/u=299747326,3575916828&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
            ],
            status: `undone`,
          },
          {
            taskInfo: '新增百度商桥',
            module: '营销',
            collaborators: [
              {
                name: '隐名不夜行',
                avatar: 'https://img1.baidu.com/it/u=2189186282,1400868752&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
            ],
            testers: [
              {
                name: '218340',
                avatar: 'https://img0.baidu.com/it/u=3776733663,2660962337&fm=253&fmt=auto&app=138&f=JPEG?w=324&h=324',
              },
            ],
            status: `undone`,
          },
        ]
        resolve({ list })
      })
      fetch.then(res => {
        this.taskData = res.list
      })
    },
    computeUnitClass(unit) {
      const unitEnum = {
        日: 'day-unit',
        周: 'week-unit',
        月: 'month-unit',
      }
      return unitEnum[unit]
    },
    computeStatus(status) {
      const statusEnum = {
        done: '是',
        undone: '否',
      }
      return statusEnum[status]
    },
    clickIconCard(item) {
      console.log(item.title)
    },
    getPieChartData() {
      const fetch = new Promise(resolve => {
        const list = [
          {
            resource: '互联网',
            income: 525,
            percent: 0.51,
          },
          {
            resource: '实体门店',
            income: 305,
            percent: 0.29,
          },
          {
            resource: '境外',
            income: 134,
            percent: 0.13,
          },
          {
            resource: '其他',
            income: 60,
            percent: 0.05,
          },
        ]
        resolve({ list })
      })
      fetch.then(res => {
        this.pieData = res.list
        const chartData = res.list.map(item => {
          return {
            value: item.income,
            name: item.resource,
            percent: item.percent,
          }
        })
        this.drawPieChart(chartData)
      })
    },
    drawPieChart(chartData) {
      const max = Math.max(
        ...chartData.map(item => {
          return item.value
        }),
      )
      const maxPercent = chartData.find(item => item.value === max).percent
      const myChart = echarts.init(document.getElementById('pie-chart'))
      const option = {
        series: [
          {
            type: 'pie',
            radius: ['30%', '40%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'outside',
            },
            labelLine: {
              show: true,
            },
            data: chartData,
          },
          {
            type: 'pie',
            radius: ['30%', '40%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'center',
              formatter: `{a|${(maxPercent * 100).toFixed()}%}\n{b|最大来源占比}`,
              rich: {
                a: {
                  fontSize: 18,
                },
                b: {
                  color: '#ccc',
                },
              },
            },
            labelLine: {
              show: true,
            },
            data: chartData,
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
  ::v-deep .ant-card-head {
    padding: 0 10px;
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
    .trend-row {
      display: flex;
      justify-content: space-between;
      padding: 0;
      ul {
        padding: 0;
        margin-bottom: 0;
      }
      li {
        display: inline-block;
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
    .num-show {
      font-size: 24px;
      font-weight: bold;
    }
    .card-footer {
      display: flex;
      justify-content: space-between;
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
  .icon-card {
    text-align: center;
    cursor: pointer;
  }
  .icon-card:hover {
    .custom-icon-text {
      color: #188ffd;
    }
  }
  #pie-chart {
    height: 280px;
  }
}
</style>
