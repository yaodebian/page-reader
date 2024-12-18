import type { SelectOption } from 'naive-ui'

export interface Chapter {
  title: string;
  content: string;
}

export interface ChapterOption {
  label: string;
  value: number;
}

export interface FontSizeOption extends SelectOption {
  label: string;
  value: number;
} 