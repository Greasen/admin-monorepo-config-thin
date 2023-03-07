import type { App } from 'vue'

import { nameSpace } from '~/config/name-space'

const modules = import.meta.glob('./modules/**/*.vue', { eager: true })

const components: any[] = []

Object.keys(modules).forEach((key) => {
  const mod = (modules[key] as Record<string, unknown>).default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  components.push(...modList)
})

export function registerGlobComp(app: App) {
  components.forEach((item) => {
    app.component(`${nameSpace.admin}${item.name}`, item)
  })
}
