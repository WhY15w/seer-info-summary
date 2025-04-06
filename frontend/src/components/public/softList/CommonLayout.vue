<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <!-- Toaster -->
    <Toaster
      richColors
      class="opacity-90"
    />
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <!-- 标题区域 -->
      <div
        class="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row"
      >
        <div></div>
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-800 sm:text-4xl">
            {{ title }}
          </h1>
          <p class="mt-2 text-gray-600">{{ description }}</p>
        </div>

        <!-- 返回按钮 -->
        <button
          @click="router.push('/')"
          class="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-white shadow-lg transition-all hover:cursor-pointer hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl"
        >
          <ArrowLeftIcon class="h-5 w-5 stroke-2"></ArrowLeftIcon>
          <span>返回首页</span>
        </button>
      </div>

      <!-- 插槽 -->
      <slot name="header"></slot>

      <!-- 表头 -->
      <div
        v-if="headers"
        class="mb-4 hidden rounded-lg bg-white px-6 py-3 shadow-sm sm:grid sm:grid-cols-12"
      >
        <div
          v-for="(header, index) in headers"
          :key="index"
          class="text-center text-sm font-medium text-gray-500"
          :class="header.span"
        >
          {{ header.text }}
        </div>
      </div>

      <!-- 内容插槽 -->
      <slot></slot>

      <!-- 空状态 -->
      <EmptyState
        v-if="showEmpty"
        :title="emptyTitle"
        :description="emptyDescription"
      />
    </div>
  </div>
</template>

<script setup>
import { Toaster } from 'vue-sonner'
import router from '@/router'
import EmptyState from './EmptyState.vue'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

defineProps({
  title: String,
  description: String,
  headers: Array,
  showEmpty: Boolean,
  emptyTitle: {
    type: String,
    default: '暂无数据',
  },
  emptyDescription: {
    type: String,
    default: '请稍后再试或联系管理员',
  },
})
</script>
