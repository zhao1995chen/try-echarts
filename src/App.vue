<template>
  <LineChart :series-data="seriesData" />
  <BarChart />
  <LineChart :series-data="lineSeriesData" />
  <BarChart :dataset-data="barDatasetData" />
</template>

<script setup lang="ts">
const lineSeriesData = {
  DEV: [100, 89, 67, 54, 40, 82],
  STG: [18, 17, 24],
  UAT: [33, 29, 67, 54],
  PROD: [10, 38, null, 88, 92],
}

const barDatasetData = {
  source: [
    ['product', '2015', '2016', '2017'],
    ['Matcha Latte', 43.3, 85.8, 93.7],
    ['Milk Tea', 83.1, 73.4, 55.1],
    ['Cheese Cocoa', 86.4, 65.2, 82.5],
    ['Walnut Brownie', 72.4, 53.9, 39.1],
  ],
}
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}
</style>
