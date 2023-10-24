import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': './src'
    }
  },
  server: {
    hmr: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(modulePath) {
          if (modulePath.includes('node_modules')) {
            // 将依赖的第三方库打包到单独的代码块中
            return 'vendor';
          } else if (modulePath.includes('src/components')) {
            // 将 src/components 目录下的组件打包到单独的代码块中
            return 'components';
          }
        },
      },
    },
  },
})
