<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="max-w-3xl w-full px-4">
      <!-- 主要内容区域 -->
      <div class="text-center">
        <!-- 图片区域 -->
        <div class="w-full h-96 mb-8 relative overflow-hidden">
          <img
            :src="'https://ai-public.mastergo.com/ai/img_res/dd185d1db5e216a0f1061d9e94de4a5a.jpg'"
            class="w-full h-full object-cover object-center"
            alt="404 illustration" />
        </div>

        <!-- 文字信息区域 -->
        <h1 class="text-8xl font-bold text-gray-800 mb-4">404</h1>
        <h2 class="text-2xl font-medium text-gray-700 mb-4">
          哎呀！页面好像迷路了
        </h2>
        <p class="text-gray-600 mb-8">
          您访问的页面可能已被移除、名称已更改或暂时不可用
        </p>

        <!-- 操作按钮区域 -->
        <div class="space-y-4">
          <div class="flex items-center justify-center space-x-4 mb-6">
            <el-button
              type="primary"
              class="!rounded-button whitespace-nowrap text-base px-8 h-12"
              @click="goHome">
              返回首页
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";

const searchText = ref("");

const goHome = () => {
  window.location.href = "/home";
};
</script>

<style scoped>
.el-input :deep(.el-input__wrapper) {
  border-radius: 9999px;
  padding: 0 1.5rem;
  height: 3rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.el-input :deep(.el-input__inner) {
  font-size: 1rem;
}

.el-button {
  font-weight: 500;
  transition: all 0.3s ease;
}

.el-button:hover {
  transform: translateY(-2px);
}
</style>
