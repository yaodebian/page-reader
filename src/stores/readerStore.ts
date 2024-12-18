import { defineStore } from 'pinia'
import { ref } from 'vue'
import { open } from '@tauri-apps/plugin-dialog'
import { FileConverter } from '../utils/fileConverter'
import type { Chapter } from '../types'
import { readFile } from '@tauri-apps/plugin-fs'

export const useReaderStore = defineStore('reader', () => {
  const content = ref('')
  const chapters = ref<Chapter[]>([])
  const currentChapter = ref(0)
  const isLoading = ref(false)
  
  // 处理文件导入
  async function handleFileImport() {
    try {
      isLoading.value = true
      console.log('Starting file import...')
      
      console.log('open', typeof open)
      // 打开文件选择对话框
      const selected = await open({
        multiple: false,
        filters: [{
          name: 'Documents',
          extensions: ['pdf', 'doc', 'docx', 'md']
        }]
      })
      
      console.log('Selected file:', selected)
      
      if (!selected || Array.isArray(selected)) {
        console.log('No file selected or multiple files selected')
        return
      }
      
      // 读取文件内容
      console.log('Reading file...')
      const fileBytes = await readFile(selected)
      console.log('File read complete')
      
      const arrayBuffer = fileBytes.buffer
      
      // 根据文件扩展名处理
      const ext = selected.split('.').pop()?.toLowerCase()
      let markdown = ''
      
      switch (ext) {
        case 'pdf':
          markdown = await FileConverter.pdfToMarkdown(arrayBuffer)
          break
        case 'doc':
        case 'docx':
          markdown = await FileConverter.docToMarkdown(arrayBuffer)
          break
        case 'md':
          markdown = new TextDecoder().decode(arrayBuffer)
          break
        default:
          throw new Error('不支持的文件类型')
      }
      
      // 格式化 Markdown
      content.value = await FileConverter.formatMarkdown(markdown)
      
    } catch (error) {
      console.error('文件处理错误:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }
  
  return {
    content,
    chapters,
    currentChapter,
    isLoading,
    handleFileImport
  }
}) 