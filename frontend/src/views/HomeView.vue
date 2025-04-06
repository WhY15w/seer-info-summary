<template>
  <div
    class="min-h-screen bg-gradient-to-b from-blue-900 via-indigo-800 to-purple-900"
  >
    <Toaster
      richColors
      position="top-right"
      class="opacity-90"
    />
    <div class="mx-auto max-w-3xl px-4 pt-8">
      <!-- 标题 -->
      <h1
        class="animate-gradient mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-center text-5xl font-extrabold text-transparent"
      >
        赛尔号信息聚合页
      </h1>
      <div
        class="mr-10 mb-4 flex cursor-pointer items-center justify-end text-white/60 hover:text-white/80"
        @click="goToSrc"
      >
        <LinkIcon class="mr-1 inline-block h-4 w-4"></LinkIcon>
        <span>开源地址</span>
      </div>

      <!-- 导航卡片 -->
      <div class="space-y-6">
        <div
          v-for="item in navItems"
          :key="item.path"
          class="group relative transform cursor-pointer rounded-3xl bg-white/10 p-5 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-2xl hover:shadow-indigo-500/30"
          @click="router.push(item.path)"
        >
          <!-- 渐变边框 -->
          <div
            class="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/30 to-cyan-400/30 opacity-0 transition-opacity group-hover:opacity-100"
          ></div>

          <!-- 内容 -->
          <div class="relative z-10 text-center">
            <h3 class="mb-2 text-2xl font-semibold text-white">
              {{ item.title }}
            </h3>
            <p class="text-sm text-indigo-200 opacity-80">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <footer class="mt-8 pb-8 text-center">
      <div class="mx-auto max-w-3xl px-4">
        <p
          class="text-sm text-white/60 italic transition-colors hover:text-white/80"
        >
          © 2025 𝓗𝓾𝓻𝓻𝔂𝓦𝓪𝓷𝓰 · Made with ❤️ by 聿聿
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import router from '@/router'
import { LinkIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import { toast, Toaster } from 'vue-sonner'

const navItems = ref([
  {
    title: '官方动态',
    desc: '赛尔号B站图文动态',
    path: '/bilibili',
  },
  {
    title: '雷小伊专区',
    desc: '雷小伊相关软件下载链接',
    path: '/lxy',
  },
  {
    title: '重聚系列',
    desc: '重聚系列相关软件下载链接',
    path: '/cj',
  },
  {
    title: '插件中心',
    desc: '重聚系列DLL插件扩展',
    path: '/plugin',
  },
])

const goToSrc = () => {
  // toast.warning('项目尚未完成, 完成后将开源')
  window.open('https://gitee.com/yuyuqaq/seer-info-summary')
}
</script>

<style>
.animate-gradient {
  background-size: 300% 100%;
  animation: gradientAnimation 5s ease infinite;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
