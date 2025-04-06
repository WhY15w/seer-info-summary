<template>
  <CommonLayout
    title="官方动态"
    description="赛尔号B站图文动态信息"
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
      >
        <template #jump_url>
          <Button
            class="cursor-pointer bg-blue-300 font-bold text-blue-700 hover:text-blue-900"
            @click="goToUrl(item.jump_url)"
          >
            <ArrowUpRightIcon class="h-5 w-5"></ArrowUpRightIcon>
            <span>前往</span>
          </Button>
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

import { ArrowUpRightIcon } from '@heroicons/vue/24/solid'
import { Button } from '@/components/ui/button'

const headers = [
  { text: '动态内容', span: 'col-span-10 text-left ml-8' },
  { text: '链接', span: 'col-span-2 text-center' },
]

const columns = [
  {
    field: 'content',
    span: 'sm:col-span-10',
    type: 'text',
    icon: 'name',
  },
  {
    field: 'jump_url',
    span: 'sm:col-span-2 text-center',
  },
]

const goToUrl = (url) => {
  window.open(url, '_blank')
}

const dataInfo = ref([])

const getInfo = async () => {
  try {
    const { data } = await axios.get('/getSeerBilibiliInfo')
    dataInfo.value = data.data || []
  } catch (error) {
    console.error('获取B站动态数据失败:', error)
    dataInfo.value = []
  }
}

onMounted(() => {
  getInfo()
})
</script>
