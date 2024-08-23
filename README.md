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

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
