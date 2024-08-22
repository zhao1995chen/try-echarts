<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'

const { seriesData } = defineProps<{
  seriesData: Record<string, (number | null)[]>
}>()

const xAxisData = computed(() => {
  const maxLength = Math.max(
    ...Object.values(seriesData).map((arr) => arr.length)
  )
  return Array.from({ length: maxLength }, (_, index) => `第 ${index + 1} 回合`)
})

const series = computed(
  () =>
    Object.entries(seriesData).map(([key, value]) => {
      return {
        name: key,
        type: 'line',
        smooth: true,
        data: value,
      } as echarts.LineSeriesOption
    }) as echarts.LineSeriesOption[]
)

const legend = computed(() => Object.keys(seriesData))

const chartRef = ref<HTMLDivElement | null>(null)
let lineChart: echarts.ECharts | null = null

function initChart() {
  if (chartRef.value && xAxisData.value && series.value && legend.value) {
    lineChart = echarts.init(chartRef.value, 'dark') // 暗黑模式，也可自行定義主題

    const option: echarts.EChartsOption = {
      // title: {
      // text: 'XXX 專案',
      // },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: legend.value,
        top: 20,
      },
      xAxis: {
        // type: 'category', // 可透過 data 判斷 type 是 category，也可省略
        data: xAxisData.value,
      },
      yAxis: {
        // type: 'value', // default type，可省略
        // axisLabel: {
        //   color: '#fff',
        // interval: 0, // 顯示所有標籤
        // },
      },
      series: series.value,
    }

    lineChart.setOption(option)
  }
}

function resizeChart() {
  if (lineChart) {
    lineChart.resize() // echartsInstance 內建函數，可帶參數 resize({ width: number, height: number })
  }
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  if (lineChart) {
    lineChart.dispose() // 銷毀物件
  }
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}
</style>
