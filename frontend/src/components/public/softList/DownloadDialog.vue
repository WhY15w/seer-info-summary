<template>
  <Dialog>
    <DialogTrigger>
      <button
        class="inline-flex cursor-pointer items-center rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mr-1 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        下载
      </button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>文件下载</DialogTitle>
        <DialogDescription>
          复制下方链接或点击右侧下载
          <Button
            @click="openHandler"
            class="h-6 cursor-pointer rounded-2xl bg-sky-500 px-3 py-1 font-bold text-sky-50"
          >
            <span>{{ name || '链接🔗' }}</span>
            <span
              v-if="psd"
              class="flex items-center gap-1"
            >
              <LockIcon></LockIcon>
              <span>{{ psd }}</span>
            </span>
          </Button>
        </DialogDescription>
      </DialogHeader>
      <div class="flex items-center space-x-2">
        <div class="grid flex-1 gap-2">
          <Input
            id="link"
            :default-value="url"
            read-only
          />
        </div>
        <Button
          type="submit"
          size="sm"
          class="cursor-pointer px-3"
          @click="copyHandler(url)"
        >
          <Copy class="h-4 w-4" />
        </Button>
      </div>
      <!-- 直链下载 -->
      <div class="flex items-center justify-around">
        <Button
          type="submit"
          size="sm"
          class="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-white shadow-lg transition-all hover:scale-105 hover:cursor-pointer"
          @click="downloadFile(url, 'cloud')"
        >
          <CloudDownload />
          <span>云端直链下载</span>
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { Copy, CloudDownload, LockIcon } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'vue-sonner'
import axios from '@/utils/axios'

const props = defineProps({
  url: String,
  psd: {
    type: String,
    default: '',
  },
  name: String,
})

const emit = defineEmits(['copy', 'open'])

const copyHandler = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success('复制成功！', {
        description: '链接🔗复制成功，请粘贴到浏览器打开',
      })
    })
    .catch((error) => {
      console.error('复制失败:', error)
    })
}

const downloadFile = async (url) => {
  try {
    const { data } = await axios.get('/lanzou', {
      params: {
        url,
        pwd: props.psd,
      },
    })
    if (data.code !== 0) {
      toast.error('下载失败，请更换下载方式')
      return
    }
    window.open(data.data.downUrl)
  } catch (error) {
    toast.error('下载失败，请更换下载方式')
  }
}
const openHandler = () => emit('open', props.url)
</script>
