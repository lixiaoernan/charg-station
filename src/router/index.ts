import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useUserStore } from "@/store/user";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: { guestOnly: true },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/NotFound.vue"), // 404页面
  },
  {
    path: "/",
    component: () => import("@/layouts/BasicLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
        meta: { title: "首页", icon: "HomeFilled" },
      },
      {
        path: "/statistical",
        name: "Statistical",
        component: () => import("@/views/statistical/index.vue"),
        meta: { title: "统计分析", icon: "PieChart" },
      },
      {
        path: "/user",
        name: "User",
        component: () => import("@/views/user/index.vue"),
        meta: { title: "用户管理", icon: "UserFilled" },
      },
      {
        path: "/system",
        name: "System",
        component: () => import("@/views/system/index.vue"),
        meta: { title: "系统设置", icon: "Tools" },
      },
      {
        path: "/demo/select-card",
        name: "SelectCard",
        component: () => import("@/views/demo/select-card/index.vue"),
        meta: { title: "选择卡片", icon: "Select" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  // 白名单路径
  const isPublic = to.matched.some((record) => record.meta.guestOnly);
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // 已登录访问登录页时重定向到首页
  if (isPublic && userStore.token) {
    return next("/home");
  }

  // 需要认证且未登录
  if (requiresAuth && !userStore.token) {
    return next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }

  // 防止访问不存在的子路由
  if (to.matched.length === 0) {
    next("/404");
  } else {
    next();
  }
});

export default router;
