<template>
  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex justify-between mb-4">
      <div class="space-x-2">
        <el-button @click="prevPage" :disabled="currentPage === 1">
          上一页
        </el-button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <el-button @click="nextPage" :disabled="currentPage === totalPages">
          下一页
        </el-button>
      </div>
      <div class="space-x-2">
        <el-button @click="zoomOut">
          <el-icon><ZoomOut /></el-icon>
        </el-button>
        <span>{{ Math.round(scale * 100) }}%</span>
        <el-button @click="zoomIn">
          <el-icon><ZoomIn /></el-icon>
        </el-button>
      </div>
    </div>
    
    <div ref="canvasContainer" class="overflow-auto">
      <canvas ref="pdfCanvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { ZoomIn, ZoomOut } from '@element-plus/icons-vue'
import * as pdfjsLib from 'pdfjs-dist'

// PDF.js 配置
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

const props = defineProps<{
  filePath: string
}>()

const pdfCanvas = ref<HTMLCanvasElement | null>(null)
const currentPage = ref(1)
const totalPages = ref(1)
const scale = ref(1.0)
let pdfDoc: any = null

// PDF加载和渲染
const loadPDF = async () => {
  try {
    const loadingTask = pdfjsLib.getDocument(props.filePath)
    pdfDoc = await loadingTask.promise
    totalPages.value = pdfDoc.numPages
    renderPage()
  } catch (err) {
    console.error('PDF加载错误：', err)
  }
}

const renderPage = async () => {
  if (!pdfDoc || !pdfCanvas.value) return
  
  const page = await pdfDoc.getPage(currentPage.value)
  const viewport = page.getViewport({ scale: scale.value })
  
  const canvas = pdfCanvas.value
  const context = canvas.getContext('2d')
  
  canvas.height = viewport.height
  canvas.width = viewport.width
  
  await page.render({
    canvasContext: context,
    viewport: viewport
  }).promise
}

// 页面控制
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// 缩放控制
const zoomIn = () => {
  scale.value += 0.1
}

const zoomOut = () => {
  if (scale.value > 0.2) {
    scale.value -= 0.1
  }
}

// 监听变化
watch([currentPage, scale], () => {
  renderPage()
})

onMounted(() => {
  loadPDF()
})
</script> 