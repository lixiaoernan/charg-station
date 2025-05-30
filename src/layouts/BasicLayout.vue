<template>
  <div class="layout-container">
    <!-- 头部 -->
    <header class="header">
      <div class="flex flex-row justify-center align-center">
        <el-avatar :src="LOGO" />
        <div class="text-center ml-8px h-40px leading-40px font-bold text-16px">
          {{ userStore.username || "李小二" }}
        </div>
      </div>
      <el-button @click="handleLogout">退出</el-button>
    </header>

    <div class="main-container">
      <!-- 左侧菜单 -->
      <aside class="sidebar">
        <div class="h-full flex flex-col justify-between">
          <el-menu
            :collapse="isCollapse"
            router
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409EFF">
            <template v-for="item in menuRoutes" :key="item.path">
              <el-menu-item :index="item.path">
                <el-icon :size="20" class="mr-2">
                  <component :is="item.meta.icon" />
                </el-icon>
                <span>{{ item.meta?.title }}</span>
              </el-menu-item>
            </template>
          </el-menu>
          <div
            class="w-full flex justify-end p-8px"
            @click="isCollapse = !isCollapse">
            <el-icon v-show="!isCollapse" color="#fff" :size="20"
              ><Fold
            /></el-icon>
            <el-icon v-show="isCollapse" color="#fff" :size="20"
              ><Expand
            /></el-icon>
          </div>
        </div>
      </aside>

      <!-- 内容区域 -->
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";
import { routes } from "../router";
import LOGO from "@/assets/logo/logo.png";

const router = useRouter();
const userStore = useUserStore();

// 获取需要显示菜单的路由
const menuRoutes = routes.find((r) => r.path === "/")?.children || [];

const isCollapse = ref(false);

const handleLogout = () => {
  userStore.clearToken();
  router.push("/login");
};
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  height: 60px;
  background: #004739;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.main-container {
  flex: 1;
  display: flex;
}

.sidebar {
  width: auto;
  background: #304156;
}

.content {
  flex: 1;
  /* padding: 20px; */
  background: #f0f2f5;
  overflow: auto;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
</style>
