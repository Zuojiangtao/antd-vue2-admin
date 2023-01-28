import * as echarts from 'echarts/core'

import { BarChart, LineChart, PieChart, FunnelChart } from 'echarts/charts'
import { UniversalTransition, LabelLayout } from 'echarts/features'
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
} from 'echarts/components'

// 注意，新的接口中默认不再包含 Canvas 渲染器，需要显示引入，如果需要使用 SVG 渲染模式则使用 SVGRenderer
import { SVGRenderer } from 'echarts/renderers'

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  FunnelChart,
  GridComponent,
  UniversalTransition,
  LabelLayout,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  SVGRenderer,
])
