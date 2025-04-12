<template>
  <div
    class="min-h-screen bg-gradient-to-b from-blue-900 via-indigo-800 to-purple-900"
  >
    <Toaster
      richColors
      position="top-right"
      class="opacity-90"
    />
    <slot name="main"></slot>
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
import { Toaster } from 'vue-sonner'
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
