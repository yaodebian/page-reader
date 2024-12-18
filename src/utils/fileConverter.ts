import * as pdfjs from 'pdfjs-dist'
import mammoth from 'mammoth'
import { marked } from 'marked'

interface TextItem {
  str: string;
  // 可能还有其他属性
}

// 设置 pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export class FileConverter {
  // PDF转换为Markdown
  static async pdfToMarkdown(arrayBuffer: ArrayBuffer): Promise<string> {
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise
    let markdown = ''
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items
        .map((item: any) => 'str' in item ? item.str : '')
        .join(' ')
      markdown += pageText + '\n\n'
    }
    
    return markdown
  }

  // Word文档转换为Markdown
  static async docToMarkdown(arrayBuffer: ArrayBuffer): Promise<string> {
    const result = await mammoth.convertToHtml({ arrayBuffer })
    return result.value
  }

  // Markdown格式化
  static async formatMarkdown(markdown: string): Promise<string> {
    return await marked(markdown)
  }
} 