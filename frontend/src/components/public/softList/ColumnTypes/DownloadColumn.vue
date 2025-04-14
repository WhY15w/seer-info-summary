<!-- DownloadColumn.vue -->
<template>
  <DownloadDialog
    :url="item[config.field]"
    :name="item.name || item.name_all"
    :psd="item.psd"
    @open="$emit('open', $event)"
  />
</template>

<script setup>
import DownloadDialog from '@/components/public/softList/DownloadDialog.vue'

defineProps({
  item: Object,
  config: Object,
})

defineEmits(['open'])
</script>
