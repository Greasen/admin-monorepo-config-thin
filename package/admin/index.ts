import type { App } from 'vue'
import { registerGlobComp } from './components'

export default function exportSpace(app: App) {
  registerGlobComp(app)
}
