<template>
  <span
    :class="`inline-flex items-center rounded-full ${colorVariants[color]} px-3 py-1 text-sm font-medium`"
    @click="copyHandler(item[config.field])"
  >
    <slot
      name="badgeIcon"
      v-if="config.icon"
    >
      <KeyRound
        :stroke-width="1.5"
        class="mr-1 h-4 w-4"
      />
    </slot>
    {{ item[config.field] }}
  </span>
</template>

<script setup>
import { KeyRound } from 'lucide-vue-next'
import { computed } from 'vue'
import { toast } from 'vue-sonner'

const props = defineProps({
  item: Object,
  config: Object,
})

const copyHandler = (text) => {
  if (props.config.copy) {
    navigator.clipboard.writeText(text).then(toast.success('密码复制成功！'))
  }
}
const colorVariants = {
  green: 'bg-green-50 text-green-700',
  purple: 'bg-purple-50 text-purple-700',
  gray: 'bg-gray-50 text-gray-700',
}

const color = computed(() => props.config.color || 'gray')
</script>
