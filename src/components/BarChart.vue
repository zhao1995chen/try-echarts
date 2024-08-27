<template>
  <div ref="chartRef2" class="chart-container"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
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

const chartRef2 = ref<HTMLDivElement | null>(null)
let barChart: echarts.ECharts | null = null

function initChart() {
  if (chartRef2.value) {
    barChart = echarts.init(chartRef2.value) // 暗黑模式，也可自行定義主題

    const option = {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ['product', '2015', '2016', '2017'],
          ['Matcha Latte', 43.3, 85.8, 93.7],
          ['Milk Tea', 83.1, 73.4, 55.1],
          ['Cheese Cocoa', 86.4, 65.2, 82.5],
          ['Walnut Brownie', 72.4, 53.9, 39.1],
        ],
      },
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
            barBorderRadius: 10,
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
  nextTick(() => {
    initChart()
    window.addEventListener('resize', resizeChart)
  })
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
