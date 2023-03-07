import { resolve } from 'path'
import type { Alias } from 'vite'

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}

/**
 * @Description 路径别名
 * @date 2022-10-14
 * @returns {any}
 */
export function createViteAlias() {
  const viteAlias: Alias[] | { [find: string]: string } = [
    {
      find: '/#/',
      replacement: pathResolve('../../package/meta/types/'),
    },
    {
      find: '~',
      replacement: pathResolve('../../package/meta/'),
    },
    {
      find: '/@/',
      replacement: `${pathResolve('../../package')}/`,
    },
    {
      find: '$',
      replacement: `${pathResolve('../../package/service')}/`,
    },
  ]

  return viteAlias
}
