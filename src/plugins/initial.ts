import { App } from 'vue'
import { chartPlugin } from './chart'

export const APP_INITIAL = (app : App<Element>) => {
  console.log('APP_INITIAL', chartPlugin)
  app.use(chartPlugin)

  return app
}