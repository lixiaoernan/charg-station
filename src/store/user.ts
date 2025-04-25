import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    username: localStorage.getItem("username") || "管理员",
  }),
  actions: {
    // 登录成功后调用
    loginSuccess(payload: { token: string; username: string }) {
      this.token = payload.token;
      this.username = payload.username;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("username", payload.username);
    },
    // 退出登录
    clearToken() {
      this.token = "";
      this.username = "";
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
  },
});
