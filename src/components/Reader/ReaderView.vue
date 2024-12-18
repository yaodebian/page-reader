<template>
  <div class="reader-view" :class="{ 'dark-mode': isDark }">
    <div class="reader-content" 
         :style="{ 
           fontSize: `${fontSize}px`,
           lineHeight: '1.8',
           maxWidth: '800px',
           margin: '0 auto',
           padding: '20px'
         }">
      <article class="markdown-body" v-html="content"></article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useReaderStore } from '../../stores/readerStore'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  fontSize: number
  isDark: boolean
}>()

const readerStore = useReaderStore()
const { content } = storeToRefs(readerStore)
</script>

<style>
.reader-view {
  height: 100%;
  overflow-y: auto;
  background: #fff;
  color: #333;
}

.reader-view.dark-mode {
  background: #1a1a1a;
  color: #eee;
}

/* Markdown 样式 */
.markdown-body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-body img {
  max-width: 100%;
  height: auto;
}

.markdown-body p {
  margin-bottom: 16px;
}

.dark-mode .markdown-body {
  color: #eee;
}

.dark-mode .markdown-body a {
  color: #58a6ff;
}

.dark-mode .markdown-body img {
  opacity: 0.8;
}
</style> 