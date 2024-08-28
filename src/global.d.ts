import {
  useChart as chart,
  ECOption as ChartECOption
} from './plugins/chart'
import { ECharts } from 'echarts/core'

export {}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $chart: typeof chart
  }
}

declare global {
  type Chart = ECharts
  type ECOption = ChartECOption
}