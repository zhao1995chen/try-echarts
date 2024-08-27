<template>
  <h2>直接在元件中按需引用</h2>
  <LineChart :series-data="lineSeriesData" />
  <BarChart :dataset-data="barDatasetData" />
  <h2>使用封裝後的 useChart</h2>
  <Chart :option-data="chartOptionData" />
  <Chart :option-data="pieOptionData" />
  <Chart :option-data="pieOptionData2" />
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

const chartOptionData = {
  legend: {},
  tooltip: {},
  xAxis: {
    type: 'category',
  },
  yAxis: {},
  dataset: {
    source: [
      ['product', '2015', '2016', '2017'],
      ['Matcha Latte', 43.3, 85.8, 93.7],
      ['Milk Tea', 83.1, 73.4, 55.1],
      ['Cheese Cocoa', 86.4, 65.2, 82.5],
      ['Walnut Brownie', 72.4, 53.9, 39.1],
    ],
  },
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
}

const pieOptionData = {
  title: {
    text: '銷售分佈',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    right: 'right',
  },
  dataset: {
    source: [
      ['類別', '銷售額'],
      ['電子產品', 1048],
      ['服裝', 735],
      ['雜貨', 580],
      ['書籍', 484],
      ['其他', 300],
    ],
  },
  series: [
    {
      name: '銷售額',
      type: 'pie',
      radius: '50%', // 配置陣列可顯示為圓環圖
      encode: {
        itemName: '類別', // 將 '類別' 列映射到每個扇形的名稱
        value: '銷售額', // 將 '銷售額' 列映射到每個扇形的數值
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
}

const pieOptionData2 = {
  title: {
    text: '成績人數',
    left: 'center',
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data: ['A', 'B', 'C', 'D', 'E'],
  },
  tooltip: {},
  series: [
    {
      type: 'pie',
      radius: ['30%', '60%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
      },
      labelLine: {
        show: false,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold',
        },
      },
      data: [
        { value: 335, name: 'A' },
        { value: 310, name: 'B' },
        { value: 234, name: 'C' },
        { value: 135, name: 'D' },
        { value: 1548, name: 'E' },
      ],
    },
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
