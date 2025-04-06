<template>
  <li
    class="group rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
  >
    <div class="grid grid-cols-1 items-center gap-4 sm:grid-cols-12">
      <template
        v-for="column in columns"
        :key="column.field"
      >
        <div :class="column.span">
          <!-- 优先使用具名插槽 -->
          <slot
            v-if="$slots[column.field]"
            :name="column.field"
            :item="item"
            :config="column"
          />
          <!-- 默认组件渲染 -->
          <component
            v-else
            :is="getComponentType(column.type)"
            :item="item"
            :config="column"
            @open="openHandler"
          />
        </div>
      </template>

      <!-- 通用插槽备用 -->
      <slot
        name="custom"
        :item="item"
        :columns="columns"
      />
    </div>
  </li>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  item: Object,
  columns: Array,
})

const emit = defineEmits(['open'])

const getComponentType = (type) => {
  const components = {
    text: defineAsyncComponent(
      () => import('@/components/public/softList/ColumnTypes/TextColumn.vue'),
    ),
    badge: defineAsyncComponent(
      () => import('@/components/public/softList/ColumnTypes/BadgeColumn.vue'),
    ),
    download: defineAsyncComponent(
      () =>
        import('@/components/public/softList/ColumnTypes/DownloadColumn.vue'),
    ),
  }
  return components[type] || components.text
}

const openHandler = (url) => emit('open', url)
</script>
