<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <header class="bg-white shadow mb-6 rounded-lg">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <h1 class="text-xl font-bold text-gray-900">PDF Reader</h1>
      </div>
    </header>
    
    <main class="max-w-7xl mx-auto">
      <div class="bg-white rounded-lg shadow">
        <pdf-upload v-if="!currentFile" @file-selected="handleFileSelect" />
        <pdf-viewer v-else :file-path="currentFile" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PdfUpload from './components/PdfUpload.vue'
import PdfViewer from './components/PdfViewer.vue'

const currentFile = ref<string | null>(null)

const handleFileSelect = (path: string) => {
  currentFile.value = path
}
</script>