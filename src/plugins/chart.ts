import { ECharts, ComposeOption, use, init } from 'echarts/core'
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

type ECOption = ComposeOption<
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

use([
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

const useChart = (element: HTMLDivElement) => {
  const chart: ECharts = init(element)
  /**
   * Configuration item, data, universal interface, all parameters and data can all be modified through setOption. ECharts will merge new parameters and data, and then refresh chart. If animation is enabled, ECharts will find the difference between two groups of data and present data changes through proper animation.
   *
   * @param optionData - The option data to be merged.
   * @returns The chart instance itself.
   * @see https://echarts.apache.org/en/api.html#echartsInstance.setOption
   */
  const setOption = (optionData: ECOption) => {
    return chart.setOption(optionData)
  }
  
  /**
   * Resizes chart, which should be called manually when container size changes.
   *
   * @see https://echarts.apache.org/en/api.html#echartsInstance.resize
   */
  const resize = () => {
    chart.resize()
  }

  /**
   * Clear the chart data and components.
   * @see https://echarts.apache.org/en/api.html#echartsInstance.clear
   */
  const clear = () => { 
    chart.clear()
  }
  
  /**
   * Disposes instance. Once disposed, the instance can not be used again.
   * @see https://echarts.apache.org/en/api.html#echartsInstance.dispose
   */
  const dispose = () => {
    chart.dispose()
  }

  return {
    setOption,
    resize,
    clear,
    dispose
  }
}

export default useChart