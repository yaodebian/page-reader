<template>
  <div 
    class="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center"
    @drop.prevent="handleDrop"
    @dragover.prevent
  >
    <el-button type="primary" @click="selectFile">
      选择PDF文件
    </el-button>
    <p class="mt-2 text-sm text-gray-500">
      或将PDF文件拖放到此处
    </p>
  </div>
</template>

<script setup lang="ts">
import { open } from '@tauri-apps/plugin-dialog'

const emit = defineEmits<{
  (e: 'file-selected', path: string): void
}>()

const selectFile = async () => {
  try {
    const selected = await open({
      multiple: false,
      filters: [{
        name: 'PDF文件',
        extensions: ['pdf']
      }]
    })
    
    if (selected && typeof selected === 'string') {
      emit('file-selected', selected)
    }
  } catch (err) {
    console.error('文件选择错误：', err)
  }
}

const handleDrop = (e: DragEvent) => {
  const files = e.dataTransfer?.files
  if (files?.length === 1) {
    const file = files[0]
    if (file.type === 'application/pdf') {
      emit('file-selected', file.path)
    }
  }
}
</script>