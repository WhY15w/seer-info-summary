<template>
  <CommonLayout
    title="雷小伊专区"
    description="发现优质软件，提升蛆赛效率"
    :headers="headers"
    :show-empty="!dataInfo || dataInfo.length === 0"
  >
    <ul class="space-y-3">
      <PluginListItem
        v-for="(item, index) in dataInfo"
        :key="index"
        :item="item"
        :columns="columns"
        @open="goToUrl"
      />
    </ul>
  </CommonLayout>
</template>

<script setup>
import axios from '@/utils/axios'
import { ref, onMounted } from 'vue'
import CommonLayout from '@/components/public/softList/CommonLayout.vue'
import PluginListItem from '@/components/public/softList/PluginListItem.vue'

// 公共逻辑复用
const headers = [
  { text: '插件名称', span: 'col-span-4 text-left ml-8' },
  { text: '类型', span: 'col-span-2' },
  { text: '下载', span: 'col-span-3' },
  { text: '更新时间', span: 'col-span-3' },
]

const columns = [
  {
    field: 'name_all',
    span: 'sm:col-span-4',
    type: 'text',
    icon: 'bolt',
  },
  {
    field: 'icon',
    span: 'sm:col-span-2 text-center',
    type: 'badge',
    color: 'green',
  },
  {
    field: 'url',
    span: 'sm:col-span-3 text-center',
    type: 'download',
  },
  {
    field: 'time',
    span: 'sm:col-span-3 text-center',
    type: 'badge',
    color: 'gray',
  },
]

const goToUrl = (url) => {
  window.open(url, '_blank')
}

const dataInfo = ref([])

const getInfo = async () => {
  try {
    const { data } = await axios.get('/getLoggerInfo', {
      params: { type: 'lxy' },
    })
    dataInfo.value = data.data || []
  } catch (error) {
    console.error('获取重聚系列数据失败:', error)
    dataInfo.value = []
  }
}

onMounted(() => {
  getInfo()
})
</script>
