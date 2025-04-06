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
          <span
            @click="openHandler"
            class="cursor-pointer rounded-2xl bg-sky-500 px-3 py-1 font-bold text-sky-50"
          >
            {{ name || '链接🔗' }}
          </span>
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
          <span class="sr-only">Copy</span>
          <Copy class="h-4 w-4" />
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { Copy } from 'lucide-vue-next'
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

const props = defineProps({
  url: String,
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
const openHandler = () => emit('open', props.url)
</script>
