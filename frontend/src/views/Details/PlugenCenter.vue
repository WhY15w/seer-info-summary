<template>
  <CommonLayout
    title="重聚插件中心"
    description="发现优质插件，提升蛆赛效率"
    :headers="headers"
    :show-empty="!dataInfo?.length"
  >
    <template #header>
      <FilterSearch
        v-model="filterValues"
        :fields="filterFields"
        :quick-tags="quickTags"
        @search="getInfo"
      />
    </template>
    <ul class="space-y-3">
      <PluginListItem
        v-for="(item, index) in dataInfo"
        :key="index"
        :item="item"
        :columns="columns"
        @open="goToUrl"
      >
        <template #name="{ item }">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger :as-child="true">
                <div class="flex cursor-pointer items-center">
                  <Badge
                    class="mr-2 w-10 bg-gradient-to-r from-pink-500 to-rose-500 shadow-sm"
                    v-if="item.new"
                    variant="destructive"
                  >
                    New
                  </Badge>
                  <div
                    v-else
                    class="mr-3 hidden h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 sm:flex"
                  >
                    <BoltIcon class="h-5 w-5"></BoltIcon>
                  </div>
                  <div class="overflow-hidden text-ellipsis whitespace-nowrap">
                    <h3
                      class="truncate font-medium text-gray-900 group-hover:text-blue-600"
                    >
                      {{ item.name }}
                    </h3>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent class="w-64 p-3 text-sm">
                <div class="mb-2 text-center font-bold">{{ item.name }}</div>
                <div
                  class="whitespace-pre-line before:content-['📢']"
                  v-html="item.des"
                ></div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </template>
      </PluginListItem>
    </ul>
  </CommonLayout>
</template>

<script setup>
import axios from '@/utils/axios'
import { ref, onMounted } from 'vue'
import CommonLayout from '@/components/public/softList/CommonLayout.vue'
import PluginListItem from '@/components/public/softList/PluginListItem.vue'
import FilterSearch from '@/components/public/softList/FilterSearch.vue'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { BoltIcon } from '@heroicons/vue/24/solid'

// 配置项集中管理
const headers = [
  { text: '插件名称', span: 'col-span-2 text-left ml-8' },
  { text: '作者', span: 'col-span-2' },
  { text: '类型', span: 'col-span-2' },
  { text: '下载', span: 'col-span-2' },
  { text: '密码', span: 'col-span-2' },
  { text: '更新时间', span: 'col-span-2' },
]

const columns = [
  { field: 'name', span: 'sm:col-span-2' },
  {
    field: 'author',
    span: 'sm:col-span-2 flex justify-center',
    type: 'text',
    icon: 'user',
  },
  {
    field: 'type',
    span: 'sm:col-span-2 text-center',
    type: 'badge',
    color: 'green',
  },
  { field: 'download', span: 'sm:col-span-2 text-center', type: 'download' },
  {
    field: 'psd',
    span: 'sm:col-span-2 text-center -ml-[1rem]',
    type: 'badge',
    color: 'purple',
    icon: true,
    copy: true,
  },
  {
    field: 'wtime',
    span: 'sm:col-span-2 text-center',
    type: 'badge',
    color: 'gray',
  },
]

const filterFields = ref([
  {
    key: 'name',
    label: '插件名称',
    type: 'input',
    placeholder: '输入插件名称...',
  },
  {
    key: 'author',
    label: '插件作者',
    type: 'select',
    options: [],
  },
  {
    key: 'type',
    label: '插件类型',
    type: 'select',
    options: [],
  },
  {
    key: 'sort',
    label: '排序方式',
    type: 'select',
    options: [
      { value: 1, label: '最新优先' },
      { value: -1, label: '最旧优先' },
    ],
  },
])

const quickTags = [
  {
    label: '最新',
    value: {
      sort: 1,
    },
  },
  {
    label: '最旧',
    value: {
      sort: -1,
    },
  },
  {
    label: '难留',
    value: {
      author: '难留',
    },
  },
  {
    label: '清瞳',
    value: {
      author: '清瞳/好',
    },
  },
  {
    label: '聿聿',
    value: {
      author: '聿聿',
    },
  },
]
const filterValues = ref({})
const dataInfo = ref([])

const updateFilterOptions = (fieldKey, dataKey) => {
  const field = filterFields.value.find((f) => f.key === fieldKey)
  if (!field) return

  const optionsSet = new Set(
    dataInfo.value.map((item) => item[dataKey]).filter(Boolean),
  )
  field.options = Array.from(optionsSet).map((value) => ({
    value,
    label: value,
  }))
}

// 默认倒序
const getInfo = async (searchParams = { sort: 1 }) => {
  try {
    const {
      data: { data: listData = [] },
    } = await axios.get('/getPluginCenterInfo', {
      params: searchParams,
    })

    dataInfo.value = listData
    updateFilterOptions('author', 'author')
    updateFilterOptions('type', 'type')
  } catch (error) {
    console.error('获取重聚插件中心数据失败:', error)
    dataInfo.value = []
  }
}

const goToUrl = (url) => window.open(url, '_blank')

onMounted(getInfo)
</script>
