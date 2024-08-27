# Try ECharts

## Intro

在近期的開發中需要圖表的呈現，Element Plus 及已開發的組件沒有這個功能，所以找了 eCharts 進行組件製作。
在網路上找到 eCharts 結合 Vue 的 plugin，但考量到以往開發過程中曾經歷原始 plugin 更新但結合 Vue 的擴充 plugin 尚未更新無法使用新功能，這次選擇直接使用 eCharts 進行組件開發。

## 安裝

```bash
pnpm add echarts
```

## 概念

### 按需引入

在 v4 升級到 v5 的官方文件中提及

- v5 移除對 `default export` 的支援，更改了引用方式。

```ts
// v4 引用方式

import echarts from 'echarts'
// 或者按需引入
import echarts from 'echarts/lib/echarts'
```

```ts
// v5 引用方式

import * as echarts from 'echarts'
// 按需引入
import * as echarts from 'echarts/lib/echarts'
```

- 引用路徑不支援從 `echarts/src`，需改由 `echarts/lib` 引用。
- 推薦使用按需引入的方式引用 eCharts 模塊：方便使用者自行決定引入哪些模塊，最大程度地利用打包工具 tree-shaking 的能力。
  - 柱狀圖不再默認引入直角坐標系，需要引用 Grid。
  - 新的接口中默認不再包含渲染器，如果需要使用 Canvas 渲染模式則使用 CanvasRenderer，需要使用 SVG 渲染模式則使用 SVGRenderer。

```ts
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([BarChart, GridComponent, CanvasRenderer])
```

## 數據集

雖然在 `series.data` 可以設置數據，但在 v4 之後也可以使用 `dataset` 進行數據管理，這樣數據與圖表配置分離，可以被多個組件複用。

#### 利用 `series.data` 進行給值設定

```ts
option = {
  xAxis: {
    type: 'category',
    data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie'],
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      name: '2015',
      data: [89.3, 92.1, 94.4, 85.4],
    },
    {
      type: 'bar',
      name: '2016',
      data: [95.8, 89.4, 91.2, 76.9],
    },
    {
      type: 'bar',
      name: '2017',
      data: [97.7, 83.1, 92.5, 78.1],
    },
  ],
}
```

#### 利用 `dataset` 進行給值設定

```ts
option = {
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
  // 默認情況下，category 對應到 dataset 的第一列，也就是 'Matcha Latte' 'Milk Tea' 'Cheese Cocoa' 'Walnut Brownie'
  xAxis: { type: 'category' },
  yAxis: {},
  // 宣告多個 bar 的系列在默認狀況下，每個系列會自動對應到 dataset 的每一列對應位置，也就是 '2015' '2016' '2017' 為系列，其在每一行中的相斯斯應位置即為其數據
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
}
```

## 常用 API

### 物件實體化

```ts
echarts.init(dom?: HTMLDivElement|HTMLCanvasElement, theme?: Object|string, opts?: {
  devicePixelRatio?: number,
  renderer?: string,
  useDirtyRect?: boolean,     // `5.0.0`
  useCoarsePointer?: boolean, // `5.4.0`
  pointerSize?: number,       // `5.4.0`
  ssr?: boolean,              // `5.3.0`
  width?: number|string,
  height?: number|string,
  locale?: string             // `5.0.0`
}) => ECharts
```

| Attrs   | Details       |
| ------- | ------------- |
| `dom`   | 綁定 DOM 元素 |
| `theme` | 給定主題      |
| `opts`  | 配置參數      |

> 如果 DOM 元素是隱藏的，ECharts 會獲取不到容器寬高初始化失敗，要避免要給定 DOM 元素的 `style.width` 及 `style.height`，或是在 DOM 元素顯示後呼叫 `echartsInstance.resize` 調整。

> 若 DOM 元素是在 `resize` 才給寬高，ref 的父元素要有明確的寬高，ECharts 會獲取不到容器寬高初始化失敗。

### 配置參數

```ts
echartsInstance.setOption(option: Object, notMerge?: boolean, lazyUpdate?: boolean)
// or
echartsInstance.setOption(option: Object, opts?: {
  notMerge?: boolean;
  replaceMerge?: string | string[];
  lazyUpdate?: boolean;
  silent?: boolean;
})
```

| Attrs          | Details                                                                                             |
| -------------- | --------------------------------------------------------------------------------------------------- |
| `notMerge`     | 若 `false` 會跟之前設置的 `option` 進行合併，若 `true` 原本的組件會被刪除，再根據新 option 創建組件 |
| `replaceMerge` | 可指定一個或多個組件進行刪除                                                                        |
| `lazyUpdate`   | 若 `true` 會在下一個 animation frame 才更新                                                         |
| `silent`       | 若 `false` 阻止調用 `setOption` 時的拋出事件，若 `true` 會拋出事件                                  |

合併規則中有分普通合併及替換合併，官方文件中有進行描述，若後續有實作再補充。

### 容器大小配置

```ts
echartsInstance.resize(opts?: {
  width?: number|string,
  height?: number|string,
  silent?: boolean,
  animation?: {
    duration?: number
    easing?: string
  }
}) => ECharts
```

常用於容器本身大小改變時，圖表也進行大小改變。

> 若頁面大小沒有發生改變，`echartsInstance.resize` 不會被觸發，可以利用 `ResizeObserver` API 進行監聽觸發。

#### 圖表物件銷毀

```ts
echartsInstance.dispose()
```

銷毀後要使用 `echarts.init` 再次初始化。

## 封裝

隨著使用的圖表越來越多，每次都要在新增的組件中進行大致相同的按需引入，所以進行封裝，之後無論使用的圖表類型，都是使用 `Chart.vue` 組件，後續如果有新的圖表需求在 `plugins/chart.ts` 中新增引用後不用再對 `Chart.vue` 進行調整即可直接使用。

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
