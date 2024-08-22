<template>
  <LineChart :series-data="seriesData" />
</template>

<script setup lang="ts">
const seriesData = {
  DEV: [100, 89, 67, 54, 40, 82],
  STG: [18, 17, 24],
  UAT: [33, 29, 67, 54],
  PROD: [10, 38, null, 88, 92],
}
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
}
</style>
