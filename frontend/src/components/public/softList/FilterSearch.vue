<template>
  <div class="mb-6 rounded-lg bg-white p-4 shadow-sm">
    <!-- 筛选表单 -->
    <div class="flex flex-col items-end gap-4 md:flex-row">
      <!-- 动态生成筛选字段 -->
      <div
        v-for="(field, index) in fields"
        :key="index"
        class="w-full flex-1"
      >
        <!-- 输入框类型 -->
        <Input
          v-if="field.type === 'input'"
          v-model="localValue[field.key]"
          :placeholder="field.placeholder || `请输入${field.label}`"
          class="w-full focus-visible:ring-[1px] focus-visible:ring-blue-600"
        />

        <!-- 下拉选择类型 -->
        <Select
          v-else-if="field.type === 'select'"
          v-model="localValue[field.key]"
        >
          <SelectTrigger class="w-full">
            <SelectValue
              :placeholder="field.placeholder || `请选择${field.label}`"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{{ field.label }}</SelectLabel>
              <SelectItem
                v-for="(option, oIndex) in field.options"
                :key="oIndex"
                :value="option.value"
              >
                {{ option.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <!-- 操作按钮组 -->
      <div class="flex w-full gap-2 md:w-auto">
        <Button
          type="button"
          class="flex-1 cursor-pointer md:flex-none"
          @click="handleSearch"
        >
          <MagnifyingGlassIcon class="mr-2 h-4 w-4" />
          筛选查询
        </Button>
        <Button
          variant="outline"
          class="flex-1 cursor-pointer md:flex-none"
          @click="handleReset"
        >
          <ArrowPathIcon class="mr-2 h-4 w-4" />
          重置
        </Button>
      </div>
    </div>

    <!-- 快捷标签 -->
    <div
      v-if="quickTags"
      class="mt-4 flex flex-wrap gap-2"
    >
      <span
        v-for="(tag, index) in quickTags"
        :key="index"
        class="inline-flex cursor-pointer items-center rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600 hover:bg-blue-100"
        @click="handleQuickTag(tag)"
      >
        {{ tag.label }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MagnifyingGlassIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  // 筛选字段配置
  fields: {
    type: Array,
    default: () => [],
  },
  // 快速筛选标签
  quickTags: {
    type: Array,
    default: () => [],
  },
  // 双向绑定值
  modelValue: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:modelValue', 'search'])

// 本地值处理
const localValue = ref({ ...props.modelValue })

// 同步外部值变化
watch(
  () => props.modelValue,
  (newVal) => {
    localValue.value = { ...newVal }
  },
)

// 处理搜索
const handleSearch = () => {
  emit('update:modelValue', localValue.value)
  emit('search', localValue.value)
}

// 处理重置
const handleReset = () => {
  localValue.value = {}
  handleSearch()
}

// 处理快捷标签
const handleQuickTag = (tag) => {
  localValue.value = { ...localValue.value, ...tag.value }
  handleSearch()
}
</script>
