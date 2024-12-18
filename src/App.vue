<template>
  <n-config-provider :theme="theme">
    <n-message-provider>
      <div class="app-container">
        <reader-view />
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import ReaderView from './views/Reader.vue'

// 主题设置
const theme = ref(null)

// 可以后续添加主题切换逻辑
</script>

<style>
.app-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

/* 重置默认样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>