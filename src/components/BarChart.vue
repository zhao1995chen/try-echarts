<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  DatasetComponentOption,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  BarChart,
  GridComponent,
  DatasetComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
])

const { datasetData } = defineProps<{
  datasetData: DatasetComponentOption
}>()

const chartRef = ref<HTMLDivElement | null>(null)
let barChart: echarts.ECharts | null = null

function initChart() {
  if (chartRef.value) {
    barChart = echarts.init(chartRef.value) // 暗黑模式，也可自行定義主題

    const option = {
      legend: {},
      tooltip: {},
      dataset: datasetData,
      xAxis: {
        type: 'category',
      },
      yAxis: {},
      series: [
        { type: 'bar' },
        {
          type: 'bar',
          // 柱條樣式透過 itemStyle 設定
          itemStyle: {
            borderRadius: 10,
            borderWidth: 3,
            borderType: 'dashed',
            borderColor: '#73c0de',
            shadowColor: '#5470c6',
            shadowBlur: 3,
            // 柱條寬高由 barWidth barHeight 設定
            // 但如果有多個系列，橫向空間會共用，會導致 barWidth 設定無效
          },
        },
        {
          type: 'bar',
          // 當 colorBy 設定為 data，每個柱條會使用不同顏色
          colorBy: 'data',
          showBackground: true,
        },
      ],
    }

    barChart.setOption(option)
  }
}

function resizeChart() {
  if (barChart) {
    barChart.resize() // echartsInstance 內建函數，可帶參數 resize({ width: number, height: number })
  }
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  if (barChart) {
    barChart.dispose() // 銷毀物件
  }
})
</script>
<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}
</style>
