import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    viteCompression({
      algorithm: 'gzip',
      threshold: 10240,
      verbose: true, // 是否在控制台中输出压缩结果
      ext: '.gz',
      deleteOriginFile: false, // 源文件压缩后是否删除
    }),
  ],
  server: {
    // 端口号
    port: 5222,
    open: false,
  },
  base: process.env.NODE_ENV === 'production' ? '/seerinfo/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
      },
    },
    esbuild: {
      drop: ['console', 'debugger'],
    },
    outDir: 'dist/seerinfo',
  },
})
