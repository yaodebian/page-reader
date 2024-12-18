<template>
  <div class="reader-container">
    <!-- 顶部工具栏 -->
    <div class="toolbar">
      <n-space>
        <n-button 
          :loading="readerStore.isLoading" 
          @click="readerStore.handleFileImport"
        >
          {{ readerStore.isLoading ? '导入中...' : '导入文件' }}
        </n-button>
        <n-select
          v-model:value="fontSize"
          :options="fontSizeOptions"
          style="width: 100px"
        />
        <n-switch v-model:value="isDarkMode">
          <template #checked>
            暗色
          </template>
          <template #unchecked>
            亮色
          </template>
        </n-switch>
      </n-space>
    </div>
    
    <!-- 主体内容区 -->
    <div class="content-wrapper">
      <reader-view
        :font-size="fontSize"
        :is-dark="isDarkMode"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  NButton,
  NSelect,
  NSwitch,
  NSpace
} from 'naive-ui'
import { useReaderStore } from '../stores/readerStore'
import ReaderView from '../components/Reader/ReaderView.vue'
import type { FontSizeOption } from '../types'

const readerStore = useReaderStore()

// 状态定义
const fontSize = ref(16)
const isDarkMode = ref(false)

const fontSizeOptions: FontSizeOption[] = [
  { label: '小', value: 14 },
  { label: '中', value: 16 },
  { label: '大', value: 18 }
]
</script>

<style scoped>
.reader-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.toolbar {
  padding: 12px;
  border-bottom: 1px solid #eee;
  background: #fff;
}

.content-wrapper {
  flex: 1;
  overflow: hidden;
}

:deep(.dark-mode) .toolbar {
  background: #1a1a1a;
  border-bottom-color: #333;
}
</style> 