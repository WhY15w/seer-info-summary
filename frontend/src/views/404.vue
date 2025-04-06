<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-sky-900"
  >
    <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <!-- 错误容器 -->
      <div class="relative mx-auto max-w-3xl text-center">
        <!-- 动态数字 -->
        <h1
          class="animate-gradient mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-9xl font-black text-transparent sm:text-[12rem]"
        >
          404
        </h1>

        <!-- 描述文字 -->
        <p class="mb-8 text-3xl font-semibold text-white sm:text-4xl">
          你似乎闯入了宇宙的暗物质区域
        </p>

        <!-- 返回按钮 -->
        <button
          class="rounded-full bg-gradient-to-r from-sky-500 to-purple-500 px-8 py-4 font-medium text-white shadow-lg transition-all hover:cursor-pointer hover:from-sky-600 hover:to-purple-600 hover:shadow-xl"
          @click="router.push('/')"
        >
          返回安全区域
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style>
/* 保留之前的动画样式 */
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
