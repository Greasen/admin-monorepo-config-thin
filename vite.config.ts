import { defineConfig } from 'vite'
import viewport from 'postcss-px-to-viewport-8-plugin'
import { createVitePlugins } from './internal/build/plugins'
import { createViteAlias } from './internal/build/alias'
import { resolve } from 'path'
import out from './package/service/build.config'

const pxToVw = viewport({
  propList: ['*'],
  viewportWidth: 1920,
  unitPrecision: 5,
  viewportUnit: 'vw',
  fontViewportUnit: 'vw',
  selectorBlackList: [],
  exclude: [/node_modules/],
  minPixelValue: 1,
  mediaQuery: false,
})

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: '0.0.0.0',
    port: 9902,
    hmr: {
      overlay: true,
    },
    cors: true,
    open: false,
  },
  build: {
    target: 'es2015', // modules es2015
    outDir: out.build.outDir || '',
    assetsDir: 'static',
    // 解决 按需引入组件和样式的时候，打包后正常，打开打包后，运行地址，网页报错 Cannot access ‘e‘ before initialization
    commonjsOptions: {
      requireReturnsDefault: 'namespace',
    },
    minify: 'terser',
    assetsInlineLimit: 8 * 1024,
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: false,
      },
    },
    // 文件超过大小警告
    chunkSizeWarningLimit: 2048,
    reportCompressedSize: false,
    // 自定义底层的 Rollup 打包配置
    rollupOptions: {
      input: {
        // 入口文件
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    }
  },
  // 强制预构建
  // optimizeDeps: {
  //   force: true,
  // },
  resolve: {
    alias: createViteAlias(),
  },
  css: {
    preprocessorOptions: {
      // 导入 sass 变量
      scss: {
        additionalData: '@use "~/styles/common/variables.scss" as *; @use "~/styles/function.scss" as *; @use "$/styles/variables.scss" as *;',
      },

    },
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset')
                atRule.remove()
            },
          },
        },
        pxToVw,
      ],
    },
  },
  plugins: createVitePlugins(),
})
