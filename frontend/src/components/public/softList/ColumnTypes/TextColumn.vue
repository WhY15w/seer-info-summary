<!-- TextColumn.vue -->
<template>
  <div class="flex items-center">
    <div
      v-if="config.icon === 'name'"
      class="mr-3 hidden h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 sm:flex"
    >
      <slot name="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clip-rule="evenodd"
          />
        </svg>
        <BoltIcon class="h-5 w-5"></BoltIcon>
      </slot>
    </div>
    <div
      v-else
      class="flex items-center justify-center text-gray-600"
    >
      <slot name="icon">
        <User class="mr-1 h-4 w-4 text-gray-400"></User>
      </slot>
    </div>
    <div class="overflow-hidden text-ellipsis whitespace-nowrap">
      <h3 class="truncate font-medium text-gray-900 group-hover:text-blue-600">
        {{ item[config.field] }}
      </h3>
    </div>
  </div>
</template>

<script setup>
import { BoltIcon } from '@heroicons/vue/24/solid'
import { User } from 'lucide-vue-next'

defineProps({
  item: Object,
  config: Object,
})
</script>
