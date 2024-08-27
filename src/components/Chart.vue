<template>
  <div ref="chartRef" class="chart-container"></div>
</template>
<script setup lang="ts">
import useChart from '../plugins/chart'

const { optionData } = defineProps<{
  optionData: any
}>()

const chartRef = ref<HTMLDivElement>(null)
let chart

onMounted(() => {
  if (!chartRef.value) return
  chart = useChart(chartRef.value)
  chart.setOption(optionData)
  window.addEventListener('resize', chart.resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', chart.resize)
  chart.dispose()
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 600px;
}
</style>
