import type { App } from 'vue'
import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import QifElementPlus from '@qif/element-plus'
import '@qif/element-plus/theme-chalk/src/index.scss'
import locale from 'element-plus/dist/locale/zh-cn.mjs'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import AppDom from './App.vue'
import { useReceive } from './hooks/setting/useReceive'
import { setupRouter } from '~/router'
import { setupStore } from '~/store'

import 'element-plus/dist/index.css'
import '@qif/element-plus/dist/index.css'

import './styles/index.scss'

import '@qif/dsa-icon'

import './mock'

async function bootstrap() {

  const app: App = createApp(AppDom)

  // Configure routing
  setupRouter(app)

  // Configure store
  setupStore(app)

  // read wokerspace export
  useReceive(app)

  // Configure directives
  // setupGlobDirectives(app)

  app.use(ElementPlus, {
    locale,
  })

  app.use(QifElementPlus)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(`ElIcon${key}`, component)
  }


  app.mount('#app')
}

bootstrap()

