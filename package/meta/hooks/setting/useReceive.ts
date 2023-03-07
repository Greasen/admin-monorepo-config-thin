import type { App } from 'vue'

const modules = import.meta.glob('../../../../package/*/index.ts', { eager: true })

/**
 * @Description 读取子工作空间的输出
 * @date 2022-11-10
 * @param {any} app:App
 * @returns {any}
 */
export function useReceive(app: App) {
  Object.keys(modules).forEach((key) => {
    const mod = (modules[key] as any).default || {}
    mod(app)
  })
}
