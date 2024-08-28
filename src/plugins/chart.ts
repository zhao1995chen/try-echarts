import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  DatasetComponent,
  DatasetComponentOption,
  TransformComponent
} from 'echarts/components'
import { 
  BarChart, 
  BarSeriesOption, 
  LineChart, 
  LineSeriesOption, 
  PieChart, 
  PieSeriesOption,
  RadarChart,
  RadarSeriesOption
} from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { App, Plugin } from 'vue'

export declare type ECOption = echarts.ComposeOption<
| BarSeriesOption
| LineSeriesOption
| PieSeriesOption
| RadarSeriesOption
| TitleComponentOption
| ToolboxComponentOption
| TooltipComponentOption
| GridComponentOption
| LegendComponentOption
| DatasetComponentOption
>

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  BarChart,
  PieChart,
  RadarChart,
  CanvasRenderer
])

// export to global.d.ts
export const chart = {
  /**
   * Initializes an ECharts instance on a given HTMLDivElement.
   *
   * @param element - The HTMLDivElement to initialize the ECharts instance on.
   * @returns The initialized ECharts instance.
   * @see https://echarts.apache.org/en/api.html#echarts.init
   */
  init: (element: HTMLDivElement, theme?: string, options?: echarts.EChartsInitOpts) => {
    return echarts.init(element, theme, options) as echarts.ECharts
  },

  /**
   * Configuration item, data, universal interface, all parameters and data can all be modified through setOption. ECharts will merge new parameters and data, and then refresh chart. If animation is enabled, ECharts will find the difference between two groups of data and present data changes through proper animation.
   *
   * @param optionData - The option data to be merged.
   * @returns The chart instance itself.
   * @see https://echarts.apache.org/en/api.html#echartsInstance.setOption
   */
  setOption: (optionData: ECOption) => {
    return chart.setOption(optionData)
  },
  
  /**
   * Resizes chart, which should be called manually when container size changes.
   *
   * @see https://echarts.apache.org/en/api.html#echartsInstance.resize
   */
  resize: () => {
    chart.resize()
  },

  /**
   * Clear the chart data and components.
   * @see https://echarts.apache.org/en/api.html#echartsInstance.clear
   */
  clear: () => { 
    chart.clear()
  },
  
  /**
   * Disposes instance. Once disposed, the instance can not be used again.
   * @see https://echarts.apache.org/en/api.html#echartsInstance.dispose
   */
  dispose: () => {
    chart.dispose()
  }
}

// Symbol !== Symbol.for
// Symbol 每次的 reference 都會不一樣，所以會 mapping 不起來
const injectKey = 'chartPlugin'

// Vincent 說不要耍智障了，沒有 inject 還想要用啊
// 要用的時候再注入，沒有全局引用
export const useChart = () => {
  return inject(injectKey) as typeof chart
}

export const chartPlugin: Plugin = {
  install: (app: App<Element>) => {
    app.config.globalProperties.$chart = chart
    app.provide(injectKey, chart)
  }
}