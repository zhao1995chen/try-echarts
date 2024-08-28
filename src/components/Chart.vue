<template>
  <div ref="chartRef" class="chart-container"></div>
</template>
<script setup lang="ts">
const { optionData } = defineProps<{
  optionData: ECOption
}>()

const chartRef = ref<HTMLDivElement>(null)
let chart: Chart

onMounted(() => {
  if (!chartRef.value) return

  // 初始化後可以選擇用 ECharts 的 methods 或 chart.ts 也有封裝過的方法
  const { init } = useChart()

  chart = init(chartRef.value)
  chart.setOption(optionData)
  window.addEventListener('resize', () => chart.resize())
})

onUnmounted(() => {
  window.removeEventListener('resize', () => chart.resize())
  chart.dispose()
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 600px;
}
</style>
